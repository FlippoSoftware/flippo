import type { MouseEvent, ReactNode } from 'react';

type TNotificationKind = 'error' | 'success' | 'timer' | 'warning';

interface TToastProps {
  content?: ReactNode;
  id: string;
  message: string;
  onAutomaticClosingAction?: ()=> void;
  onClickButtonClose?: ()=> void;
  onClickContent?: (event?: MouseEvent<HTMLElement>)=> void;
  onClose?: (...args: any[])=> any;
  statusIconSize?: number;
  timeout?: number;
  variant: TNotificationKind;
}

export { type TNotificationKind, type TToastProps };
