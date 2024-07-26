import { useState } from 'react';
import Pagination from '@/components/Pagination';

// 샘플 데이터 배열
const data = Array.from({ length: 50 }, (_, index) => `Item ${index + 1}`);

export default function PaginationTest() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6; // 한 페이지에 표시할 항목 수
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 현재 페이지의 데이터 추출
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div>
      <div className="my-8">
        {currentData.map((item, index) => (
          <div key={index} className="text-center">
            {item}
          </div>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
