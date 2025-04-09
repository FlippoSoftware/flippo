import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ENV } from '@shared/env';
import axios from 'axios';
import { createEffect } from 'effector';

const api = axios.create({
  baseURL: `${ENV.API_BASE_URL}`,
  timeout: 5000,
  validateStatus: status => status >= 200 && status < 300
});

interface Request {
  body?: unknown;
  method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
  options?: AxiosRequestConfig;
  url: string;
}

export const requestFx = createEffect<Request, any, string>((request) => {
  return (
    api({
      data: request.body,
      method: request.method,
      url: request.url,
      ...request.options
    })
      .then((response: AxiosResponse) => response.data)
      .catch((error: AxiosError) => {
        let status: string = '';
        if (error.response) {
          status = error.response.status.toString();
        }
        else if (error.request) {
          status = (error.request as { [key: string]: unknown; status: number }).status.toString();
        }
        else if (error.status) {
          status = error.status.toString();
        }

        return Promise.reject<string>(status);
      })
  );
});
