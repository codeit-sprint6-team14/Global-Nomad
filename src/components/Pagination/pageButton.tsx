import React from 'react';

interface PageButtonProps {
  page: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PageButton: React.FC<PageButtonProps> = ({
  page,
  currentPage,
  onPageChange,
}) => {
  return (
    <button
      onClick={() => onPageChange(page)}
      className={`w-55 h-55 sm:w-40 sm:h-40 box-border border border-green-950 rounded-15 font-pretendard text-2lg-regular ${
        currentPage === page
          ? 'bg-green-950 text-white'
          : 'bg-white hover:bg-gray-200'
      }`}
    >
      {page}
    </button>
  );
};

export default PageButton;
