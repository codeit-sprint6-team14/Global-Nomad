import BookingHistory from '@/../public/assets/icons/booking-history.svg';
import BookingStatus from '@/../public/assets/icons/booking-status.svg';
import MyInformation from '@/../public/assets/icons/my-information.svg';
import Setting from '@/../public/assets/icons/setting.svg';

interface MenuOptionListProps {
  id: number;
  imgSrc: JSX.Element;
  text: string;
}

const menuOptionList: MenuOptionListProps[] = [
  {
    id: 1,
    imgSrc: <MyInformation />,
    text: '내 정보',
  },
  {
    id: 2,
    imgSrc: <BookingHistory />,
    text: '예약 내역',
  },
  {
    id: 3,
    imgSrc: <Setting />,
    text: '내 체험 관리',
  },
  {
    id: 4,
    imgSrc: <BookingStatus />,
    text: '예약 현황',
  },
];

export default menuOptionList;
