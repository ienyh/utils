import xhr, { XHRConfig } from './xhr';
import delay from './delay';

interface RequestInitConfig {
  baseURL: string;
  delay?: number;
  timeout?: number;
}

interface RequestConfig extends Omit<XHRConfig, 'onProcess'> {
  delay?: number;
}

export default class Request {

  baseURL: string;
  delay: number;
  timeout: number;
  readonly requestInterceptor: InterceptorManager;
  readonly responseInterceptor: InterceptorManager;

  constructor(config?: RequestInitConfig) {
    this.baseURL = config?.baseURL || '';
    this.delay = config?.delay || 0;
    this.requestInterceptor = new InterceptorManager();
    this.responseInterceptor = new InterceptorManager();
  }

  request(config: RequestConfig) {
    if (!config?.delay) config['delay'] = this.delay;

    const chain = [];
    this.requestInterceptor.forEach((interceptorHandler) => {
      chain.push(interceptorHandler.resolve, interceptorHandler.reject);
    });
    chain.push(xhr, undefined);
    this.responseInterceptor.forEach((interceptorHandler) => {
      chain.push(interceptorHandler.resolve, interceptorHandler.reject);
    });

    let promise = delay(config.delay).then(() => config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
    return promise as Promise<unknown>;
  }

  static request(config: RequestConfig) {
    return delay(config.delay).then(() => xhr(config));
  }

}

interface InterceptorHandler {
  resolve: Fn<RequestConfig, Promise<RequestConfig>>;
  reject: Fn<RequestConfig, Promise<RequestConfig>>;
}

class InterceptorManager {
  private handlers: InterceptorHandler[];

  constructor() {
    this.handlers = [];
  }

  use(
    resolve: Fn<RequestConfig, Promise<RequestConfig>>,
    reject: Fn<RequestConfig, Promise<RequestConfig>>,
  ) {
    this.handlers.push({
      resolve,
      reject,
    })
    return this.handlers.length - 1;
  }

  forEach(fn: Fn<InterceptorHandler, void>) {
    this.handlers.forEach(h => fn(h));
  }
}
