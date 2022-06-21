
/**
 * 函数节流
 * @param fn 
 * @param wait 
 * @returns ThrottleFunction
 */
export default function throttle(fn: Fn, wait: number) {
  let timer: number | NodeJS.Timeout;
  return function throttleFn() {
    const self = this;
    const argv = arguments;
    if (!timer) {
      timer = setTimeout(() => {
        Reflect.apply(fn, self, argv);
        timer = null;
      }, wait);
    }
  };
}
