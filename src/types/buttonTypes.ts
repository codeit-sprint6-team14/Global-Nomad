export type DefaultButtonVariant = 'primary' | 'secondary';

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface ButtonProps extends BaseButtonProps {
  variant?: DefaultButtonVariant;
}

export interface CategoryButtonProps extends BaseButtonProps {
  isActive?: boolean;
}
