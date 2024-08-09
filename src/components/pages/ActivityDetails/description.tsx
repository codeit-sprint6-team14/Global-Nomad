const Description = ({ description }: { description: string }) => {
  return (
    <div className="flex flex-col border-b border-solid border-gray-300 py-16 md:border-t md:py-40">
      <h1 className="text-xl-bold text-black-100">체험 설명</h1>
      <p className="mt-16 text-lg-regular text-black-100">{description}</p>
    </div>
  );
};

export default Description;
