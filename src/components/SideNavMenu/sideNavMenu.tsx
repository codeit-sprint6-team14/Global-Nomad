import Image from 'next/image'
import SideNavMenu from '.'

const sideNavMenu = () => {
  return (
    <div className="w-max h-max p-24 border border-solid rounded-12 border-gray-300">
      <div className=" flex flex-col gap-24">
        <div className="relative flex justify-center">
          <div className="relative w-160 h-160 rounded-full overflow-hidden ">
            <Image
              src="/images/test-profile-img.png"
              alt="프로필이미지"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <div className="w-44 h-44 bg-green-300 absolute bottom-[-2px] right-70 md:right-30 lg:right-95 flex justify-center items-center rounded-full">
            <Image
              src="/images/icon-pencil.svg"
              alt="연필이미지"
              width={24}
              height={24}
            />
          </div>
        </div>
        <SideNavMenu.sideNavMenuOptionList />
      </div>
    </div>
  )
}

export default sideNavMenu
