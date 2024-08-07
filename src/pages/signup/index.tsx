import SignupForm from '@/components/pages/auth/signupForm';
import Image from 'next/image';
import Link from 'next/link';

const SignUp = () => {
  return (
    <div className="my-40 flex flex-col items-center">
      <Link href="/">
        <Image src="/assets/images/auth-logo.png" width={300} height={300} alt="logo" className="mb-40" />
      </Link>
      <SignupForm />
      <p className="sm:mt-16 md:mt-32 lg:mt-23">
        회원이신가요?{' '}
        <Link href="/signin">
          <span className="underline md:text-green-300">로그인하기</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
