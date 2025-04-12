import type { ComponentPropsWithRef, ReactElement, Ref } from 'react';

type TInputOwnProps = {
  ref?: Ref<HTMLInputElement>;
  icon?: ReactElement<HTMLOrSVGElement>;
  size: 'large' | 'regular';
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
};

type TInputProps = Omit<ComponentPropsWithRef<'input'>, keyof TInputOwnProps> & TInputOwnProps;

export { type TInputProps };
