import AddNumberButton from '@/../public/svgs/icon-add.svg';
import SubtractNumberButton from '@/../public/svgs/icon-subtract.svg';
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="flex h-40 w-120 items-center justify-around rounded-6 border border-gray-300">
      <button onClick={decrement} aria-label="감소 버튼">
        <SubtractNumberButton />
      </button>
      <span className="text-md-regular text-gray-800">{count}</span>
      <button onClick={increment} aria-label="증가 버튼">
        <AddNumberButton />
      </button>
    </div>
  );
};

export default Counter;
