import Image from 'next/image'

function Footer() {
  return (
    <div className="bg-black w-full h-[160px] p-8">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center">
        <div className="flex gap-8">
          <p className="text-gray-700 lg:mr-8">©codeit - 2023</p>
          <p className="text-gray-700">Privacy Policy</p>
          <p className="text-gray-700 lg:mr-8">FAQ</p>
        </div>
        <div className="flex space-x-4 mt-4 gap-10 md:mt-0">
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
  )
}

export default Footer
