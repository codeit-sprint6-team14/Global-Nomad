import Input from '@/components/common/Input';

interface InputSectionProps {
  title: string;
}

const InputSection: React.FC<InputSectionProps> = ({ title }) => {
  return (
    <>
      <h3 className="mt-30 text-2xl-bold">{title}</h3>
      <Input className="mt-20" placeholder="" />
    </>
  );
};
export default InputSection;
