/* eslint-disable react/require-default-props */
/* eslint-disable default-case */
/* eslint-disable react/function-component-definition */
import Image from 'next/image'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import DefaultInput from './DefaultInput'

type PasswordProps = {
  id?: string
  placeholder: string
  register?: UseFormRegisterReturn
  error?: boolean
}

const PasswordInput = ({ id, placeholder, register, error }: PasswordProps) => {
  const [pwVisible, setPwVisible] = useState(true)

  const togglePWEye = () => {
    setPwVisible((prev) => !prev)
  }

  return (
    <div className="relative">
      <DefaultInput
        id={id}
        isAuth
        type={pwVisible ? 'password' : 'text'}
        placeholder={placeholder}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register}
        error={error}
      />
      <Image
        src={
          pwVisible
            ? '/images/icon-visibility-on.svg'
            : '/images/icon-visibility-off.svg'
        }
        alt="password visibility"
        width={24}
        height={24}
        className="cursor-pointer absolute right-18 top-1/2 -translate-y-1/2 "
        onClick={togglePWEye}
      />
    </div>
  )
}

export default PasswordInput
