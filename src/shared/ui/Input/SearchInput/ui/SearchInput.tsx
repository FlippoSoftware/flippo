import { CloseIcon } from '@shared/icons';
import { SearchIcon } from '@shared/icons';
import { IconButton } from '@shared/ui/Button';
import { type TIconButtonProps } from '@shared/ui/Button';

import { type TInputProps } from '../../Input/types/TInputProps';
import Input from '../../Input/ui/Input';
import { type TSearchInputProps } from '../types/TSearchInputProps';
import st from './SearchInput.module.scss';

const SIZE_CLEAR_BUTTON: { [key in TInputProps['size']]: TIconButtonProps['size'] } = {
  large: 'small',
  regular: 'x-small'
};

function SearchInput(props: TSearchInputProps) {
  const { onClickClearButton, size, value } = props;

  return (
    <Input icon={<SearchIcon />} type={'search'} {...props} className={value ? st['paddingRight-0'] : ''}>
      {value && value.length !== 0 ? (
        <div className={st.clearButton}>
          <IconButton onClick={onClickClearButton} size={SIZE_CLEAR_BUTTON[size]} variant={'label'}>
            <CloseIcon />
          </IconButton>
        </div>
      ) : null}
    </Input>
  );
}

export default SearchInput;
