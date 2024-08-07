import SignInForm from '@/components/pages/auth/signInForm';
import Image from 'next/image';
import Link from 'next/link';

const SignIn = () => {
  return (
    <div className="my-40 flex flex-col items-center">
      <Link href="/">
        <Image src="/assets/images/auth-logo.png" width={300} height={300} alt="logo" className="mb-40" />
      </Link>
      <SignInForm />
      <p className="sm:mt-16 md:mt-32 lg:mt-23">
        회원이 아니신가요?{' '}
        <Link href="/signup">
          <span className="underline md:text-green-300">회원가입하기</span>
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
