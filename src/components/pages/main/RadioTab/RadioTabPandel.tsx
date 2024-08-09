import { ReactNode, useContext } from 'react';

import RadioTabContext from './RadioTabContext';

type RadioTabPandelProps = {
  id: string;
  children: ReactNode;
};

const RadioTabPandel: React.FC<RadioTabPandelProps> = ({ id, children }) => {
  const context = useContext(RadioTabContext);
  if (!context) {
    throw new Error('RadioTabPandel must be used within a RadioTabRoot');
  }
  const { activeTab } = context;

  if (activeTab !== id) return null;

  return <>{children}</>;
};

export default RadioTabPandel;
