import Input from '@/components/Input';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Input.Dropdown> = {
  component: Input.Dropdown,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input.Dropdown>;

export const Default: Story = {
  args: {
    options: [
      { value: 'option1', label: '문화예술' },
      { value: 'option2', label: '식음료' },
      { value: 'option3', label: '스포츠' },
      { value: 'option4', label: '관광' },
    ],
    defaultOption: '카테고리를 선택해주세요',
  },
};

export const Skills: Story = {
  args: {
    options: [
      { value: 'option1', label: 'React.js' },
      { value: 'option2', label: 'Next.js' },
      { value: 'option3', label: 'Vue.js' },
    ],
    defaultOption: 'Choose your skills',
  },
};
