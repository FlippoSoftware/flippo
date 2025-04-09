import type { Effect, Store } from 'effector';
import type { Event as Event_2 } from 'effector';
import type { i18n, TFunction } from 'i18next';
import type auth from '../../../locales/en/auth.json';
import type header from '../../../locales/en/header.json';

import type modal from '../../../locales/en/modal.json';
import type notfound from '../../../locales/en/notfound.json';
import type translation from '../../../locales/en/translation.json';

type TTranslation = typeof translation;
type TAuth = typeof auth;
type THeader = typeof header;
type TNotfound = typeof notfound;
type TModal = typeof modal;

type TResource = {
  auth: TAuth;
  header: THeader;
  modal: TModal;
  notfound: TNotfound;
  translation: TTranslation;
};

declare module 'i18next' {
  type CustomTypeOptions = {
    resources: TResource;
  };
}

declare module '@withease/i18next' {
  export type I18nextIntegration = {
    $instance: Store<i18n | null>;
    $isReady: Store<boolean>;
    $language: Store<null | string>;
    $t: Store<TFunction>;
    changeLanguageFx: Effect<string, void, unknown>;
    reporting: {
      missingKey: Event_2<MissinKeyReport>;
    };
    translated: Translated;
  };

  export type MissinKeyReport = {
    key: string;
    lngs: readonly string[];
    namespace: string;
    res: string;
  };

  export type Translated = {
    (key: string, variables?: Record<string, Store<string>>): Store<string>;
    (parts: TemplateStringsArray, ...stores: Store<string>[]): Store<string>;
  };
}
