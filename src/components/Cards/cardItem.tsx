import { ReactNode } from 'react';

const CardItem = ({ children }: { children: ReactNode }) => {
  return (
    <li className="flex w-344 rounded-24 bg-gray-100 md:w-429 lg:w-792">
      {children}
      {/* image */}
      {/* <div className="flex flex-col justify-center overflow-hidden py-12 pl-8 pr-14 md:pl-12 md:pr-16 lg:px-24"> */}
      {/* header */}
      {/* title */}
      {/* body */}
      {/* footer */}
      {/* </div> */}
    </li>
  );
};

export default CardItem;
