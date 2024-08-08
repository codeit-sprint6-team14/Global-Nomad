import Image from 'next/image';

interface Props {
  text: string;
}

const SocialForm = ({ text }: Props) => {
  return (
    <>
      <div className="flex items-center sm:mb-24 sm:mt-40 sm:w-350 md:mb-40 md:mt-48 md:w-640">
        <div className="h-1 w-full grow bg-gray-300"></div>
        <span className="shrink-0 text-gray-700 sm:px-18 sm:text-md-regular md:px-30 md:text-xl-regular">{text}</span>
        <div className="h-1 w-full grow bg-gray-300"></div>
      </div>
      <div className="flex justify-center gap-20">
        <div className="relative flex items-center justify-center rounded-full border border-gray-300 sm:h-48 sm:w-48 md:h-72 md:w-72">
          <Image src="/assets/icons/google.svg" alt="google" fill className="absolute sm:p-14 md:p-22" />
        </div>
        <div className="relative flex items-center justify-center rounded-full border border-gray-300 sm:h-48 sm:w-48 md:h-72 md:w-72">
          <Image src="/assets/icons/kakaotalk.svg" alt="kakao talk" fill className="absolute sm:p-14 md:p-22" />
        </div>
      </div>
    </>
  );
};

export default SocialForm;
