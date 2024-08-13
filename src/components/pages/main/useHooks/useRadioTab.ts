import { useContext } from 'react';

import { RadioTabContext } from '../RadioTab/RadioTabContext';

export const useRadioTab = () => {
  const context = useContext(RadioTabContext);
  if (!context) throw new Error('useRadioTab must be used within a RadioTabRoot');
  return context;
};
