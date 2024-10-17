import LeftArrow from '@/../public/assets/icons/left-arrow.svg';
import Paper from '@/../public/assets/icons/paper.svg';
import { getMyActivities, getReservationDashboard } from '@/apis/myPage/schedule';
import { ReservationDashboardResponse } from '@/apis/myPage/schedule.types';
import Input from '@/components/common/Input/index';
import { reservationsUpdatedAtom } from '@/store/reservationsAtom';
import { Option } from '@/types/dropDownInputTypes';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Calendar from './calender';

const MySchedule = () => {
  const router = useRouter();
  const [activities, setActivities] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [reservations, setReservations] = useState<ReservationDashboardResponse | null>(null);
  const reservationsUpdated = useAtom(reservationsUpdatedAtom)[0];
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  const handleGoMyPage = () => {
    router.push('/my-page');
  };

  const floatAnimation = {
    initial: { y: 0 },
    animate: { y: [0, -25, 0] },
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  };
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getMyActivities();
        const activitiesData = data.activities.map((activity) => ({
          label: activity.title,
          value: String(activity.id),
        }));

        const sortedActivities = activitiesData.sort((a, b) => parseInt(b.value, 10) - parseInt(a.value, 10));
        setActivities(sortedActivities);
        if (sortedActivities.length > 0) {
          setSelectedOption(sortedActivities[0]);
        }
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
          const data = await getReservationDashboard(parseInt(selectedOption.value, 10), currentYear, currentMonth);
          setReservations(data);
        } catch (error) {
          console.error('Failed to fetch reservations:', error);
        }
      };

      fetchReservations();
    }
  }, [selectedOption, reservationsUpdated, currentYear, currentMonth]);

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
  };

  const handleMonthChange = (year: number, month: number) => {
    setCurrentYear(year);
    setCurrentMonth(month);
  };

  const hasExperiences = activities.length > 0;

  return (
    <div className="mx-auto mb-60 w-343 md:mx-0 md:w-429 lg:w-792">
      <div className="flex items-center">
        <div className="block cursor-pointer md:hidden" onClick={handleGoMyPage}>
          <LeftArrow />
        </div>
        <h1 className="ml-10 mt-5 text-3xl-bold md:ml-0">예약 현황</h1>
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
            defaultOptionColor="text-black-DEFAULT"
          />
        </div>
      ) : (
        <motion.div {...floatAnimation} className="mb-50 mt-100 flex justify-center">
          <Paper />
        </motion.div>
      )}
      {hasExperiences ? (
        <Calendar
          activityId={parseInt(selectedOption?.value ?? '0', 10)}
          reservations={reservations}
          onMonthChange={handleMonthChange}
        />
      ) : (
        <h2 className="mb-420 md:mb-601 mb-200 text-center text-2xl-medium text-gray-700 lg:mb-[469px]">
          아직 등록한 체험이 없어요
        </h2>
      )}
    </div>
  );
};

export default MySchedule;
