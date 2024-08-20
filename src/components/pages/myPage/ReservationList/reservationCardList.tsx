import { MyReservation } from '@/apis/myPage/myReservations.types';
import ReservationCard from '@/components/common/Cards/reservationCard';

const ReservationCardList = ({ myReservationsData }: { myReservationsData: MyReservation[] }) => {
  return (
    <ul className="flex flex-col gap-8">
      {myReservationsData.map((myReservationData) => (
        <ReservationCard key={myReservationData.id} myReservationData={myReservationData} />
      ))}
    </ul>
  );
};

export default ReservationCardList;
