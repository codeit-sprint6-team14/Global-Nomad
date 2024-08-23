import { ReactNode, useContext } from 'react';

import { RadioTabContext } from './RadioTabContext';

type RadioTabItemProps = {
  id: string;
  children: ReactNode;
};

export const RadioTabItem: React.FC<RadioTabItemProps> = ({ id, children }) => {
  const context = useContext(RadioTabContext);
  if (!context) throw new Error('RadioTabItem must be used within a RadioTabRoot');

  const { activeTab, setActiveTab } = context;

  return (
    <label
      onClick={() => setActiveTab(id)}
      className={`flex cursor-pointer items-center justify-center rounded-15 border border-black-100 text-black-100 transition-colors duration-200 ease-in-out hover:bg-black-100 hover:text-white sm:h-41 sm:w-80 md:h-58 md:w-120 lg:h-58 lg:w-127 ${
        activeTab === id ? 'bg-black-100 text-white' : 'bg-white hover:text-black-100'
      } `}
    >
      <input type="radio" name="radio-tab" value={id} checked={activeTab === id} className="sr-only" />
      <span className="text-2lg-medium">{children}</span>
    </label>
  );
};
