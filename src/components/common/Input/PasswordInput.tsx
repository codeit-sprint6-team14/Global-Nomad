import { usePasswordVisibility } from '@/hooks/usePasswordVisibility';
import { InputProps } from '@/types/defaultInputTypes';
import Image from 'next/image';

import DefaultInput from './DefaultInput';

const PasswordInput = ({ placeholder, register, ...props }: InputProps) => {
  const { isVisible, toggleVisibility } = usePasswordVisibility();

  return (
    <div className="relative">
      <DefaultInput
        isAuth
        type={isVisible ? 'text' : 'password'}
        placeholder={placeholder}
        register={register}
        {...props}
      />
      <Image
        src={isVisible ? '/assets/icons/visibility-on.svg' : '/assets/icons/visibility-off.svg'}
        alt="password visibility"
        width={24}
        height={24}
        className="absolute right-18 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={toggleVisibility}
      />
    </div>
  );
};

export default PasswordInput;
