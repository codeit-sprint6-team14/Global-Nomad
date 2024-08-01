export interface Option {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: Option[];
  defaultOption: string;
  onSelect?: (option: Option) => void;
}

export interface DropdownListProps {
  options: Option[];
  selectedOption: Option | null;
  onOptionClick: (option: Option) => void;
}
