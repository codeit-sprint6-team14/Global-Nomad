import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import CardResource from '@/components/CardResource';
//import SideNavMenu from '@/components/SideNavMenu';

const CardResourceData = [
  {
    image: '/images/flower.jpeg',
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
          image={data.image}
          rating={data.rating}
          reviewCount={data.reviewCount}
          title={data.title}
          price={data.price}
        />
      ))}
      {CardResourceData.map((data, index) => (
        <CardResource.standardExperienceCard
          key={index}
          image={data.image}
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
