
export type RequestMethod = "GET" | "POST";

export interface XHRConfig {
  method: Uppercase<RequestMethod>;
  url: string;
  timeout?: number;
  data?: XMLHttpRequestBodyInit | XMLDocument;
  onProcess?: Callback;
}


export default function xhr(config: XHRConfig) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();

    request.open(config.method.toUpperCase(), config.url, true);

    if (config?.timeout) {
      request.timeout = config.timeout;
    }

    const onloadend = () => {
      resolve(request.response);
    };

    request.onloadend = onloadend;

    request.onerror = function handleError(err) {
      reject(`Network Error`);
      request = null;
    }

    request.onabort = function handleAbort() {
      if (!request) return;
      reject(`Request aborted`);
      request = null;
    };

    request.send(config.data);
  });
}
