import { use } from 'react';
import { SelectContext } from './SelectContext';

export function useSelect() {
  const context = use(SelectContext);

  if (!context) {
    throw new Error(
      'useSelect() must be used within a Select. It happens when you use Option components outside the Select component.'
    );
  }

  return context;
}
