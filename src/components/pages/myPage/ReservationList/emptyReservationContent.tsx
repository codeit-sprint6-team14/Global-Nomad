import PaperImage from '@/../public/assets/icons/paper.svg';

const EmptyReservationContent = () => (
  <div className="flex flex-col items-center">
    <PaperImage className="mb-37" />
    <p className="text-2xl-medium text-gray-700">아직 등록한 체험이 없어요</p>
  </div>
);

export default EmptyReservationContent;
