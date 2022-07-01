
/**
 * 延迟执行异步代码
 * @param delay 毫秒数
 * @returns Promise<void>
 */
export default function delay<T = void>(delay: number, some?: T): Promise<T> {
  return new Promise<T>(reslove => setTimeout(() => reslove(some), delay >= 0 ? delay : 0));
}
