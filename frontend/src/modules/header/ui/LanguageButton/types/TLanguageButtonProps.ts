import type { TInternationalizationLocales } from 'src/settings/i18next/i18next.constants';

type TLanguageButtonProps = {
  language: TInternationalizationLocales;
  onLanguageSwitch: VoidFunction;
};

export type { TLanguageButtonProps };
