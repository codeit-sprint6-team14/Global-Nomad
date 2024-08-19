export interface Option {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: Option[];
  defaultOption: string;
  value?: string;
  onSelect?: (option: Option) => void;
  onFocus?: () => void;
  className?: string;
  error?: boolean;
}

export interface DropdownListProps {
  options: Option[];
  selectedOption: Option | null;
  onOptionClick: (option: Option) => void;
}
