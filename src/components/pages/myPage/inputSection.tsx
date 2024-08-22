import Input from '@/components/common/Input';

interface InputSectionProps {
  title: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ title, value, onChange }) => {
  return (
    <>
      <h3 className="mt-30 text-2xl-bold">{title}</h3>
      <Input className="mt-20" placeholder="" defaultValue={value} onChange={onChange} />
    </>
  );
};
export default InputSection;
