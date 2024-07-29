// import Footer from '@/components/Footer';
import MyActivityCardList from '@/components/Cards/myActivityCardList';
import ReservationCardList from '@/components/Cards/reservationCardList';
import NavBar from '@/components/NavBar';
import SideNavMenu from '@/components/SideNavMenu/index';

export default function Home() {
  return (
    <div>
      <SideNavMenu />
      <MyActivityCardList />
      <NavBar />
      <ReservationCardList />
      {/* <Footer /> */}
      <MyActivityCardList />
    </div>
  );
}
