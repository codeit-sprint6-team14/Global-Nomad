import NavBar from '@/components/common/NavBar';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
  const showNavBar = !['/signup', '/signin'].includes(router.pathname);

  return (
    <main className={pretendard.variable}>
      <QueryClientProvider client={queryClient}>
        {showNavBar && <NavBar />}
        <Component {...pageProps} />
      </QueryClientProvider>
    </main>
  );
}
