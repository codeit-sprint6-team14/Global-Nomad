interface ChipProps {
  size?: 'sm' | 'md' | 'lg';
  type?: 'seat' | 'pending' | 'completed' | 'confirmed';
  className?: string;
  count: number;
}

const Chip = ({ type = 'seat', className = '', count }: ChipProps) => {
  const baseStyle = 'pl-4 inline-block rounded-4';

  let typeStyle = '';
  let labelText = '';
  switch (type) {
    case 'seat':
      typeStyle = 'bg-white text-blue-300';
      labelText = '잔여';
      break;
    case 'pending':
      typeStyle = 'bg-blue-300 text-white';
      labelText = '예약';
      break;
    case 'completed':
      typeStyle = 'bg-gray-300 text-gray-800';
      labelText = '완료';
      break;
    case 'confirmed':
      typeStyle = 'bg-orange-100 text-orange-200';
      labelText = '승인';
      break;
  }

  return (
    <div
      className={`${baseStyle} ${typeStyle} ${className} h-20 w-45 pt-1 text-xs-medium md:h-23 md:w-58 md:text-md-medium lg:h-23 lg:w-110 lg:text-md-medium`}
    >
      {labelText} {count}
    </div>
  );
};

export default Chip;
