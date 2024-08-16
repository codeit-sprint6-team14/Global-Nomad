import { updateProfile } from '@/apis/updateProfile';
import { uploadImage } from '@/apis/uploadImage';
import { userAtom } from '@/store/userAtom';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRef } from 'react';

const SideNavMenuProfile = () => {
  const [user, setUser] = useAtom(userAtom);
  const initialProfileImage = useRef(user.profileImage);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);

      try {
        // 이미지 업로드 API 호출
        const imageUrl = await uploadImage(formData);

        // 프로필 이미지가 변경된 경우에만 프로필 업데이트 API 호출
        if (imageUrl !== initialProfileImage.current) {
          await updateProfile({ profileImageUrl: imageUrl });

          // 상태 업데이트
          setUser((prev) => ({
            ...prev,
            profileImage: imageUrl,
          }));

          // 초기 프로필 이미지 값 갱신
          initialProfileImage.current = imageUrl;
        }
      } catch (error) {
        console.error('프로필 이미지 업데이트 실패:', error);
      }
    }
  };

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
      <input id="FileInput" className="hidden" type="file" onChange={handleFileChange} />
    </div>
  );
};

export default SideNavMenuProfile;
