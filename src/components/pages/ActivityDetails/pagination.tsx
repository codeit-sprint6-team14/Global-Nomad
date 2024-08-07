interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2)); // 2
    // eslint-disable-next-line prefer-const
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1); // 6

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`mx-1 h-8 w-8 rounded-full ${
            currentPage === i ? 'bg-green-700 text-white' : 'border border-gray-300'
          }`}
        >
          {i}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="mt-4 flex items-center justify-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 rounded-md border border-gray-300 px-2 py-1 disabled:opacity-50"
      >
        &#8249;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 rounded-md border border-gray-300 px-2 py-1 disabled:opacity-50"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Pagination;
