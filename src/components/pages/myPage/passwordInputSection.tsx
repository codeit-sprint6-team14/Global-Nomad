import Input from '@/components/common/Input';

interface PasswordInputSectionProps {
  title: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
}

const PasswordInputSection: React.FC<PasswordInputSectionProps> = ({
  title,
  placeholder,
  value,
  onChange,
  readonly,
}) => {
  return (
    <>
      <h3 className="mt-30 text-2xl-bold">{title}</h3>
      <Input.Password
        className="mt-20"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
    </>
  );
};
export default PasswordInputSection;
