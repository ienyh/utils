
export interface LocalStorageValue {
  time: number;
  expire: number;
  data: any;
}

// 封装 window.localStorage 工具类，支持添加过期时间
export default class LocalStorage {

  constructor() {
    throw new Error('LocalStorage is a Util Static Class, It can not be constructed!')
  }

  static isSupported() {
    return window?.localStorage !== undefined;
  }

  /**
   * 设置
   * @param {string} key 键
   * @param {string | Array | Object} value 值
   * @param {number} expire 过期时间 单位 毫秒
   * @returns 添加成功则返回 ture
   */
  static set = (
    key: string,
    value: any,
    expire: number = Number.MAX_SAFE_INTEGER
  ): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify({
        data: value,
        time: Date.now(),
        expire,
      }));
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 获取
   * @param key 
   * @param needOrigin 是否直接返回原数据格式
   * @returns 
   */
  static get = (key: string, needOrigin = false) => {
    const temp = localStorage.getItem(key);
    if (needOrigin) return temp;
    if (!temp) return null;
    const {
      time,
      expire,
      data = null,
    } = JSON.parse(temp) as LocalStorageValue;
    if (!time || !expire) return data;
    if (Date.now() - time >= expire) {
      // 过期
      LocalStorage.remove(key);
      return null;
    }
    return data;
  }

  /**
   * 判断 localStorage 中是否存在
   * 过期也认为不存在
   * 如果键名不存在于存储中，localStorage.getItem 则返回 null。
   * @param key 
   * @returns 
   */
  static has = (key: string): boolean => {
    return localStorage.getItem(key) !== null;
  }


  /**
   * 判断是否过期 不存在时认为过期
   * @param key 
   */
  static isExpired = (key: string): boolean => {
    const temp = localStorage.getItem(key);
    if (temp === null) return true;
    const value: LocalStorageValue = JSON.parse(temp);
    return Date.now() - value?.time >= value?.expire;
  }


  /**
   * 移除
   * @param key 
   */
  static remove = (key: string) => {
    localStorage.removeItem(key);
  }


  /**
   * 清除所有
   */
  static clear = () => {
    localStorage.clear();
  }
}
