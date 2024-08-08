import SignInForm from '@/components/pages/auth/signInForm';
import SocialForm from '@/components/pages/auth/socialForm';
import Image from 'next/image';
import Link from 'next/link';

const SignIn = () => {
  return (
    <div className="my-40 flex flex-col items-center">
      <Link href="/">
        <div className="relative mb-40 sm:h-154 sm:w-270 md:h-192 md:w-340">
          <Image
            src="/assets/images/auth-logo.png"
            sizes="(max-width: 744px) 270px, 340px"
            alt="logo"
            fill
            className="absolute"
            priority
          />
        </div>
      </Link>
      <SignInForm />
      <p className="sm:mt-16 md:mt-32 lg:mt-23">
        회원이 아니신가요?{' '}
        <Link href="/signup">
          <span className="underline md:text-green-300">회원가입하기</span>
        </Link>
      </p>
      <SocialForm text="SNS 계정으로 로그인하기" />
    </div>
  );
};

export default SignIn;
