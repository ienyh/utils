
type RequestMethod = "GET" | "POST";

export interface Config {
  method: Uppercase<RequestMethod> & Lowercase<RequestMethod>;
  url: string;
  timeout?: number;
  data?: XMLHttpRequestBodyInit | XMLDocument;
  onProcess?: Callback;
}

export default function xhr(config: Config) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.open(config.method.toUpperCase(), config.url, true);

    if (config?.timeout) {
      request.timeout = config.timeout;
    }

    const onloadend = () => {
      resolve(request.response);
    };

    request.onloadend = onloadend;

    request.send(config.data);
  });
}
