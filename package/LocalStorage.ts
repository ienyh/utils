
export interface LocalStorageValue {
  time: number;
  expire: number;
  data: any;
}

const localStorage = window.localStorage;

// 封装 window.localStorage 工具类，支持添加过期时间
export default class LocalStorage {

  constructor() {
    throw new Error('LocalStorage is a Util Static Class, It can not be constructed!')
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
   * @returns 
   */
  static get = (key: string) => {
    const temp = localStorage.getItem(key);
    if (!temp) return null;
    const value: LocalStorageValue = JSON.parse(temp);
    if (Date.now() - value?.time >= value?.expire) {
      // 满足条件则说明过期了
      LocalStorage.remove(key);
      return null;
    }
    return value?.data ?? null;
  }

  /**
   * 判断 localStorage 中是否存在
   * 过期也认为不存在
   * @param key 
   * @returns 
   */
  static has = (key: string): boolean => {
    return localStorage.getItem(key) !== undefined;
  }


  /**
   * 判断是否过期
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
