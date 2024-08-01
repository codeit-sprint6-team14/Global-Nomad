const CardBody = ({ text }: { text: string }) => {
  return (
    <div className="text-xs-regular text-black-100 md:pt-5 md:text-md-regular lg:pt-12 lg:text-2lg-regular">{text}</div>
  );
};

export const CardBodyType = (<CardBody text="" />).type;
export default CardBody;
