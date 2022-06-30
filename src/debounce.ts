
/**
 * debounce 函数防抖
 * @param func Fn
 * @param delay 延迟时间
 * @returns DebounceFunction
 */
export default function debounce(func: Fn, delay: number) {
  let timer: number | NodeJS.Timeout;
  return function debounceFn() {
    const self = this;
    const argv = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      Reflect.apply(func, self, argv);
    }, delay >= 0 ? delay : 0);
  }
}
