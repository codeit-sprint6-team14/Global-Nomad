import MyActivityCardList from '@/components/Cards/myActivityCardList';
import ReservationCardList from '@/components/Cards/reservationCardList';
import NavBar from '@/components/NavBar';
import SideNavMenu from '@/components/SideNavMenu';

export default function Home() {
  return (
    <div>
      <NavBar />
      <MyActivityCardList />
      <SideNavMenu />
      <ReservationCardList />
    </div>
  );
}
