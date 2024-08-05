import { myActivityCardData } from '@/types/cardDataList';
import { formatPrice } from '@/utils/formatPrice';

import Card from './components';

const MyActivityCard = ({ myActivityCard }: { myActivityCard: myActivityCardData }) => {
  const { title, price, bannerImageUrl, rating, reviewCount } = myActivityCard;

  return (
    <>
      <Card contentsClassNames="flex w-full flex-col p-8 pr-14 md:p-12 lg:px-24 lg:py-14 ">
        <Card.Image imageUrl={bannerImageUrl} />
        <Card.Header text={`${rating} (${reviewCount})`} imgSrc="/assets/icons/star.svg" />
        <Card.Title title={title} />
        <Card.Footer text={formatPrice(price)} imgSrc="/assets/icons/kebab.svg" additionalClassNames="mt-auto" />
      </Card>
    </>
  );
};

export default MyActivityCard;
