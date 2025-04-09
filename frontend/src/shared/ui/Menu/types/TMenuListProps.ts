import type { MotionProps } from 'framer-motion';
import type { ComponentProps, Ref } from 'react';

type TMenuList = { ref: Ref<HTMLMenuElement> } & ComponentProps<'menu'> & MotionProps;

export type { TMenuList };
