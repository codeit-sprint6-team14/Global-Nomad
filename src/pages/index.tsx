import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import CardResource from '@/components/CardResource';
//import SideNavMenu from '@/components/SideNavMenu';

const CardResourceData = [
  {
    rating: 4.5,
    reviewCount: 262,
    title: '함께 배우면 즐거운 스트릿 댄스',
    price: 120000,
  },
  {
    rating: 4.8,
    reviewCount: 320,
    title: '재미있는 요가 클래스',
    price: 90000,
  },
  {
    rating: 4.9,
    reviewCount: 150,
    title: '창의력을 키우는 아트 클래스',
    price: 130000,
  },
];

export default function Home() {
  return (
    <div>
      <NavBar />
      {CardResourceData.map((data, index) => (
        <CardResource.popularExperienceCard
          key={index}
          rating={data.rating}
          reviewCount={data.reviewCount}
          title={data.title}
          price={data.price}
        />
      ))}
      {CardResourceData.map((data, index) => (
        <CardResource.standardExperienceCard
          key={index}
          rating={data.rating}
          reviewCount={data.reviewCount}
          title={data.title}
          price={data.price}
        />
      ))}
      <Footer />
    </div>
  );
}
