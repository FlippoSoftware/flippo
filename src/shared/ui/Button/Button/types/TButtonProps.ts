import type { TUnstyledButtonProps } from '@shared/ui/Button';
import type { ReactElement } from 'react';

type TButtonProps<E extends 'a' | 'button'> = {
  children: string;
  iconLeft?: ReactElement<HTMLOrSVGElement>;
  iconRight?: ReactElement<HTMLOrSVGElement>;
  size: 'large' | 'small';
  variant: 'label' | 'outlined' | 'primary' | 'secondary';
} & Omit<TUnstyledButtonProps<E>, 'children'>;

export { type TButtonProps };
