export type DefaultButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: DefaultButtonVariant;
}

export interface CategoryButtonProps extends ButtonProps {
  isActive?: boolean;
  onClick?: () => void;
}
