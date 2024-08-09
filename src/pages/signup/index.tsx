import SignupForm from '@/components/pages/auth/signupForm';
import SocialForm from '@/components/pages/auth/socialForm';
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
      <p className="sm:mt-24 md:mt-32">
        회원이신가요?{' '}
        <Link href="/signin">
          <span className="text-green-300 underline hover:text-gray-700">로그인하기</span>
        </Link>
      </p>
      <SocialForm text="SNS 계정으로 회원가입하기" />
    </div>
  );
};

export default SignUp;
