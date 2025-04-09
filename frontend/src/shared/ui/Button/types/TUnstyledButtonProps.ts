import type { ComponentPropsWithRef, ElementType, Ref } from 'react';

type TUnstyledButtonOwnProps<E extends ElementType> = {
  as?: E;
  ref?: Ref<HTMLButtonElement>;
};

type TUnstyledButtonProps<E extends ElementType> = Omit<ComponentPropsWithRef<E>, keyof TUnstyledButtonOwnProps<E>> &
  TUnstyledButtonOwnProps<E>;

export { type TUnstyledButtonProps };
