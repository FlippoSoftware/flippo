import type { ComponentProps, ReactElement } from 'react';

type TMenuHandlerProps = {
  children: ComponentProps<any> | ReactElement;
} & ComponentProps<any>;

export type { TMenuHandlerProps };
