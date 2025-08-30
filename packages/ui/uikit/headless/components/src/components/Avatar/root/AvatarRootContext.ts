'use client';

import React from 'react';

import type { ImageLoadingStatus } from './AvatarRoot';

export type TAvatarRootContext = {
    imageLoadingStatus: ImageLoadingStatus;
    setImageLoadingStatus: React.Dispatch<React.SetStateAction<ImageLoadingStatus>>;
};

export const AvatarRootContext = React.createContext<TAvatarRootContext | undefined>(undefined);

export function useAvatarRootContext() {
    const context = React.use(AvatarRootContext);

    if (context === undefined) {
        throw new Error(
            'Headless UI: AvatarRootContext is missing. Avatar parts must be placed within <Avatar.Root>.'
        );
    }

    return context;
}
