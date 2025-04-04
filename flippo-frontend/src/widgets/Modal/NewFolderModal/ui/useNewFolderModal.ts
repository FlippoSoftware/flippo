import { useUnit } from 'effector-react';
import { type ForwardedRef, useEffect, useImperativeHandle, useRef } from 'react';

import { $creationInProgress, closeModal, createFolder, input, modalRefChanged } from '../model/newFolder.model';

export const useNewFolderModal = (ref: ForwardedRef<HTMLDialogElement>) => {
  const [
    creationInProgress,
    onCreateFolder,
    onCloseModal,
    onModalRefChanged,
    nameInput,
    nameInputError,
    onNameInputChanged,
    onNameInputRefChanged
  ] = useUnit([
    $creationInProgress,
    createFolder,
    closeModal,
    modalRefChanged,
    input.$nameInput,
    input.$nameInputError,
    input.nameInputChanged,
    input.nameInputRefChanged
  ]);
  const modalRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => modalRef.current as HTMLDialogElement);

  useEffect(() => {
    if (modalRef.current) onModalRefChanged(modalRef.current);

    return () => {
      onModalRefChanged(null);
    };
  }, [onModalRefChanged]);

  useEffect(() => {
    const modal = modalRef.current;

    const clickOutside = (event: MouseEvent) => {
      if (event.target instanceof Node && modal && (!modal.contains(event.target) || modal == event.target))
        onCloseModal();
    };

    if (modal) document.addEventListener('mousedown', clickOutside);

    return () => {
      if (modal) document.removeEventListener('mousedown', clickOutside);
    };
  }, [onCloseModal]);

  return {
    creationInProgress,
    modalRef,
    nameInput,
    nameInputError,
    onCloseModal,
    onCreateFolder,
    onNameInputChanged,
    onNameInputRefChanged
  };
};
