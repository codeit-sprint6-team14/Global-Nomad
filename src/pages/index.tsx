import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Review from '@/components/Review';
import SideNavMenu from '@/components/SideNavMenu/index';


export default function Home() {
  return (
    <div>
      <NavBar />
      <SideNavMenu />
      <Footer />
      <div className="ml-100 mt-50 h-1000 bg-gray-200 p-20">
        <Review />
      </div>
    </div>
  );
}
