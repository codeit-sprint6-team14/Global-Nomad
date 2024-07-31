interface PriceProps {
  price: number;
  className?: string;
}

const Price: React.FC<PriceProps> = ({ price, className = '' }) => {
  return (
    <p className={`text-xl-bold ${className}`}>
      ₩ {price.toLocaleString('ko-KR')}
      <span className="mx-5 text-lg-regular text-gray-500 md:text-xl-regular">/ 인</span>
    </p>
  );
};

export default Price;
