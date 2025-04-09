import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';

type TMenuItemProps = {
  ref: Ref<HTMLButtonElement>;
  blockClose?: boolean;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type { TMenuItemProps };
