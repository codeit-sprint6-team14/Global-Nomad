import { getActivities } from '@/apis/activities';
import React, { useEffect, useState } from 'react';

import ActivityCard from './ActivityCard';
import { Activity } from './mainPage.type';

const MainPage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await getActivities(page);
        setActivities((prevActivities) => [...prevActivities, ...response.activities]);
      } catch (error) {
        console.error('활동 목록을 불러오는 데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="main-page">
      <h1>활동 목록</h1>
      <div className="activities-grid">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
      {!loading && <button onClick={loadMore}>더 보기</button>}
      {loading && <p>로딩 중...</p>}
    </div>
  );
};

export default MainPage;
