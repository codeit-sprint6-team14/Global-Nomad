import { Children, ReactNode, isValidElement } from 'react';

import { CardBodyType } from './cardBody';
import { CardFooterType } from './cardFooter';
import { CardHeaderType } from './cardHeader';
import { CardImageType } from './cardImage';
import { CardTitleType } from './cardTitle';

type ChildrenType =
  | typeof CardImageType
  | typeof CardHeaderType
  | typeof CardTitleType
  | typeof CardBodyType
  | typeof CardFooterType;

const getTypedChildren = (type: ChildrenType, children: ReactNode) => {
  // children을 노드의 배열로 전환
  // [<Card.Image />, <Card.Title />, ...]
  const childArray = Children.toArray(children);
  const typedChildren = childArray.filter((child) => {
    return isValidElement(child) && child.type === type;
  });
  return typedChildren;
};

const CardItem = ({
  contentsClassNames,
  children,
}: {
  contentsClassNames?: string;
  children: ReactNode;
}) => {
  const cardImage = getTypedChildren(CardImageType, children);
  const cardHeader = getTypedChildren(CardHeaderType, children);
  const cardTitle = getTypedChildren(CardTitleType, children);
  const cardBody = getTypedChildren(CardBodyType, children);
  const cardFooter = getTypedChildren(CardFooterType, children);

  return (
    <li className="flex w-344 rounded-24 bg-gray-100 md:w-429 lg:w-792">
      {cardImage}
      <div
        className={
          contentsClassNames ??
          'flex w-full flex-col justify-between overflow-hidden py-9 pl-8 pr-14 md:py-12 md:pl-12 md:pr-16 lg:px-24 lg:py-21'
        }
      >
        {cardHeader}
        {cardTitle}
        {cardBody}
        {cardFooter}
      </div>
    </li>
  );
};

export default CardItem;
