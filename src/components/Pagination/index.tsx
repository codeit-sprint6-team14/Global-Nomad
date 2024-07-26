import React from 'react';
import NavButton from './navButton';
import PageButton from './pageButton';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
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
      <NavButton
        onClick={handlePreviousGroup}
        disabled={currentGroup === 1}
        className=""
      >
        ◀
      </NavButton>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const page = startPage + index;
        return (
          <PageButton
            key={page}
            page={page}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        );
      })}

      <NavButton
        onClick={handleNextGroup}
        disabled={endPage === totalPages}
        className=""
      >
        ▶
      </NavButton>
    </div>
  );
};

export default Pagination;
