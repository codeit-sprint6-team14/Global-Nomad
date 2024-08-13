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
      className={`flex h-58 w-127 cursor-pointer items-center justify-center rounded-15 border border-black-100 ${activeTab === id ? 'bg-black-100' : 'bg-white'}`}
    >
      <input
        type="radio"
        name="radio-tab"
        value={id}
        checked={activeTab === id}
        onChange={() => setActiveTab(id)}
        className="sr-only"
      />
      <span className={`text-2lg-medium text-black-100 ${activeTab === id ? 'text-white' : ''}`}>{children}</span>
    </label>
  );
};
