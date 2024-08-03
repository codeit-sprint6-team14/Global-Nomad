/* eslint-disable react-hooks/rules-of-hooks */
import CategoryButton from '@/components/Button/categoryButton';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';

type StoryProps = ComponentProps<typeof CategoryButton> & {
  buttonText?: string;
};

const meta: Meta<typeof CategoryButton> = {
  component: CategoryButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StoryProps>;

const useButtonClick = (initialCategory: string | null = null) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);

  const handleButtonClick = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category));
    action('button-clicked')(category);
  };

  return { activeCategory, handleButtonClick };
};

export const Default: Story = {
  render: () => {
    const { activeCategory, handleButtonClick } = useButtonClick();
    const category = 'Single Category';

    return (
      <CategoryButton isActive={activeCategory === category} onClick={() => handleButtonClick(category)}>
        {category}
      </CategoryButton>
    );
  },
};

export const CategoryButtonGroup: Story = {
  render: () => {
    const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4'];
    const { activeCategory, handleButtonClick } = useButtonClick(categories[0]);

    return (
      <div className="flex gap-10">
        {categories.map((category) => (
          <CategoryButton
            key={category}
            isActive={activeCategory === category}
            onClick={() => handleButtonClick(category)}
          >
            {category}
          </CategoryButton>
        ))}
      </div>
    );
  },
};
