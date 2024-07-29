const CardTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full truncate text-md-bold md:text-2lg-bold lg:pt-8 lg:text-xl-bold">
      {title}
    </div>
  );
};

export const CardTitleType = (<CardTitle title="" />).type;

export default CardTitle;
