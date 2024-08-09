import { ReactNode } from 'react';

type RadioTabTriggerProps = {
  children: ReactNode;
};

const RadioTabTrigger: React.FC<RadioTabTriggerProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default RadioTabTrigger;
