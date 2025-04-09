import type { TInternationalizationLocales } from 'src/settings/i18next/i18next.constants';

interface TLanguageButtonProps {
  language: TInternationalizationLocales;
  onLanguageSwitch: VoidFunction;
}

export type { TLanguageButtonProps };
