import Icon from '@/components/common/Icons';
import { Dispatch, SetStateAction } from 'react';

const Header = ({ setIsModalOpen }: { setIsModalOpen?: Dispatch<SetStateAction<boolean>> }) => {
  const handleCloseModal = () => {
    setIsModalOpen?.(false);
  };

  return (
    <div>
      <header className="mb-24 flex items-center justify-between">
        <h2 className="text-2xl-bold">날짜</h2>
        <button onClick={handleCloseModal} type="button">
          <Icon.Close width={40} height={40} />
        </button>
      </header>
    </div>
  );
};

export default Header;
