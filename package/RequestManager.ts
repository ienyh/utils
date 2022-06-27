import EventDispatcher from "./EventDispatcher"
import _delay from "./delay"
import type { Fn } from './type'

type Fetcher<R = any> = (...rest) => R

export interface RequestManagerOptions {
  delay?: number;     // 请求延迟开始
}

const defaultOptions: RequestManagerOptions = {
  delay: 0,
}

export default class RequestManager<T> extends EventDispatcher {

  private fetcher: Fetcher<T>;
  private config: RequestManagerOptions;
  private loading: boolean;
  private data: T;
  private error: Error;

  constructor(fetcher: Fetcher<T>, config?: RequestManagerOptions) {
    super();
    this.fetcher = fetcher;
    this.config = { ...defaultOptions, ...config };
  }

  async runAsync(...rest): Promise<T> {
    const { delay = 0 } = this.config;
    this.loading = true;
    try {
      await _delay(delay);
      const res = await this.fetcher(...rest);
      this.data = res;
      return res;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  }

}
