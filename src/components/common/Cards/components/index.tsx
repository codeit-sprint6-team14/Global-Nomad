import CardBody from './cardBody';
import CardButton from './cardButton';
import CardFooter from './cardFooter';
import CardHeader from './cardHeader';
import CardImage from './cardImage';
import CardItem from './cardItem';
import CardTitle from './cardTitle';

const Card = Object.assign(CardItem, {
  Image: CardImage,
  Header: CardHeader,
  Title: CardTitle,
  Body: CardBody,
  Footer: CardFooter,
  Button: CardButton,
});

export default Card;
