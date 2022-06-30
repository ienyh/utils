
type Callback<T = any, N = void> = (p: T) => N;

type Executor<T> = (resolve: Callback<T>, reject: Callback) => void;

export default class MyPromise<T = any> {
  private status: "pending" | "fulfilled" | "rejected";
  private result: T;
  private onFulfilledCallbacks: Callback[];
  private onRejectedCallbacks: Callback[];

  constructor(executor: Executor<T>) {
    this.status = "pending";
    this.result = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (valve: T) => {
      if (this.status !== "pending") return;
      this.status = "fulfilled";
      this.result = valve;
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(this.result);
      }
    }

    const reject = (reason: unknown) => {
      if (this.status !== "pending") return;
      this.status = "rejected";
      this.result = reason as T;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(this.result);
      }
    }

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(
    onFulfilled = value => value,
    onRejected: Callback = reason => { throw reason },
  ) {
    const self = this;
    const promise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb: Callback<any, any>) => {
        try {
          const x = cb(this.result);
          if (promise === x) {
            reject(
              new TypeError("Chaining Circle detected for promise #<MyPromise>")
            );
            return;
          }

          if (x instanceof MyPromise) {
            // 如果返回值是 Promise
            // 如果返回值是 promise 对象，返回值为成功，新 promise 就是成功
            // 如果返回值是 promise对象，返回值为失败，新 promise 就是失败
            // 谁知道返回的 promise 是失败成功？只有then知道
            x.then(resolve, reject)
          } else {
            // 非 Promise 就直接成功
            resolve(x)
          }
        } catch (error) {
          // 处理报错
          reject(error)
          throw new Error(error);
        }
      }

      if (self.status === 'fulfilled') {
        setTimeout(() => {
          resolvePromise(onFulfilled);
        });
      } else {
        setTimeout(() => {
          resolvePromise(onRejected);
        });
      }

      if (self.status === "pending") {
        self.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              resolvePromise(onFulfilled);
            } catch (error) {
              reject(error);
            }
          })
        });
        self.onRejectedCallbacks.push(onRejected);
        return;
      }
    });
    return promise;
  }

}
