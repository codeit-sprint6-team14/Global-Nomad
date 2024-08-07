const TotalPrice = ({ price }: { price: number }) => (
  <div className="flex items-center justify-between">
    <h2 className="text-xl-bold">총 합계</h2>
    <div>
      <span className="text-xl-bold text-black-100">₩ {price.toLocaleString()}</span>
    </div>
  </div>
);

export default TotalPrice;
