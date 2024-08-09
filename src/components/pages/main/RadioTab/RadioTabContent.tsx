import { ReactNode } from 'react';

type RadioTabContentProps = {
  children: ReactNode;
};

const RadioTabContent: React.FC<RadioTabContentProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default RadioTabContent;
