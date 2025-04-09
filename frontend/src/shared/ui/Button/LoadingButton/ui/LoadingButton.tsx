import type { TLoadingButtonProps } from '../types/TLoadingButtonProps';
import { Button } from '@shared/ui/Button';

import { Loader } from '@shared/ui/Loader';

function LoadingButton(props: TLoadingButtonProps) {
  const { children, isLoading, loader = 'spinner', ...otherProps } = props;
  return (
    <Button
      type={ 'button' }
      as={ 'button' }
      disabled={ isLoading }
      iconRight={ isLoading ? <Loader loader={ loader } /> : undefined }
      { ...otherProps }
    >
      {children}
    </Button>
  );
}

export default LoadingButton;
