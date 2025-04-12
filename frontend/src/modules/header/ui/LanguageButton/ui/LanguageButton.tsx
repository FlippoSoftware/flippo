import type { TLanguageButtonProps } from '../types/TLanguageButtonProps';
import { LanguageIcon } from '@shared/icons';
import { IconButton } from '@shared/ui/Button';
import { Menu, MenuHandler, MenuList } from '@shared/ui/Menu';

import { useTranslation } from 'react-i18next';
import { LanguageSwitch } from '../../LanguageSwitch';
import st from './LanguageButton.module.scss';

function LanguageButton(props: TLanguageButtonProps) {
  const { language, onLanguageSwitch } = props;
  const { t } = useTranslation('header', { keyPrefix: 'profileButton' });

  return (
    <Menu offset={ 12 } placement={ 'top' }>
      <MenuHandler>
        <IconButton size={ 'small' } variant={ 'label' }>
          <LanguageIcon />
        </IconButton>
      </MenuHandler>
      <MenuList>
        <div className={ st.languageSwitch }>
          <span id={ 'language-switch' }>{t('switchLabel')}</span>
          <LanguageSwitch
            aria-labelledby={ 'language-switch' }
            language={ language || 'en' }
            onLanguageSwitch={ onLanguageSwitch }
          />
        </div>
      </MenuList>
    </Menu>
  );
}

export default LanguageButton;
