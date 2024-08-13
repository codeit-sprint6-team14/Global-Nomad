import { userAtom } from '@/store/userAtom';
import { useAtom } from 'jotai';
import Image from 'next/image';

const SideNavMenuProfile = () => {
  const [user] = useAtom(userAtom);

  return (
    <div className="relative flex justify-center">
      <div className="relative h-160 w-160 overflow-hidden rounded-full">
        <Image
          src={user.profileImage || '/assets/images/testImg/test-profile-img.png'}
          alt="프로필이미지"
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="(min-width: 375px) 160px"
        />
      </div>
      <label
        htmlFor="FileInput"
        className="absolute bottom-[-2px] right-70 flex h-44 w-44 cursor-pointer items-center justify-center rounded-full bg-green-300 md:right-30 lg:right-95"
      >
        <Image src="/assets/icons/pencil.svg" alt="연필이미지" width={24} height={24} />
      </label>
      <input id="FileInput" className="hidden" type="file" placeholder="이미지 등록" />
    </div>
  );
};

export default SideNavMenuProfile;
