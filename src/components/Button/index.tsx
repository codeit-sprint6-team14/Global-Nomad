/* eslint-disable react/function-component-definition */

interface ButtonProps {
  disabled?: boolean
  type: 'button' | 'submit' | 'reset' | undefined
  className?: string
  backgroundColor: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xlg'
  children: string
}

const Button = ({
  disabled = false,
  type = 'button',
  className,
  backgroundColor = 'black',
  size,
  children,
}: ButtonProps) => {
  const baseStyle = 'text-lg-bold w-350 h-48 rounded-6'
  const disabledStyle = 'bg-gray-600 cursor-not-allowed text-white'
  const backgroundStyle =
    backgroundColor === 'black'
      ? 'bg-black-100 text-white'
      : 'bg-white text-black-100 border border-black-100'

  let variantStyle = ''
  switch (size) {
    case 'xs':
      variantStyle = 'font-bold leading-6 text-sm w-95 h-35'
      break
    case 'sm':
      variantStyle = 'text-md-bold w-108 h-38'
      break
    case 'md':
      variantStyle = 'text-lg-bold w-144 h-48'
      break
    case 'lg':
      variantStyle = 'text-lg-bold w-350 h-48'
      break
    case 'xlg':
      variantStyle = 'text-lg-bold w-640 h-48'
      break
  }

  return (
    <div>
      <button
        disabled={disabled}
        type={type}
        className={`${baseStyle} ${disabled ? disabledStyle : backgroundStyle} ${variantStyle} ${className}`}
      >
        {children}
      </button>
    </div>
  )
}

export default Button
