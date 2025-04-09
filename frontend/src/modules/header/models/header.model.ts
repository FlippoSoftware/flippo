import type { TSession } from '@settings/session';

import type { Store } from 'effector';
import type { TInternationalizationLocales } from 'src/settings/i18next/i18next.constants';
import type Surreal from 'surrealdb';
import { $language, changeLanguageFx } from '@settings/i18next';
import { authRoute, settingsRoute } from '@settings/routing';
import { $session, sessionSignOut } from '@settings/session';
import { $db } from '@settings/surreal';
import { createEvent, sample } from 'effector';

import { userFoldersQu, userRecentQu } from '../api';

type TSessionForHeader = { avatarUrl: TSession['image'] } & Pick<TSession, 'userId' | 'username'>;

export const logout = createEvent();
export const toSettings = createEvent();
export const toAuth = createEvent();
export const $sessionForHeader = $session.map((store) => {
  if (!store)
    return null;

  const username = store.username || `${store.name} ${store.surname}` || store.email || store.userId.toString();

  return {
    avatarUrl: store.image,
    userId: store.userId,
    username
  } as TSessionForHeader;
});

export const $currentLanguage = $language.map(store => store || 'en') as Store<TInternationalizationLocales>;
export const languageSwitch = createEvent();

export const $folders = userFoldersQu.$data.map(folders => folders);
export const $recent = userRecentQu.$data.map(recent => recent);

userFoldersQu.$data.watch(data => console.warn(data));

userFoldersQu.$error.watch(e => console.error(e));

sample({
  clock: languageSwitch,
  source: $language,
  fn: (lng) => {
    return lng === 'ru' ? 'en' : 'ru';
  },
  target: changeLanguageFx
});

sample({ clock: logout, target: sessionSignOut });

sample({
  clock: toSettings,
  source: $sessionForHeader,
  filter: session => !!session,
  fn: (session: TSessionForHeader) => ({
    userId: session?.userId.toString()
  }),
  target: settingsRoute.open
});

sample({
  clock: $sessionForHeader,
  source: $db,
  filter: (_, session) => !!session,
  fn: (db, session) => ({ db: db as Surreal, userId: (session as TSessionForHeader).userId.toString() }),
  target: [userFoldersQu.start, userRecentQu.start]
});

userFoldersQu.start.watch(() => console.warn('FETCH FOLDER'));

sample({ clock: toAuth, target: authRoute.open });
