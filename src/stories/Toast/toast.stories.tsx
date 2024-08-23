import Toast, { ToastProps } from '@/components/common/Toast';
import { useToggle } from '@/hooks/useToggle';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useEffect } from 'react';

type StoryProps = ComponentProps<typeof Toast>;

const meta: Meta<typeof Toast> = {
  component: Toast,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

const ShowToastButton = (args: ToastProps) => {
  const { current: showToast, handleToggle: toggleToast } = useToggle(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showToast) {
      timer = setTimeout(() => {
        toggleToast();
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [showToast, toggleToast]);

  return (
    <div>
      <button onClick={toggleToast} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Show Toast
      </button>
      {showToast && <Toast {...args} />}
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ShowToastButton {...args} />,
  args: {
    type: 'success',
    message: '토스트가 성공적으로 띄워졌습니다!',
    id: '1',
  },
};
