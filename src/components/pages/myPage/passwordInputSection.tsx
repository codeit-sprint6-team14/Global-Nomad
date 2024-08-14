import Input from '@/components/common/Input';

interface PasswordInputSectionProps {
  title: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInputSection: React.FC<PasswordInputSectionProps> = ({ title, placeholder, value, onChange }) => {
  return (
    <>
      <h3 className="mt-30 text-2xl-bold">{title}</h3>
      <Input.Password className="mt-20" placeholder={placeholder} value={value} onChange={onChange}></Input.Password>
    </>
  );
};
export default PasswordInputSection;
