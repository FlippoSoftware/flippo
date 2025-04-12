import type { TSelectContextProviderProps, TSelectContextValue } from '../types/TSelectContextValue';

import { createContext } from 'react';

export const SelectContext = createContext<null | TSelectContextValue>(null);
SelectContext.displayName = 'Flippo.SelectContext';

export function SelectContextProvider({ children, value }: TSelectContextProviderProps) {
  return <SelectContext value={ value }>{children}</SelectContext>;
}
