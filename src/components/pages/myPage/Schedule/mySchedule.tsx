import LeftArrow from '@/../public/assets/icons/left-arrow.svg';
import Paper from '@/../public/assets/icons/paper.svg';
import Input from '@/components/common/Input/index';
import { Option } from '@/types/dropDownInputTypes';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Calendar from './calender';

const mockOptions: Option[] = [
  { label: '옵션 1', value: 'value1' },
  { label: '옵션 2', value: 'value2' },
  { label: '옵션 3', value: 'value3' },
];

const MySchedule = () => {
  const router = useRouter();
  const handleGoMyPage = () => {
    router.push('/my-page');
  };

  const [selectedOption, setSelectedOption] = useState<string>('옵션을 선택하세요');

  const handleOptionSelect = (option: Option) => {
    console.log(`선택한 옵션: ${option.label}`);
    setSelectedOption(option.label);
  };

  // 옵션이 비어있는지 체크
  const hasExperiences = mockOptions.length > 0;

  return (
    <div>
      <div className="mb-60 ml-auto mr-auto mt-30 w-343 md:mr-0 md:w-430 lg:w-800">
        <div className="flex items-center">
          <div className="block cursor-pointer md:hidden" onClick={handleGoMyPage}>
            <LeftArrow />
          </div>
          <h2 className="ml-10 mt-5 text-3xl-bold md:ml-0">예약 현황</h2>
        </div>
        {hasExperiences ? (
          <div className="relative mb-20 mt-20">
            <div className="absolute z-10 ml-10 h-24 w-45 -translate-y-2.5 transform bg-white text-center text-md-regular">
              체험명
            </div>
            <Input.Dropdown options={mockOptions} defaultOption={selectedOption} onSelect={handleOptionSelect} />
          </div>
        ) : (
          <div className="mb-50 mt-100 flex justify-center">
            <Paper />
          </div>
        )}
        {hasExperiences ? (
          <Calendar />
        ) : (
          <div className="mb-200 text-center text-2xl-medium text-gray-700">아직 등록한 체험이 없어요</div>
        )}
      </div>
    </div>
  );
};

export default MySchedule;
