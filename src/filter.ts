import type { Fn } from "./type";

/**
 * 过滤对象或数组
 * @param param 对象或数组
 * @param handler 处理函数（处理函数返回为 false 的值将会被排除出去），或者想要排除的值的集合（数组）
 * @returns 过滤后的对象或数组
 * @example
 * filter([1, 2, 3, 4], [1, 3]) return [2, 4]
 * filter([1, 2, 3, 4], x => x >= 3) return [3, 4]
 * filter({ x: "name", y: undefined }, [undefined]) return { x: "name" }
 */
export default function filter<T>(
  param: T,
  handler: Fn<T extends Array<infer P> ? P : T[keyof T], boolean> | Array<any>,
) {
  if (Array.isArray(param)) {
    if (typeof handler === 'function') return param.filter(handler);
    const filters = param.filter(v => {
      if (handler.includes(v)) return false;
      return true;
    })
    return filters;
  }
  if (param !== null && typeof param === 'object') {
    let result = {};
    if (typeof handler === 'function') {
      for (const key of Object.keys(param)) {
        if (handler(key as T extends Array<infer P> ? P : T[keyof T])) result[key] = param[key];
      }
      return result;
    }
    for (const key of Object.keys(param)) {
      if (!handler.includes(param[key])) result[key] = param[key];
    }
    return result;
  }
  throw new Error('the param must be "function" or "object"');
}
