const CardTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-200 truncate text-md-bold md:w-249 md:text-2lg-bold lg:w-548 lg:pt-8 lg:text-xl-bold">
      {title}
    </div>
  );
};

export const CardTitleType = (<CardTitle title="" />).type;

export default CardTitle;
