

type Listener<T = any> = (p: T) => void

type Listeners = Record<string, Listener[]>;

export type {
  Listener,
  Listeners,
}

export interface event {
  type: string;
  target: this;
  [attachment: string]: any;
}

/**
 * 事件派发器
 */
export default class EventDispatcher {

  private listeners: Listeners;

  constructor();


  /**
   * 添加监听事件
   * @param type 
   * @param listener 
   */
  addEventListener(type: string, listener: Listener): void;


  /**
   * 检测是否已添加该监听事件
   * @param type 
   * @param listener 
   * @returns 
   */
  hasEventListener(type: string | string[], listener: Listener): boolean;


  /**
   * 移除监听事件
   * @param type 
   * @param listener 
   * @returns {void}
   */
  removeEventListener(type: string, listener?: Listener): void;


  /**
   * 移除所有监听
   */
  clearEventListeners(): void;


  /**
   * 触发监听事件
   * @param event 
   * @returns 
   */
  dispatchEvent(event: { type: string, [attachment: string]: any }): void;

}
