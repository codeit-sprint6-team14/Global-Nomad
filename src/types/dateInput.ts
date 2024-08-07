export type DateInputProps = {
  onChange?: (date: Date | null) => void;
  initialDate?: Date;
  placeholder?: string;
  className?: string;
};

export type CustomInputProps = React.HTMLProps<HTMLInputElement> & {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
  className?: string;
};
