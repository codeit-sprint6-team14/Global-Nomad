import { ReactNode } from 'react';

const DropDownList = ({ children, classNames }: { children: ReactNode; classNames: string }) => {
  return (
    <ul className={`${classNames} absolute rounded-6 border border-solid border-gray-300 bg-white`}>{children}</ul>
  );
};

export default DropDownList;
