import type { PropsWithRef } from 'react';
import type { TSizeTransitionProps } from '../types/TSizeTransitionProps';
import { motion } from 'framer-motion';
import { cloneElement, isValidElement, useRef, useState } from 'react';

import useMeasure from 'react-use-measure';

function SizeTransition(props: TSizeTransitionProps) {
  const { children, style, transition, ...otherProps } = props;
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [scope, { height, width }] = useMeasure();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // !TODO: alternative implementation
  const childWithRef = isValidElement(children)
    // eslint-disable-next-line react/no-clone-element
    ? cloneElement<PropsWithRef<any>>(children, {
        onAnimationComplete: () => setIsAnimated(false),
        onAnimationStart: () => setIsAnimated(true),
        ref: scope
      })
    : children;

  return (
    <motion.div
      { ...otherProps }
      layout
      ref={ wrapperRef }
      style={ {
        height: isAnimated
          ? wrapperRef.current
            ? Number.parseInt(wrapperRef.current.style.padding) * 2 + height
            : height
          : 'fit-content',
        width: isAnimated
          ? wrapperRef.current
            ? Number.parseInt(wrapperRef.current.style.padding) * 2 + width
            : width
          : 'fit-content',
        ...style
      } }
      transition={ { duration: 0.15, ...transition } }
    >
      {childWithRef}
    </motion.div>
  );
}

export default SizeTransition;
