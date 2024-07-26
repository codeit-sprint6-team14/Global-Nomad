import { useState } from 'react';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import Pagination from '@/components/Pagination';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // 예제 값

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <NavBar />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
}
