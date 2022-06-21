
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
class EventDispatcher {

  private listeners: Listeners;

  constructor() {
    this.listeners = {};
  }


  /**
   * 添加监听事件
   * @param type 
   * @param listener 
   */
  addEventListener(type: string | string[], listener: Listener) {

    if (Array.isArray(type)) {
      type.forEach(s => this.addEventListener(s, listener));
      return;
    }

    if (this.listeners === undefined) this.listeners = {};

    const listeners = this.listeners;

    if (listeners[type] === undefined) listeners[type] = [];

    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    } else {
      console.warn(`The function named ${listener.name} has been listened`);
    }

  }


  /**
   * 检测是否已添加该监听事件
   * @param type 
   * @param listener 
   * @returns 
   */
  hasEventListener(type: string, listener: Listener): boolean {

    const listeners = this.listeners;

    return listeners[type] !== undefined && listeners[type].includes(listener);

  }


  /**
   * 移除监听事件
   * @param type 
   * @param listener 
   * @returns {void}
   */
  removeEventListener(type: string, listener?: Listener): void {

    if (this.listeners?.[type] === undefined) return;

    if (!listener) {
      delete this.listeners[type];
      return;
    }

    const listeners = this.listeners;
    const index = listeners[type].indexOf(listener);
    if (index !== -1) {
      listeners[type].splice(index, 1);
    }

  }


  /**
   * 移除所有监听
   */
  clearEventListeners() {

    this.listeners = {};

  }


  /**
   * 触发监听事件
   * @param event 
   * @returns 
   */
  dispatchEvent(event: { type: string, [attachment: string]: any }): void {

    if (this.listeners?.[event.type] === undefined) return;

    const listeners = this.listeners?.[event.type];

    event.target = this;

    for (let i = 0; i < listeners.length; i++) {
      listeners[i].call(this, event);
    }

    event.target = null;

  }

}

export default EventDispatcher;
