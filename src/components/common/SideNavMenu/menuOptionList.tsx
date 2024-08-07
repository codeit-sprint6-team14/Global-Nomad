import BookingHistory from '@/../public/assets/icons/booking-history.svg';
import BookingStatus from '@/../public/assets/icons/booking-status.svg';
import MyInformation from '@/../public/assets/icons/my-information.svg';
import Setting from '@/../public/assets/icons/setting.svg';

interface MenuOptionListProps {
  id: number;
  imgSrc: JSX.Element;
  text: string;
  path: string;
}

const menuOptionList: MenuOptionListProps[] = [
  {
    id: 1,
    imgSrc: <MyInformation />,
    text: '내 정보',
    path: '/my-page/profile',
  },
  {
    id: 2,
    imgSrc: <BookingHistory />,
    text: '예약 내역',
    path: '/my-page/reservation-list',
  },
  {
    id: 3,
    imgSrc: <Setting />,
    text: '내 체험 관리',
    path: '/my-page/activity-settings',
  },
  {
    id: 4,
    imgSrc: <BookingStatus />,
    text: '예약 현황',
    path: '/my-page/schedule',
  },
];

export default menuOptionList;
