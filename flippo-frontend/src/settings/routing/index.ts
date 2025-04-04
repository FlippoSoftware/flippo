import { chainAnonymous, chainAuthorized, chainOptionalAuthorization } from '@settings/session';
import { createHistoryRouter, createRoute, type UnmappedRouteObject } from 'atomic-router';
import { createEvent, sample } from 'effector';
import { createBrowserHistory } from 'history';

export type TSettingsRouteParams = {
  userId?: string;
};

export type TFolderRouteParams = {
  folderId: string;
};

export type TSetRouteParams = {
  setId: string;
};

export const initRouter = createEvent();

export const mainRoute = createRoute();
export const authRoute = createRoute();
export const callbackRoute = createRoute();
export const collectionRoute = createRoute();
export const communityRoute = createRoute();
export const settingsRoute = createRoute<TSettingsRouteParams>();
export const folderRoute = createRoute<TFolderRouteParams>();
export const setRoute = createRoute<TSetRouteParams>();

const ROUTES: UnmappedRouteObject<any>[] = [
  { path: '/', route: mainRoute },
  { path: '/auth', route: authRoute },
  { path: '/auth/callback', route: callbackRoute },
  { path: '/collection', route: collectionRoute },
  { path: '/folders/:folderId', route: folderRoute },
  { path: '/sets/:setId', route: setRoute },
  { path: '/community', route: communityRoute },
  { path: '/settings/:userId', route: settingsRoute }
];

export const router: ReturnType<typeof createHistoryRouter> = createHistoryRouter({ routes: ROUTES });

sample({ clock: initRouter, fn: () => createBrowserHistory(), target: router.setHistory });

export const mainOptionalRoute = chainOptionalAuthorization(mainRoute);
export const collectionOptionalRoute = chainOptionalAuthorization(collectionRoute);
export const communityOptionalRoute = chainOptionalAuthorization(communityRoute);
export const folderOptionalRoute = chainOptionalAuthorization(folderRoute);
export const setOptionalRoute = chainOptionalAuthorization(setRoute);
export const authAnonymousRoute = chainAnonymous(authRoute); //, { otherwise: router.back });
export const callbackAnonymousRoute = chainAnonymous(callbackRoute); //, { otherwise: router.back });
export const settingsAuthorizedRoute = chainAuthorized(settingsRoute); //, { otherwise: mainRoute.open });
