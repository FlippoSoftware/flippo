import type { ElementType } from 'react';
import type { TUnstyledButtonProps } from '../types/TUnstyledButtonProps';

function UnstyledButton<E extends ElementType = 'a' | 'button'>(
  props: TUnstyledButtonProps<E>
) {
  const { as: Element = 'button', children, ref, ...otherProps } = props;

  return (
    <Element ref={ ref } { ...otherProps }>
      {children}
    </Element>
  );
}

export default UnstyledButton;
