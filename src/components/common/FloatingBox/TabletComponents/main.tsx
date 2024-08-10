import Button from '@/components/common/Button';
import Counter from '@/components/common/Counter';
import Modal from '@/components/common/Modal';
import { useState } from 'react';

const Main = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleDateSelectModal = () => {
    // TODO: 모달 여닫는 기능 구현
    setIsOpenModal((prev) => !prev);
  };

  return (
    <div>
      <main className="border-b border-gray-300 px-24 pb-24 pt-13">
        <h2 className="mb-5 text-xl-bold">날짜</h2>
        <button onClick={handleDateSelectModal} className="mb-27">
          날짜 선택하기
        </button>
        {isOpenModal && <Modal.DateSelect setIsOpenModal={setIsOpenModal} />}
        <h2 className="mb-5 text-xl-bold">참여 인원 수</h2>
        <div className="mb-32">
          <Counter />
        </div>
        <Button.Default className="h-56 w-203">예약하기</Button.Default>
      </main>
    </div>
  );
};

export default Main;
