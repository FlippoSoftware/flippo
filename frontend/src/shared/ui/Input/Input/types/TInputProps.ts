import type { ComponentPropsWithRef, ReactElement } from 'react';

interface TInputOwnProps {
  icon?: ReactElement<HTMLOrSVGElement>;
  size: 'large' | 'regular';
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
}

type TInputProps = Omit<ComponentPropsWithRef<'input'>, keyof TInputOwnProps> & TInputOwnProps;

export { type TInputProps };
