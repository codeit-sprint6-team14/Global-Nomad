import Input from '@/components/common/Input';

interface PasswordInputSectionProps {
  title: string;
  placeholder: string;
}

const PasswordInputSection: React.FC<PasswordInputSectionProps> = ({ title, placeholder }) => {
  return (
    <>
      <h3 className="mt-30 text-2xl-bold">{title}</h3>
      <Input.Password className="mt-20" placeholder={placeholder}></Input.Password>
    </>
  );
};
export default PasswordInputSection;
