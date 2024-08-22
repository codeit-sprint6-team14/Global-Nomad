import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import { tokenAtom } from '@/store/tokenAtom';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider, useAtom } from 'jotai';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const queryClient = new QueryClient();

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

function AppContent({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [token, setToken] = useAtom(tokenAtom);

  const showNavBarAndFooter =
    !['/signup', '/signin', '/my-page/reservation-list'].includes(router.pathname) &&
    !router.pathname.startsWith('/my-page/regist-activity');

  useEffect(() => {
    const localToken = localStorage.getItem('accessToken');
    if (localToken && !token) {
      setToken(localToken);
    }
  }, [token]);

  const isLoggedIn = !!token;
  return (
    <main className={`${pretendard.variable} ${showNavBarAndFooter ? 'pt-70' : ''}`}>
      {showNavBarAndFooter && <NavBar accessToken={isLoggedIn} />}
      <div id="notification-root" />
      <Component {...pageProps} />
      {showNavBarAndFooter && <Footer />}
    </main>
  );
}

export default function App(props: AppProps) {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <AppContent {...props} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
