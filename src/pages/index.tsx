import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import CardResource from '@/components/CardResource';

export default function Home() {
  return (
    <div>
      <NavBar />
      <CardResource.popularExperienceCard />
      <Footer />
    </div>
  );
}
