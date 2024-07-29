// import Footer from '@/components/Footer';
import MyActivityCardList from '@/components/Cards/myActivityCardList';
import Cards from '@/components/Cards/reservationCardList';
import NavBar from '@/components/NavBar';
import SideNavMenu from '@/components/SideNavMenu/index';

export default function Home() {
  return (
    <div>
      <SideNavMenu />
      <Cards />
      <NavBar />
      {/* <Footer /> */}
      <MyActivityCardList />
    </div>
  );
}
