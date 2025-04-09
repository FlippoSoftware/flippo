import { NotFoundPage } from '@pages';
import {
  authAnonymousRoute,
  authRoute,
  callbackAnonymousRoute,
  callbackRoute,
  collectionOptionalRoute,
  collectionRoute,
  communityOptionalRoute,
  communityRoute,
  mainOptionalRoute,
  mainRoute,
  setOptionalRoute,
  settingsAuthorizedRoute,
  settingsRoute
} from '@settings/routing';
import { createRoutesView, createRouteView } from 'atomic-router-react';
import { createRoot } from 'react-dom/client';
import AuthCallbackPage from './auth/callback/page';

import AuthPage from './auth/page';
import { InitApp } from './init/index';
import { BaseLayout } from './layouts';
import '@settings/styles/global.scss';

const RoutesView = createRoutesView({
  otherwise: () => <NotFoundPage />,
  routes: [
    {
      layout: BaseLayout,
      route: mainRoute,
      view: createRouteView({ route: mainOptionalRoute, view: () => <h1>{'Main'}</h1> })
    },
    {
      layout: BaseLayout,
      route: communityRoute,
      view: createRouteView({ route: communityOptionalRoute, view: () => <h1>{'Community'}</h1> })
    },
    {
      layout: BaseLayout,
      route: collectionRoute,
      view: createRouteView({ route: collectionOptionalRoute, view: () => <h1>{'Collection'}</h1> })
    },
    {
      layout: BaseLayout,
      route: settingsRoute,
      view: createRouteView({ route: settingsAuthorizedRoute, view: () => <h1>{'Settings'}</h1> })
    },
    {
      layout: BaseLayout,
      route: setOptionalRoute,
      view: () => <h1>{'Set'}</h1>
    },
    {
      layout: BaseLayout,
      route: settingsRoute,
      view: createRouteView({ route: settingsAuthorizedRoute, view: () => <h1>{'Settings'}</h1> })
    },

    { route: authRoute, view: createRouteView({ route: authAnonymousRoute, view: () => <AuthPage /> }) },
    { route: callbackRoute, view: createRouteView({ route: callbackAnonymousRoute, view: () => <AuthCallbackPage /> }) }
  ]
});

createRoot(document.getElementById('root')!).render(
  <InitApp>
    <RoutesView />
  </InitApp>
);
