import { $i18n, $isReady, initI18next } from '@settings/i18next';
import { initRouter } from '@settings/routing';
import { sessionAuth } from '@settings/session';
import { dbConnectFx as originDbConnectFx, dbDisconnectFx as originDbDisconnectFx } from '@settings/surreal';
import { attach, createEffect, createEvent, sample } from 'effector';
import { and, not } from 'patronum';

const dbConnectFx = attach({ effect: originDbConnectFx });
const dbDisconnectFx = attach({ effect: originDbDisconnectFx });

// #region init
export const initApp = createEvent();
const initAppFx = createEffect(async () => {
  await Promise.allSettled([dbConnectFx]);
});

const $i18nNotNull = $i18n.map(instance => !!instance);
const $initAppProcess = initAppFx.pending;
export const $initialized = and(not($initAppProcess), $isReady, $i18nNotNull);

sample({
  clock: initApp,
  target: [initI18next, initAppFx, initRouter, sessionAuth]
});
// #endregion

// #region teardown
export const teardownApp = createEvent();
const teardownI18nextFx = createEffect(() => {});

sample({
  clock: teardownApp,
  target: [teardownI18nextFx, dbDisconnectFx]
});
// #endregion
