import type { ComponentProps, ReactElement, Ref } from 'react';

type TMenuHandlerProps = {
  ref: Ref<HTMLElement>;
  children: ComponentProps<any> | ReactElement;
} & ComponentProps<any>;

export type { TMenuHandlerProps };
