interface PriceInfoProps {
  price: number;
  capacity: number;
}

const PriceInfo = ({ price, capacity }: PriceInfoProps) => {
  return (
    <div className="flex items-center">
      <span className="mr-6 text-xl-bold text-black-100">₩ {price.toLocaleString()}</span>
      <span className="text-2lg-medium text-green-300"> / 총 {capacity}인</span>
    </div>
  );
};

export default PriceInfo;
