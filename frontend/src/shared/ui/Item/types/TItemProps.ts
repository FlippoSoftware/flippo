import type { ComponentProps, ReactElement } from 'react';

interface TItem {
  disabled?: boolean;
  icon: ReactElement;
  onClick?: ()=> void;
  title: string;
  variant?: 'destructive' | 'nonDestructive';
}

type TItemProps = Omit<ComponentProps<'div'>, keyof TItem> & TItem;

export type { TItem, TItemProps };
