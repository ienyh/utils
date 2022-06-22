
/**
 * 延迟执行异步代码
 * @param delay 毫秒数
 * @returns Promise<void>
 */
export default async function delay(delay: number) {
  return new Promise<void>(reslove => setTimeout(() => reslove(), delay >= 0 ? delay : 0));
}
