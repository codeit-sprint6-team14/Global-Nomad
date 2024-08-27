import Button from '@/components/common/Button';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';

import animationData from '../../../public/assets/lotties/404page.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const index = () => {
  return (
    <>
      <Head>
        <title>404 - 페이지를 찾을 수 없습니다</title>
        <meta name="description" content="요청하신 페이지를 찾을 수 없습니다." />
      </Head>

      <div className="flex flex-col items-center justify-center bg-gray-100 pb-120">
        <div className="w-full max-w-md">
          <Lottie animationData={animationData} loop={true} />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">페이지를 찾을 수 없습니다</h1>
        <p className="my-20 text-xl text-gray-600">죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>

        <Button.Default className="mb-100 px-20 py-10">
          <Link href="/">홈으로 돌아가기</Link>
        </Button.Default>
      </div>
    </>
  );
};

export default index;
