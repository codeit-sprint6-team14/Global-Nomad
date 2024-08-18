import Card from '@/components/common/Cards/components';
import { myActivityCardData } from '@/types/cardDataList';
import { formatPrice } from '@/utils/formatPrice';

import { useDeleteActivityMutation } from './hooks/useDeleteActivityMutation';

const MyActivityCard = ({ myActivityCard }: { myActivityCard: myActivityCardData }) => {
  const { id, title, price, bannerImageUrl, rating, reviewCount } = myActivityCard;

  const { mutate: deleteActivityData, error: deleteActivityError } = useDeleteActivityMutation();

  const handleDelete = () => {
    deleteActivityData(id);
  };

  const handleModify = () => {};

  return (
    <>
      {deleteActivityError && <div className="mb-4 text-red-500">{deleteActivityError.message}</div>}
      <Card contentsClassNames="flex w-full flex-col p-8 pr-14 md:p-12 lg:px-24 lg:py-14">
        <Card.Image imageUrl={bannerImageUrl} />
        <Card.Header text={`${rating} (${reviewCount})`} imgSrc="/assets/icons/star.svg" />
        <Card.Title title={title} />
        <Card.Footer
          activityId={id}
          onDelete={handleDelete}
          onModify={handleModify}
          text={formatPrice(price)}
          imgSrc="/assets/icons/kebab.svg"
          additionalClassNames="mt-auto"
        />
      </Card>
    </>
  );
};

export default MyActivityCard;
