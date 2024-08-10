export type TabType = '신청' | '승인' | '거절';

export type TabItem = {
  type: TabType;
  count: number;
};

type TabButtonsProps = {
  tabData: TabItem[];
  selectedTab: TabType;
  onTabClick: (tab: TabType) => void;
};

const TabButton = ({
  type,
  count,
  isSelected,
  onClick,
}: {
  type: TabType;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`relative ${
      isSelected ? 'border-b-4 border-green-300 text-xl-semibold text-green-300' : 'text-xl-regular text-gray-800'
    }`}
  >
    {type} {count}
  </button>
);

const defaultTabs: TabType[] = ['신청', '승인', '거절'];

const TabButtons = ({ tabData, selectedTab, onTabClick }: TabButtonsProps) => {
  const tabMap = new Map(tabData.map((tab) => [tab.type, tab]));

  return (
    <div className="flex gap-12">
      {defaultTabs.map((type) => {
        const tab = tabMap.get(type) || { type, count: 0 };
        return <TabButton key={type} {...tab} isSelected={selectedTab === type} onClick={() => onTabClick(type)} />;
      })}
    </div>
  );
};

export default TabButtons;
