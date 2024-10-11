import { Reservation } from '@/apis/myPage/myReservations.types';

import CardList from './cardList';
import EmptyContent from './emptyContent';

interface ContentProps {
  list: Reservation[];
  isListEmpty: boolean;
}

const Content = ({ list, isListEmpty = false }: ContentProps) => {
  return (
    <>
      {isListEmpty ? (
        <div className="mb-420 md:mb-601 md:w-429 lg:mb-[469px] lg:w-792">
          <EmptyContent />
        </div>
      ) : (
        <CardList list={list} />
      )}
    </>
  );
};
export default Content;
