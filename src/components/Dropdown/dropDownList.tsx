import { ReactNode } from 'react';

const DropDownList = ({ children, classNames }: { children: ReactNode; classNames: string }) => {
  return (
    <ul
      className={`${classNames} absolute right-[-12px] top-40 z-50 rounded-6 border border-solid border-gray-300 bg-white`}
    >
      {children}
    </ul>
  );
};

export default DropDownList;
