import type { TFadeTransitionProps } from '../types/TFadeTransitionProps';
import { AnimatePresence, motion } from 'framer-motion';

function FadeTransition(props: TFadeTransitionProps) {
  const {
    animateOpacity = 1,
    children,
    className = '',
    contentKey,
    exitOpacity = 0,
    initialOpacity = 0,
    transition,
    ref,
    ...otherProps
  } = props;

  return (
    <AnimatePresence mode={ 'wait' }>
      <motion.div
        { ...otherProps }
        animate={ { opacity: animateOpacity } }
        className={ className }
        exit={ { opacity: exitOpacity } }
        initial={ { opacity: initialOpacity } }
        key={ contentKey }
        ref={ ref }
        transition={ { duration: 0.3, ...transition } }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default FadeTransition;
