import { Activity } from './mainPage.type';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className="activity-card">
      <img src={activity.bannerImageUrl} alt={activity.title} />
      <h3>{activity.title}</h3>
      <p>{activity.description}</p>
      <p>카테고리: {activity.category}</p>
      <p>가격: {activity.price}원</p>
      <p>주소: {activity.address}</p>
      <p>
        평점: {activity.rating} (리뷰 {activity.reviewCount}개)
      </p>
    </div>
  );
};

export default ActivityCard;
