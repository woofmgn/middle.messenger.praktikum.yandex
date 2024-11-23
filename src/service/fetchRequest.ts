const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

type TOptions = {
  timeout?: number;
  method: keyof typeof METHODS;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  headers?: Record<string, string>;
} & Record<string, unknown>;

function queryStringify(data: Record<string, unknown>) {
  if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (!acc.length) {
        return `?${acc}${key}=${value}`;
      }
      return `${acc}&${key}=${value}`;
    }, '');
  }
  return data;
}

class HTTPTransport {
  _defaultTimeout: number;

  constructor() {
    this._defaultTimeout = 5000;
  }

  public get = <T>(url: string, options: TOptions = { method: METHODS.GET }) => {
    return this.request<T>(
      url,
      {
        ...options,
        method: METHODS.GET,
      },
      (options.timeout = this._defaultTimeout)
    );
  };

  public post = <T>(url: string, options: TOptions = { method: METHODS.GET }) => {
    return this.request<T>(
      url,
      {
        ...options,
        method: METHODS.POST,
      },
      (options.timeout = this._defaultTimeout)
    );
  };

  public put = <T>(url: string, options: TOptions = { method: METHODS.GET }) => {
    return this.request<T>(
      url,
      {
        ...options,
        method: METHODS.PUT,
      },
      (options.timeout = this._defaultTimeout)
    );
  };

  public delete = <T>(url: string, options: TOptions = { method: METHODS.GET }) => {
    return this.request<T>(
      url,
      {
        ...options,
        method: METHODS.DELETE,
      },
      (options.timeout = this._defaultTimeout)
    );
  };

  private request = <T>(url: string, options: TOptions, timeout: number): Promise<T> => {
    const { headers, method, data } = options;

    return new Promise<T>(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      if ('headers' in options && headers) {
        Object.keys(headers).forEach((key) => {
          xhr.setRequestHeader(key, headers[key]);
        });
      }

      xhr.onload = function () {
        resolve(xhr as unknown as Promise<T>);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export const fetchRequest = new HTTPTransport();
