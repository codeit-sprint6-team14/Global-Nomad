/* eslint-disable @typescript-eslint/no-unused-vars */
import useViewportSize from '@/hooks/useViewportSize';
import { Dispatch, SetStateAction } from 'react';

import Counter from '../../Counter';
import ReservationScheduleSelect from '../../ReservationScheduleSelect';
import Footer from './footer';
import Header from './header';

const DateSelectModal = ({
  setIsModalOpen,
  classNames,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  classNames: string;
}) => {
  const viewportSize = useViewportSize();

  const isMobile = viewportSize === 'mobile';

  return (
    <div className={`${classNames} w-480 rounded-24 bg-white px-24 py-32`}>
      <Header setIsModalOpen={setIsModalOpen} />
      <main className="mb-64">
        <ReservationScheduleSelect />
        {isMobile && (
          <>
            <h1 className="mb-14 text-2lg-bold text-black-100">참여 인원수 </h1>
            <Counter />
          </>
        )}
      </main>
      <Footer setIsModalOpen={setIsModalOpen} /> {/*prop -> isReservationPossible={isReservationPossible}*/}
    </div>
  );
};

export default DateSelectModal;
