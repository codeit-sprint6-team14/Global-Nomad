import DropDownList from '@/components/Dropdown/dropDownList';
import DropDownOption from '@/components/Dropdown/dropDownOption';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

type StoryProps = ComponentProps<typeof DropDownList>;

const meta: Meta<typeof DropDownList> = {
  component: DropDownList,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: (args) => {
    const handleOptionClick = action('Click Option');

    return (
      <DropDownList {...args}>
        {Array.from({ length: 10 }, (_, i) => (
          <DropDownOption key={i} handleOptionClick={handleOptionClick} label={`옵션 ${i + 1}`} className="" />
        ))}
      </DropDownList>
    );
  },
};
