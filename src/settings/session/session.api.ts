import { createMutation } from '@farfetched/core';
import { ENV } from '@shared/env';
import axios, { type AxiosError } from 'axios';
import { createEffect } from 'effector';

const api = axios.create({
  baseURL: `${ENV.API_BASE_URL}/auth`,
  timeout: 10000,
  validateStatus: (status) => status >= 200 && status < 300
});

export function createSessionAuthMut() {
  return createMutation<void, void, AxiosError>({
    effect: createEffect<void, void, AxiosError>(async () => {
      await api.get('', {
        withCredentials: true
      });
    })
  });
}

export function createSessionRefreshMut() {
  return createMutation<void, void, AxiosError>({
    effect: createEffect<void, void, AxiosError>(async () => {
      await api.get('/refresh_token/refresh', {
        withCredentials: true
      });
    })
  });
}

export function createSessionSignOutMut() {
  return createMutation<void, void, AxiosError>({
    effect: createEffect<void, void, AxiosError>(async () => {
      await api.post('/refresh_token/signout', {
        withCredentials: true
      });
    })
  });
}
