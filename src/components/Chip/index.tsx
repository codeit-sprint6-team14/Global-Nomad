/* eslint-disable react/require-default-props */
/* eslint-disable default-case */
/* eslint-disable react/function-component-definition */
interface ChipProps {
  size?: 'sm' | 'md' | 'lg'
  type?: 'seat' | 'reserved' | 'completed' | 'confirmed'
  className?: string
  children: React.ReactNode
}

const Chip = ({
  size = 'sm',
  type = 'seat',
  className = '',
  children,
}: ChipProps) => {
  const baseStyle = 'pl-4 inline-block rounded-4'

  let variantStyle = ''
  switch (size) {
    case 'sm':
      variantStyle = 'text-xs-medium pt-1 w-45 h-20'
      break
    case 'md':
      variantStyle = 'text-md-medium w-58 h-23'
      break
    case 'lg':
      variantStyle = 'text-md-medium w-110 h-23'
  }

  let typeStyle = ''
  switch (type) {
    case 'seat':
      typeStyle = 'bg-white text-blue-300'
      break
    case 'reserved':
      typeStyle = 'bg-blue-300 text-white'
      break
    case 'completed':
      typeStyle = 'bg-gray-300 text-gray-800'
      break
    case 'confirmed':
      typeStyle = 'bg-orange-100 text-orange-200'
      break
  }

  return (
    <div className={`${baseStyle} ${variantStyle} ${typeStyle} ${className}`}>
      {children}
    </div>
  )
}

export default Chip
