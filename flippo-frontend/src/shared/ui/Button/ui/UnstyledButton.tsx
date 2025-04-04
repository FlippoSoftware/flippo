import { type ElementType, type ForwardedRef, forwardRef } from 'react';

import { type TUnstyledButtonProps } from '../types/TUnstyledButtonProps';

function UnstyledButton<E extends ElementType = 'a' | 'button'>(
  props: TUnstyledButtonProps<E>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  const { as: Element = 'button', children, ...otherProps } = props;

  return (
    <Element ref={ref} {...otherProps}>
      {children}
    </Element>
  );
}

export default forwardRef(UnstyledButton);
