
const CANCEL = 'CANCEL_PROMISE'

/**
 * 延迟执行异步代码
 * @param delay 毫秒数
 * @returns Promise<void>
 */
export default function delay<T = void>(delay: number, some?: T): Promise<T> {
  let timeoutId;
  const promise = new Promise<T>(reslove => {
    setTimeout(() => reslove(some as T), delay >= 0 ? delay : 0)
  });
  promise[CANCEL] = () => clearTimeout(timeoutId);
  return promise;
}
