import Button from '@/components/common/Button';

const MyProfile = () => {
  return (
    <div>
      <div className="ml-auto mr-auto mt-30 w-343">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl-bold">내 정보</h2>
          <Button.Default className="ml-auto h-48 w-120">저장하기</Button.Default>
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
