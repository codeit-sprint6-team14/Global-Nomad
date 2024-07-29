const ReservationCard = ({
  nickname,
  memberCount,
}: {
  nickname: string;
  memberCount: number;
}) => {
  return (
    <div className="flex flex-col gap-6 rounded-4 border">
      <div className="flex flex-col gap-6 pl-16 pt-8">
        <p className="text-lg-semibold text-gray-700">
          닉네임 <span className="text-lg-medium text-black">{nickname}</span>
        </p>
        <p className="text-lg-semibold text-gray-700">
          인원{' '}
          <span className="text-lg-medium text-black">{memberCount}명</span>
        </p>
      </div>
      <div className="flex justify-end pb-8 pr-16">
        <p className="h-44 w-82 rounded-26 bg-orange-100 py-10 text-center text-md-bold text-orange-200">
          예약 확정
        </p>
      </div>
    </div>
  );
};

export default ReservationCard;
