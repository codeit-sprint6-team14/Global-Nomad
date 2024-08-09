import { ReactNode, useContext } from 'react';

import RadioTabContext from './RadioTabContext';

type RadioTabItemProps = {
  id: string;
  children: ReactNode;
};

const RadioTabItem: React.FC<RadioTabItemProps> = ({ id, children }) => {
  const context = useContext(RadioTabContext);
  if (!context) {
    throw new Error('RadioTabItem must be used within a RadioTabRoot');
  }
  const { activeTab, setActiveTab } = context;

  return (
    <label>
      <input
        type="radio"
        name="radio-tab"
        value={id}
        checked={activeTab === id}
        onChange={() => setActiveTab(id)}
        className="sr-only"
      />
      <span
        className={`block cursor-pointer rounded-t-lg px-4 py-2 text-center ${
          activeTab === id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {children}
      </span>
    </label>
  );
};

export default RadioTabItem;
