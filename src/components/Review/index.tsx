import Button from '../Button';
import Header from './header';
import StarRating from './starRating';

const Review = () => {
  return (
    <div className="w-full bg-white sm:px-16 md:rounded-24 md:px-24">
      <Header />
      <div className="flex w-full justify-center sm:my-34 md:my-46">
        <StarRating />
      </div>
      <textarea
        className="mb-24 w-full resize-none rounded-4 border border-gray-700 p-16 focus:border-black-100 focus:outline-none sm:h-346"
        placeholder="후기를 작성해주세요"
      ></textarea>

      <Button className="w-full sm:mb-33">작성하기</Button>
    </div>
  );
};

export default Review;
