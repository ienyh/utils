import xhr, { XHRConfig } from './xhr'
import delay from './delay'
import filter from './filter'
import type { Fn } from './type'

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
    this.timeout = config?.timeout;
    this.requestInterceptor = new InterceptorManager();
    this.responseInterceptor = new InterceptorManager();
  }

  request(config: RequestConfig) {
    if (!config?.delay) config['delay'] = this.delay;
    if (!config?.timeout || config?.timeout <= 0) config['timeout'] = this.timeout;
    config.url = this.baseURL + config.url;

    const chain = [];
    this.requestInterceptor.forEach((interceptorHandler) => {
      chain.push(interceptorHandler.resolve, interceptorHandler.reject);
    });
    chain.push(xhr, undefined);
    this.responseInterceptor.forEach((interceptorHandler) => {
      chain.push(interceptorHandler.resolve, interceptorHandler.reject);
    });

    let promise = delay(config.delay).then(() => filter(config, [undefined, null]));
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
