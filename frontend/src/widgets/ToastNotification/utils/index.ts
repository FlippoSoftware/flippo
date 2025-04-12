import type { Namespace, TFunction, TypeOptions } from 'i18next';
import type { TToastCreate } from '../models/ToastContainerStorage';
import { $t } from '@settings/i18next';

import { createEvent, sample } from 'effector';
import { createErrorNotification, createSuccessNotification } from '../models/ToastContainerStorage';

type TDefaultNamespace = TypeOptions['defaultNS'];

export type TTranslationOptions<Ns extends Namespace = TDefaultNamespace> = Parameters<TFunction<Ns, undefined>>;

export const displayRequestError = createEvent<TTranslationOptions>();
export const displayRequestSuccess = createEvent<TTranslationOptions<Namespace>>();

sample({
  clock: displayRequestError,
  source: $t,
  filter: $t.map(t => !!t),
  fn: (t, [key, ...option]): TToastCreate => ({ message: t([...key, 'error.500'] as any, ...option) }),
  target: createErrorNotification
});

sample({
  clock: displayRequestSuccess,
  source: $t,
  filter: $t.map(t => !!t),
  fn: (t, options): TToastCreate => ({ message: t(...(options as any)) }),
  target: createSuccessNotification
});
