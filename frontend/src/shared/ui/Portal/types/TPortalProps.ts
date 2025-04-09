import type { PropsWithChildren, RefObject } from 'react';

type TPortalProps = PropsWithChildren<{
  targetId?: string;
  targetRef?: RefObject<HTMLElement | null>;
}>;

type TPortalPropsWithId = PropsWithChildren<{ targetId?: string }>;
type TPortalPropsWithContainerRef = PropsWithChildren<{ targetRef?: RefObject<HTMLElement | null> }>;

export { type TPortalProps, type TPortalPropsWithContainerRef, type TPortalPropsWithId };
