import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pagesPerGroup = 5; // 한 그룹당 페이지 수

  // 현재 페이지가 속한 그룹을 계산
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  // 그룹의 첫 번째 페이지와 마지막 페이지를 계산
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPages);

  const handlePreviousGroup = () => {
    if (currentGroup > 1) {
      onPageChange(startPage - 1);
    }
  };

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      onPageChange(endPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-10">
      <button
        onClick={handlePreviousGroup}
        disabled={currentGroup === 1}
        className={`box-border h-55 w-55 rounded-15 border bg-white hover:bg-gray-200 sm:h-40 sm:w-40 ${currentGroup === 1 ? 'border-gray-400 text-gray-400' : 'border-green-950 text-black'} `}
      >
        ◀
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const page = startPage + index;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`font-pretendard box-border h-55 w-55 rounded-15 border border-green-950 text-2lg-regular sm:h-40 sm:w-40 ${
              currentPage === page ? 'bg-green-950 text-white' : 'bg-white hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNextGroup}
        disabled={endPage === totalPages}
        className={`box-border h-55 w-55 rounded-15 border bg-white hover:bg-gray-200 sm:h-40 sm:w-40 ${endPage === totalPages ? 'border-gray-400 text-gray-400' : 'border-green-950 text-black'}`}
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
