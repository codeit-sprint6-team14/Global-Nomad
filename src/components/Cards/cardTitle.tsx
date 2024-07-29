const CardTitle = ({ title }: { title: string }) => {
  return (
    <div className="truncate text-md-bold md:text-2lg-bold lg:pt-8 lg:text-xl-bold">
      {title}
    </div>
  );
};

export default CardTitle;
