import Image from 'next/image'

function Footer() {
  return (
    <div className="bg-black w-full h-[160px] p-30 ">
      <div className="flex flex-col items-center gap-30 md:flex-row  md:justify-center ">
        <div className="flex gap-30">
          <p className="text-gray-700 lg:mr-200">©codeit - 2023</p>
          <p className="text-gray-700">Privacy Policy</p>
          <p className="text-gray-700 lg:mr-200">FAQ</p>
        </div>
        <div className="flex space-x-4 mt-4 gap-10 md:mt-0">
          <Image
            src="/images/icon-facebook.svg"
            alt="facebook icon"
            width={20}
            height={20}
          />
          <Image
            src="/images/icon-twitter.svg"
            alt="twitter icon"
            width={20}
            height={20}
          />
          <Image
            src="/images/icon-youtube.svg"
            alt="youtube icon"
            width={20}
            height={20}
          />
          <Image
            src="/images/icon-instagram.svg"
            alt="instagram icon"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  )
}
export default Footer
