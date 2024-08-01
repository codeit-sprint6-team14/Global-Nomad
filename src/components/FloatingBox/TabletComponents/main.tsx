import Button from '@/components/Button';
import Counter from '@/components/Counter';

const Main = () => {
  const handleDateSelectModal = () => {
    // TODO: 모달 여닫는 기능 구현
  };

  return (
    <div>
      <main className="border-b border-gray-300 px-24 pb-24 pt-13">
        <h2 className="mb-5 text-xl-bold">날짜</h2>
        <button onClick={handleDateSelectModal} className="mb-27">
          날짜 선택하기
        </button>
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
