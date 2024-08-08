import PrevButton from '@/../public/assets/icons/pagination-left.svg';
import NextButton from '@/../public/assets/icons/pagination-right.svg';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isPlaceholderData: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, isPlaceholderData }) => {
  const pageGroup = Math.ceil(currentPage / 5);
  const lastPage = pageGroup * 5;
  const firstPage = lastPage - 4;

  const pageNumbers = [];
  for (let i = firstPage; i <= Math.min(lastPage, totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-10 pb-133 pt-40 md:pb-145 lg:pb-293">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isPlaceholderData}
        className={`flex h-40 w-40 items-center justify-center rounded-12 ${
          currentPage === 1 || isPlaceholderData
            ? 'border border-gray-300 bg-white text-gray-600'
            : 'border border-green-300 bg-white text-green-300 hover:bg-green-100'
        }`}
      >
        <PrevButton alt="이전페이지" width={15} height={15} />
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`h-40 w-40 rounded-12 px-15 pb-7 pt-9 text-2lg-medium ${
            currentPage === number
              ? 'bg-green-300 text-white'
              : 'border border-solid border-green-300 bg-white text-green-300 hover:bg-green-100'
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isPlaceholderData || currentPage === Math.min(lastPage, totalPages)}
        className={`flex h-40 w-40 items-center justify-center rounded-12 ${
          currentPage === totalPages || isPlaceholderData || currentPage === Math.min(lastPage, totalPages)
            ? 'border border-gray-300 bg-white text-gray-600'
            : 'border border-green-300 bg-white text-green-300 hover:bg-green-100'
        }`}
      >
        <NextButton alt="다음페이지" width={15} height={15} />
      </button>
    </div>
  );
};

export default Pagination;
