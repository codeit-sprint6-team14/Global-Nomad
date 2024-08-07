import SignupForm from '@/components/pages/auth/signupForm';
import Image from 'next/image';
import Link from 'next/link';

const SignUp = () => {
  return (
    <div className="my-40 flex flex-col items-center">
      <Link href="/">
        <div className="relative mb-40 sm:h-154 sm:w-270 md:h-192 md:w-340">
          <Image
            src="/assets/images/auth-logo.png"
            alt="logo"
            sizes="(max-width: 744px) 270px, 340px"
            fill
            className="absolute"
            priority
          />
        </div>
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
