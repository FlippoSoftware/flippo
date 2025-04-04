import { createEvent, createStore, sample } from 'effector';

import { type TNotificationKind, type TToastProps } from '../types/TToastProps';

export type TToastCreate = Omit<TToastProps, 'id' | 'onClose' | 'variant'>;
export type TToastStore = Omit<TToastProps, 'onClose'>;

const defaultStatusIconSize: { [key in TNotificationKind]: number } = {
  error: 20,
  success: 20,
  timer: 27,
  warning: 20
};

const defaultTimeout: { [key in TNotificationKind]: number } = {
  error: 5000,
  success: 5000,
  timer: 7000,
  warning: 5000
};

const createUUID = () => {
  const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return pattern.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const deleteNotification = createEvent<string>();

const composeNotification = (
  variant: TNotificationKind,
  { statusIconSize, timeout, ...otherPayload }: TToastCreate
): TToastStore => {
  const id = createUUID();
  return {
    id,
    statusIconSize: statusIconSize ? statusIconSize : defaultStatusIconSize[variant],
    timeout: timeout ? timeout : defaultTimeout[variant],
    variant,
    ...otherPayload
  };
};

export const $notifications = createStore<TToastStore[]>([]);

export const createSuccessNotification = createEvent<TToastCreate>();
export const createWaringNotification = createEvent<TToastCreate>();
export const createErrorNotification = createEvent<TToastCreate>();
export const createTimerNotification = createEvent<TToastCreate>();

sample({
  clock: deleteNotification,
  source: $notifications,
  fn: (state, notificationId) => state.filter((n) => n.id !== notificationId),
  target: $notifications
});

sample({
  clock: createSuccessNotification,
  source: $notifications,
  fn: (state, notification) => [...state, composeNotification('success', notification)],
  target: $notifications
});

sample({
  clock: createWaringNotification,
  source: $notifications,
  fn: (state, notification) => [...state, composeNotification('warning', notification)],
  target: $notifications
});

sample({
  clock: createErrorNotification,
  source: $notifications,
  fn: (state, notification) => [...state, composeNotification('error', notification)],
  target: $notifications
});

sample({
  clock: createTimerNotification,
  source: $notifications,
  fn: (state, notification) => [...state, composeNotification('timer', notification)],
  target: $notifications
});
