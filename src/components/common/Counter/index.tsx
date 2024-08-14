import Icon from '@/components/common/Icons';
import { headCountAtom } from '@/store/activityDetailsAtom';
import { useAtomValue, useSetAtom } from 'jotai';

const Counter = () => {
  const headCount = useAtomValue(headCountAtom);
  const setHeadCount = useSetAtom(headCountAtom);

  const increment = () => {
    setHeadCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (headCount > 0) {
      setHeadCount((prev) => prev - 1);
    }
  };

  return (
    <div className="flex h-40 w-120 items-center justify-around rounded-6 border border-gray-300">
      <button onClick={decrement} aria-label="감소 버튼">
        <Icon.Subtract />
      </button>
      <span className="text-md-regular text-gray-800">{headCount}</span>
      <button onClick={increment} aria-label="증가 버튼">
        <Icon.Plus />
      </button>
    </div>
  );
};

export default Counter;
