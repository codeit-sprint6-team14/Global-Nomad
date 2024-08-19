import LeftArrow from '@/../public/assets/icons/left-arrow.svg';
import Paper from '@/../public/assets/icons/paper.svg';
import { getMyActivities, getReservationDashboard } from '@/apis/myPage/schedule';
import { ReservationDashboardResponse } from '@/apis/myPage/schedule.types';
import Input from '@/components/common/Input/index';
import { Option } from '@/types/dropDownInputTypes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Calendar from './calender';

const MySchedule = () => {
  const router = useRouter();
  const [activities, setActivities] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [reservations, setReservations] = useState<ReservationDashboardResponse | null>(null);

  const handleGoMyPage = () => {
    router.push('/my-page');
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getMyActivities();
        const activitiesData = data.activities.map((activity) => ({
          label: activity.title,
          value: String(activity.id), // id를 문자열로 변환
        }));
        setActivities(activitiesData);
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    if (selectedOption) {
      const fetchReservations = async () => {
        try {
          const year = new Date().getFullYear();
          const month = new Date().getMonth() + 1;
          const data = await getReservationDashboard(parseInt(selectedOption?.value ?? '0', 10), year, month);
          setReservations(data);
        } catch (error) {
          console.error('Failed to fetch reservations:', error);
        }
      };

      fetchReservations();
    }
  }, [selectedOption]);

  const handleOptionSelect = (option: Option) => {
    console.log(`선택한 옵션: ${option.label}`);
    setSelectedOption(option);
  };

  // 옵션이 비어있는지 체크
  const hasExperiences = activities.length > 0;

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
            <Input.Dropdown
              options={activities}
              defaultOption={selectedOption ? selectedOption.label : '내 체험을 선택하세요'}
              onSelect={handleOptionSelect}
              className="h-56"
            />
          </div>
        ) : (
          <div className="mb-50 mt-100 flex justify-center">
            <Paper />
          </div>
        )}
        {hasExperiences ? (
          <Calendar activityId={parseInt(selectedOption?.value ?? '0', 10)} reservations={reservations} />
        ) : (
          <div className="mb-200 text-center text-2xl-medium text-gray-700">아직 등록한 체험이 없어요</div>
        )}
      </div>
    </div>
  );
};

export default MySchedule;
