import Image from 'next/image';
import Link from 'next/link';

interface Props {
  text: string;
}
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid%20email&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`;

const SocialForm = ({ text }: Props) => {
  return (
    <>
      <div className="flex items-center sm:mb-24 sm:mt-40 sm:w-350 md:mb-40 md:mt-48 md:w-640">
        <div className="h-1 w-full grow bg-gray-300"></div>
        <span className="shrink-0 text-gray-700 sm:px-18 sm:text-md-regular md:px-30 md:text-xl-regular">{text}</span>
        <div className="h-1 w-full grow bg-gray-300"></div>
      </div>
      <div className="flex justify-center gap-20">
        <Link
          href={GOOGLE_AUTH_URL}
          className="relative flex items-center justify-center rounded-full border border-gray-300 hover:border-green-300 sm:h-48 sm:w-48 md:h-72 md:w-72"
        >
          <Image
            src="/assets/icons/google.svg"
            alt="google"
            fill
            className="absolute sm:p-14 sm:hover:p-12 md:p-22 md:hover:p-20"
          />
        </Link>
        <div className="relative flex items-center justify-center rounded-full border border-gray-300 hover:border-green-300 sm:h-48 sm:w-48 md:h-72 md:w-72">
          <Image
            src="/assets/icons/kakaotalk.svg"
            alt="kakao talk"
            fill
            className="absolute sm:p-14 sm:hover:p-12 md:p-22 md:hover:p-20"
          />
        </div>
      </div>
    </>
  );
};

export default SocialForm;
