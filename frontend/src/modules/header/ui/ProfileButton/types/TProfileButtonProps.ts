import type { TInternationalizationLocales } from 'src/settings/i18next/i18next.constants';

interface TProfileButtonProps {
  avatar?: string;
  language: TInternationalizationLocales;
  onLanguageSwitch: ()=> void;
  onLogout: ()=> void;
  onSettings: ()=> void;
  username: string;
}

export type { TProfileButtonProps };
