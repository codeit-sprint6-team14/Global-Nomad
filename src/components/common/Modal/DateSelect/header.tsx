import Icon from '@/components/common/Icons';

const Header = () => (
  <div>
    <header className="mb-24 flex items-center justify-between">
      <h2 className="text-2xl-bold">날짜</h2>
      <button type="button">
        <Icon.Close width={40} height={40} />
      </button>
    </header>
  </div>
);

export default Header;
