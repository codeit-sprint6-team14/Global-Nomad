import { reservationsAtom } from '@/components/pages/myPage/Schedule/reservationsAtom';
import { useAtomValue } from 'jotai';

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

const TabButtons = ({ selectedTab, onTabClick }: Omit<TabButtonsProps, 'tabData'>) => {
  const reservations = useAtomValue(reservationsAtom);

  const tabData: TabItem[] = [
    { type: '신청', count: reservations.신청.length },
    { type: '승인', count: reservations.승인.length },
    { type: '거절', count: reservations.거절.length },
  ];

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
