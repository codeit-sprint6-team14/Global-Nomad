import Button from '../Button';
import MobileComponents from './MobileComponents';

const Mobile = () => {
  const handleReservation = () => {
    // TODO: 예약하기 기능 구현
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-83 w-full max-w-[743px] border-t border-gray-300 bg-white">
      <div className="flex items-center justify-between px-16 py-16">
        <div className="flex flex-col">
          <MobileComponents.PriceInfo price={10000} capacity={10} />
          <MobileComponents.DateInfo date="22/11/14" startTime="14:00" endTime="15:00" />
        </div>
        <Button.Default onClick={handleReservation} className="h-54 w-106">
          예약하기
        </Button.Default>
      </div>
    </div>
  );
};

export default Mobile;
