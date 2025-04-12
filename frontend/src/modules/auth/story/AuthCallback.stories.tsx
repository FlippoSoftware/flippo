import type { TStoryCombineProps } from '@shared/ui/StoryCombine';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@shared/ui/Button';
import { StoryCombine } from '@shared/ui/StoryCombine';
import { createEvent, fork, sample, scopeBind } from 'effector';
import { Provider } from 'effector-react';

import { $authContent } from '../models/auth.model';
import { $oauthCallbackStatus, OauthStatus } from '../models/oauthCallback.model';
import AuthCallback from '../view/ui/AuthCallback/AuthCallback';
import st from './Decorator.module.scss';

const meta: Meta = {
  component: AuthCallback,
  parameters: {
    docs: {
      description: {
        component: 'Part of the authorization module designed for callback after OAuth authorization'
      }
    }
  },
  title: 'Modules/Auth/AuthCallback'
};

export default meta;

type AuthCallbackStory = StoryObj<typeof AuthCallback>;

const CALLBACK_GROUPS: TStoryCombineProps<{ state: OauthStatus }> = {
  component: CallbackWithState,
  groups: [
    {
      name: 'Callback',
      variants: [
        { components: [{ state: OauthStatus.Pending }], name: 'Pending' },
        { components: [{ state: OauthStatus.Success }], name: 'Success' },
        { components: [{ state: OauthStatus.Fail }], name: 'Failure' }
      ]
    }
  ]
};

export const AuthCallbackStoryCombine: AuthCallbackStory = {
  render: () => <StoryCombine { ...CALLBACK_GROUPS } />
};

export const AuthCallbackSwap: AuthCallbackStory = {
  parameters: {
    layout: 'none'
  },
  render: () => {
    const scope = fork({
      values: [[$authContent, 'oauthCallback']]
    });

    const changeState = createEvent<OauthStatus>();
    const pushState = scopeBind(changeState, { scope });

    sample({
      clock: changeState,
      target: $oauthCallbackStatus
    });

    return (
      <Provider value={ scope }>
        <div className={ st.manipulationContainer }>
          <div className={ st.experimentalContainer }>
            <div className={ st.experimental }>
              <AuthCallback />
            </div>
          </div>
          <div className={ st.switches }>
            <Button onClick={ () => pushState(OauthStatus.Pending) } size={ 'small' } variant={ 'primary' }>
              {'Pending'}
            </Button>
            <Button onClick={ () => pushState(OauthStatus.Success) } size={ 'small' } variant={ 'primary' }>
              {'Success'}
            </Button>
            <Button onClick={ () => pushState(OauthStatus.Fail) } size={ 'small' } variant={ 'primary' }>
              {'Fail'}
            </Button>
          </div>
        </div>
      </Provider>
    );
  }
};

function CallbackWithState(props: { state: OauthStatus }) {
  const { state } = props;

  const scopeStory = fork({
    values: [[$oauthCallbackStatus, state]]
  });

  return (
    <Provider value={ scopeStory }>
      <AuthCallback />
    </Provider>
  );
}
