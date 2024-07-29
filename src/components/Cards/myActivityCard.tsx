import Card from '@/components/Cards';
import { ActivityCardsDataType } from '@/types/CardListData';

const MyActivityCard = ({
  myActivityCard,
}: {
  myActivityCard: ActivityCardsDataType;
}) => {
  const { title, price, bannerImageUrl, rating, reviewCount } = myActivityCard;

  return (
    <Card contentsClassNames="flex w-full flex-col overflow-hidden py-12 pl-8 pr-14 md:pl-12 md:pr-16 lg:px-24 lg:py-14">
      <Card.Image imageUrl={bannerImageUrl} />
      <Card.Header
        text={`${rating} (${reviewCount})`}
        imgSrc="/images/icon-star.svg"
      />
      <Card.Title title={title} />
      <Card.Footer
        text={`₩${price}`}
        imgSrc="/images/icon-kebab.svg"
        additionalClassNames="mt-auto"
      />
    </Card>
  );
};

export default MyActivityCard;
