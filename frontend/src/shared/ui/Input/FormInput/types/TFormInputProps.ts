import type { TInputProps } from '@shared/ui/Input';
import type { Ref } from 'react';

type TFormInputProps = {
  ref?: Ref<HTMLInputElement>;
  errorMessage?: null | string;
} & TInputProps;

export { type TFormInputProps };
