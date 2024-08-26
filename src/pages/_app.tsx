import Footer from '@/components/common/Footer';
import NavBar from '@/components/common/NavBar';
import ToastProvider from '@/components/common/Toast/toastProvider';
import useRedirectMessage from '@/hooks/useRedirectMessage';
import { tokenAtom } from '@/store/tokenAtom';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider, useAtom } from 'jotai';
import Cookies from 'js-cookie';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);
  useRedirectMessage();

  const showNavBarAndFooter =
    !['/signup', '/signin'].includes(router.pathname) && !router.pathname.startsWith('/my-page');

  useEffect(() => {
    const cookieToken = Cookies.get('accessToken');
    if (cookieToken && !token) {
      setToken(cookieToken);
    }
    setIsLoading(false);
  }, [token, isLoading]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <main className={`${pretendard.variable} ${showNavBarAndFooter ? 'pt-70' : ''}`}>
      {showNavBarAndFooter && <NavBar />}
      <div id="notification-root" />
      <Component {...pageProps} />
      <ToastProvider />
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
