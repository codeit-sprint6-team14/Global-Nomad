import Input from '@/components/common/Input';

interface InputSectionProps {
  title: string;
  value?: string;
  readonly?: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ title, value, readonly }) => {
  return (
    <>
      <h3 className="mt-30 text-2xl-bold">{title}</h3>
      <Input className="mt-20" placeholder="" defaultValue={value} readOnly={readonly} />
    </>
  );
};
export default InputSection;
