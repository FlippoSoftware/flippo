import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';

type TSelectProps = {
  children: ReactNode;
  defaultOption?: string;
  icon?: ReactElement;
  onSelected: ((value: string)=> void) | Dispatch<SetStateAction<string>>;
  placeholder: string;
  placementDropdown?: 'left' | 'right';
  selected: string;
};

export type { TSelectProps };
