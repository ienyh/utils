import isObject from './isObject'

/**
 * 深拷贝
 * @param o 将要深拷贝的对象
 * @returns 返回拷贝后的对象
 * @example
 * deepClone({ name: 'lisi' })
 * deepClone({}, (key, value) => key === 'name' ? 'zhangsan' : value)
 */
export default function deepClone<T>(
  o: T,
  handler?: (key: string, value) => any,
) {
  if (o === null || typeof o !== 'object') return o;
  const target = {};
  for (const key of Object.keys(o)) {
    if (isObject(o[key])) {
      target[key] = deepClone(o[key], handler)
    } else {
      target[key] = handler ? handler(key, o[key]) : o[key];
    }
  }
  return target;
}