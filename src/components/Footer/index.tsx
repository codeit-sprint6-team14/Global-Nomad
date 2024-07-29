/* eslint-disable react/function-component-definition */
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="h-160 w-full bg-black p-30">
      <div className="flex flex-col items-center gap-30 md:flex-row md:justify-center">
        <div className="flex gap-30">
          <p className="text-gray-700 lg:mr-200">©codeit - 2023</p>
          <p className="text-gray-700">Privacy Policy</p>
          <p className="text-gray-700 lg:mr-200">FAQ</p>
        </div>
        <div className="mt-4 flex gap-10 space-x-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icon-facebook.svg"
              alt="facebook icon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </a>
          <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/icon-twitter.svg"
              alt="twitter icon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icon-youtube.svg"
              alt="youtube icon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/images/icon-instagram.svg"
              alt="instagram icon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
