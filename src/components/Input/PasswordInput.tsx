import Image from 'next/image';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import DefaultInput from './DefaultInput';

type PasswordProps = {
  id?: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: boolean;
};

const PasswordInput = ({ id, placeholder, register, error }: PasswordProps) => {
  const [isPwVisible, setIsPwVisible] = useState(true);

  const togglePWEye = () => {
    setIsPwVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <DefaultInput
        id={id}
        isAuth
        type={isPwVisible ? 'password' : 'text'}
        placeholder={placeholder}
        {...register}
        error={error}
      />
      <Image
        src={
          isPwVisible
            ? '/images/icon-visibility-on.svg'
            : '/images/icon-visibility-off.svg'
        }
        alt="password visibility"
        width={24}
        height={24}
        className="absolute right-18 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={togglePWEye}
      />
    </div>
  );
};

export default PasswordInput;
