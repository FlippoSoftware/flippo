import type { ChangeEvent } from 'react';
import type { TNewFolderModalProps } from '../types/TNewFolderModalProps';
import { SuccessIcon } from '@shared/icons';
import { Button } from '@shared/ui/Button';
import { Dialog } from '@shared/ui/Dialog';
import { FormInput } from '@shared/ui/Input';

import { useTranslation } from 'react-i18next';
import st from './NewFolderModal.module.scss';
import { useNewFolderModal } from './useNewFolderModal';

function NewFolderModal({ ref }: TNewFolderModalProps) {
  const { t } = useTranslation('modal', { keyPrefix: 'createFolder' });
  const {
    creationInProgress,
    modalRef,
    nameInput,
    nameInputError,
    onCloseModal,
    onCreateFolder,
    onNameInputChanged,
    onNameInputRefChanged
  } = useNewFolderModal(ref);

  return (
    <Dialog aria-labelledby={ 'title' } ref={ modalRef }>
      <form
        className={ st.modal }
        onSubmit={ (event) => {
          event.preventDefault();
          onCreateFolder();
        } }
      >
        <div className={ st.content }>
          <h3 id={ 'title' }>{t('title')}</h3>
          <FormInput
            disabled={ creationInProgress }
            errorMessage={ nameInputError ? (t(`input.error.${nameInputError}` as any) as string) : null }
            onChange={ (event: ChangeEvent<HTMLInputElement>) => onNameInputChanged(event.target.value) }
            placeholder={ t('input.placeholder') }
            ref={ (instance) => { onNameInputRefChanged(instance); } }
            size={ 'large' }
            value={ nameInput }
          />
        </div>
        <div className={ st.actions }>
          <Button onClick={ onCloseModal } size={ 'small' } type={ 'button' } variant={ 'secondary' }>
            {t('actions.cancel')}
          </Button>
          <Button iconLeft={ <SuccessIcon type={ 'default' } /> } size={ 'small' } variant={ 'primary' }>
            {t('actions.create')}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

export default NewFolderModal;
