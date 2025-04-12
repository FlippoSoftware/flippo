import type { FC } from 'react';
import type { TLoadingIconProps } from '../icons/types/TLoadingIconProps';

import type { TLoaderProps, TLoadingKind } from '../types/TLoaderProps';
import { Suspense } from 'react';
import DotsFade from '../icons/DotsFadeIcon';
import SpinnerIcon from '../icons/LoadingIcon';

const Loaders: { [key in TLoadingKind]: FC<TLoadingIconProps> } = {
  dotsFade: DotsFade,
  spinner: SpinnerIcon
};

function Loader(props: TLoaderProps) {
  const { loader, ...otherProps } = props;

  const Component = Loaders[loader];

  return <Component { ...otherProps } />;
}

function withSuspense(Component: FC<TLoaderProps>) {
  function SuspenseComponent(props: TLoaderProps) {
    return (
      <Suspense fallback={ <></> }>
        <Component { ...props } />
      </Suspense>
    );
  }

  return SuspenseComponent;
}

export default withSuspense(Loader);
