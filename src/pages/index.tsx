// import Footer from '@/components/Footer';
import Cards from '@/components/Cards/index';
import NavBar from '@/components/NavBar';
import SideNavMenu from '@/components/SideNavMenu/index';

export default function Home() {
  return (
    <div>
      <NavBar />
      <SideNavMenu />
      <Cards />
      {/* <Footer /> */}
    </div>
  );
}
