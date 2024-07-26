import MyInformation from '@/../public/images/icon-my-information.svg'
import BookingHistory from '@/../public/images/icon-booking-history.svg'
import BookingStatus from '@/../public/images/icon-booking-status.svg'
import Setting from '@/../public/images/icon-setting.svg'

interface MenuOptionListProps {
  id: number
  imgSrc: JSX.Element
  text: string
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
]

export default menuOptionList
