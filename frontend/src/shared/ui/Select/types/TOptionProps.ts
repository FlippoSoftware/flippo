import type { ComponentProps, ReactElement } from 'react';

interface TOptionOwnProps { icon: ReactElement; index?: number; title: string; value: string }

type TOptionProps = Omit<ComponentProps<'button'>, 'role' | keyof TOptionOwnProps> & TOptionOwnProps;

export type { TOptionProps };
