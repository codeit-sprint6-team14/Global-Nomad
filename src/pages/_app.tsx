import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showNavBarAndFooter = !['/signup', '/signin', '/my-page/reservation-list', '/my-page/regist-activity'].includes(
    router.pathname,
  );

  const isActivitieDetailsPage = router.pathname.startsWith('/activities');

  return (
    <Provider>
      <main className={`${pretendard.variable} ${showNavBarAndFooter ? 'pt-70' : ''}`}>
        <QueryClientProvider client={queryClient}>
          {showNavBarAndFooter && <NavBar />}
          <div id="notification-root" />
          <Component {...pageProps} />
          {showNavBarAndFooter && <Footer classNames={isActivitieDetailsPage ? 'mb-82' : ''} />}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </main>
    </Provider>
  );
}
