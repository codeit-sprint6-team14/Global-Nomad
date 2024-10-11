import LeftArrow from '@/../public/assets/icons/left-arrow.svg';
import AnimatedContainer from '@/components/common/Animation/AnimatedContainer';
import Filter from '@/components/common/Filter';
import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import SideNavMenu from '@/components/common/SideNavMenu';
import Content from '@/components/pages/myPage/ReservationList/content';
import { useListQuery } from '@/components/pages/myPage/ReservationList/hooks/useListQuery';
import { useDeviceState } from '@/hooks/useDeviceState';
import { Device } from '@/types/deviceTypes';
import { useRouter } from 'next/router';

const ReservationList = () => {
  const router = useRouter();
  const deviceState = useDeviceState();
  const isMobile = deviceState === Device.MOBILE;

  const { list, isListEmpty, divRef, handleStatusChange, selectedOption } = useListQuery();

  return (
    <>
      <NavBar />
      <AnimatedContainer>
        <main className="md:mb-400 lg:mb-270 mx-auto mb-[496px] w-344 pt-94 md:w-696 lg:w-1200 lg:pt-142">
          {isMobile ? (
            <div className={`flex flex-col ${isListEmpty && 'gap-86 md:gap-82 lg:gap-[117px]'}`}>
              <div className="mb-12 flex items-center">
                <div className="cursor-pointer md:hidden">
                  <LeftArrow onClick={() => router.push('/my-page')} />
                </div>
                <h1 className="ml-10 text-3xl-bold">예약 내역</h1>
              </div>
              <Content list={list} isListEmpty={isListEmpty} />
            </div>
          ) : (
            <div className="flex justify-between">
              <SideNavMenu />
              <div className="flex flex-col">
                <div
                  className={`md:mb-24 md:flex md:items-center md:justify-between ${isListEmpty && 'md:mb-[64px] lg:mb-[80px]'}`}
                >
                  <h1 className="text-3xl-bold">예약 내역</h1>
                  <Filter content="필터" onOptionSelect={handleStatusChange} selectedOption={selectedOption} />
                </div>
                <Content list={list} isListEmpty={isListEmpty} />
              </div>
            </div>
          )}
          <div ref={divRef}></div>
        </main>
      </AnimatedContainer>
      <Footer />
    </>
  );
};

export default ReservationList;
