const Footer = () => {
  const price = 100000;
  return (
    <div>
      <footer className="flex items-center justify-between px-24 py-17">
        <h2 className="text-xl-bold">총 합계</h2>
        <div>
          <span className="text-xl-bold text-black-100">₩ {price.toLocaleString()}</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
