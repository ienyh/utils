
/**
 * 判断是否为对象
 * @param o 需要判断的值
 * @returns 是否为对象
 * @example
 * isObject({}) returns ture
 * isObject(null) returns false
 * isObject(() => {}) returns ture
 */
export default function isObject(o) {
  return o !== null && (typeof o === 'object' || typeof o === 'function');
}
