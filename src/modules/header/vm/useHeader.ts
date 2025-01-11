import { useUnit } from 'effector-react';
import { useRef } from 'react';

import {
  $currentLanguage,
  $folders,
  $recent,
  $sessionForHeader,
  languageSwitch,
  logout,
  toAuth,
  toSettings
} from '../models/header.model';

const useHeader = () => {
  const [sessionForHeader, currentLanguage, folders, recent, onLogout, onLanguageSwitch, onToSettings, onToAuth] =
    useUnit([$sessionForHeader, $currentLanguage, $folders, $recent, logout, languageSwitch, toSettings, toAuth]);
  const newFolderModalRef = useRef<HTMLDialogElement>(null);

  const onOpenNewFolderModal = () => {
    if (newFolderModalRef.current) newFolderModalRef.current.showModal();
  };

  return {
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
  };
};

export { useHeader };
