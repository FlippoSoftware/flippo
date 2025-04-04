import { Button } from '@shared/ui/Button';
import { type Meta, type StoryObj } from '@storybook/react';
import { useRef } from 'react';

import NewFolderModal from '../ui/NewFolderModal';

const meta: Meta = {
  component: NewFolderModal,
  title: 'Widgets/Modal/NewFolderModal'
};

export default meta;

type NewFolderModalStory = StoryObj<typeof NewFolderModal>;

export const Default: NewFolderModalStory = {
  parameters: {},
  render: () => <WithToggleButton />
};

function WithToggleButton() {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button onClick={() => ref.current?.showModal()} size={'small'} variant={'primary'}>
        {'Open modal'}
      </Button>
      <NewFolderModal ref={ref} />
    </>
  );
}
