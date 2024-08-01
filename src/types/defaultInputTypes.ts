import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  error?: boolean;
  className?: string;
  placeholder: string;
  isAuth?: boolean;
  register?: UseFormRegisterReturn;
};
