import { collectionRoute, communityRoute, folderRoute, mainRoute, setRoute } from '@settings/routing';
import {
  AddIcon,
  ExploreIcon,
  FolderIcon,
  HomeIcon,
  InterestsIcon,
  LoginIcon,
  NotificationIcon,
  SetIcon
} from '@shared/icons';
import { Button, IconButton } from '@shared/ui/Button';
import { NavigationLink } from '@shared/ui/Link';
import { Separator } from '@shared/ui/Separator';
import NewFolderModal from '@widgets/Modal/NewFolderModal';
import { Link } from 'atomic-router-react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import LanguageButton from '../ui/LanguageButton';
import ProfileButton from '../ui/ProfileButton';
import { useHeader } from '../vm/useHeader';
import st from './Header.module.scss';

function Header() {
  const {
    currentLanguage,
    folders,
    newFolderModalRef,
    onLanguageSwitch,
    onLogout,
    onOpenNewFolderModal,
    onToAuth,
    onToSettings,
    recent,
    sessionForHeader
  } = useHeader();
  const { t } = useTranslation('header');

  return (
    <header className={ st.header }>
      <div className={ st.primary }>
        <Link className={ st.logo } to={ mainRoute }>
          {'Flippo'}
        </Link>
        <Button iconLeft={ <SetIcon type={ 'add' } /> } size={ 'large' } variant={ 'primary' }>
          {t('createSet')}
        </Button>
      </div>

      <nav>
        <ul>
          <li>
            <NavigationLink icon={ <HomeIcon /> } size={ 'large' } title={ t('main') } to={ mainRoute } />
          </li>
          <li>
            <NavigationLink icon={ <ExploreIcon /> } size={ 'large' } title={ t('community') } to={ communityRoute } />
          </li>
          <li>
            <NavigationLink icon={ <InterestsIcon /> } size={ 'large' } title={ t('collection') } to={ collectionRoute } />
          </li>
        </ul>

        {sessionForHeader
          ? (
              <>
                {recent.length > 0
                  ? (
                      <section aria-labelledby={ 'recent-header' } className={ st.recentSection }>
                        <h3 id={ 'recent-header' }>{t('recent')}</h3>
                        <ul aria-labelledby={ 'recent-header' }>
                          {recent.map(rec => (
                            <li key={ rec.id }>
                              <NavigationLink
                                icon={ <SetIcon /> }
                                params={ { setId: rec.id } }
                                size={ 'small' }
                                title={ rec.name }
                                to={ setRoute }
                              />
                            </li>
                          ))}
                        </ul>
                      </section>
                    )
                  : null}

                <section aria-labelledby={ 'your-folders-header' } className={ st.folderSection }>
                  <div>
                    <h3 id={ 'your-folders-header' }>{t('yourFolders')}</h3>
                    <IconButton aria-label={ 'Add folder' } onClick={ onOpenNewFolderModal } size={ 'small' } variant={ 'label' }>
                      <AddIcon />
                    </IconButton>
                    {createPortal(<NewFolderModal ref={ newFolderModalRef } />, document.body)}
                  </div>
                  <ul aria-labelledby={ 'your-folders-header' }>
                    {folders.map(folder => (
                      <li key={ folder.id }>
                        <NavigationLink
                          icon={ <FolderIcon /> }
                          params={ { folderId: folder.id } }
                          size={ 'small' }
                          title={ folder.name }
                          to={ folderRoute }
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )
          : null}
      </nav>

      <div className={ st.profile }>
        {sessionForHeader
          ? (
              <>
                <ProfileButton
                  avatar={ sessionForHeader.avatarUrl }
                  language={ currentLanguage }
                  onLanguageSwitch={ onLanguageSwitch }
                  onLogout={ onLogout }
                  onSettings={ onToSettings }
                  username={ sessionForHeader.username }
                />
                <Separator orientation={ 'vertical' } spacing={ 'spacing-8' } />
                <IconButton size={ 'small' } variant={ 'label' }>
                  <NotificationIcon />
                </IconButton>
              </>
            )
          : (
              <>
                <Button
                  className={ st.signButton }
                  iconLeft={ <LoginIcon /> }
                  onClick={ onToAuth }
                  size={ 'small' }
                  variant={ 'secondary' }
                >
                  {t('signin')}
                </Button>
                <Separator orientation={ 'vertical' } spacing={ 'spacing-8' } />
                <LanguageButton language={ currentLanguage } onLanguageSwitch={ onLanguageSwitch } />
              </>
            )}
      </div>
    </header>
  );
}

export default Header;
