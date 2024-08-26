import Button from '@/components/common/Button';

interface Props {
  onClose: () => void;
}

const Terms = ({ onClose }: Props) => {
  return (
    <div className="flex h-500 w-327 flex-col rounded-lg border bg-white md:h-550 md:w-540">
      <h2 className="mx-10 mt-20 text-xl-bold font-bold text-gray-800 md:mx-20">이용약관</h2>
      <div className="flex-grow overflow-y-auto p-10 md:p-20">
        <ol className="space-y-15">
          <li>
            <strong>서비스 이용 동의:</strong> <br />본 서비스를 이용함으로써 귀하는 이 약관에 동의하게 됩니다.
          </li>
          <li>
            <strong>개인정보 보호:</strong> <br />
            당사는 귀하의 개인정보를 중요하게 여기며, 관련 법규를 준수합니다.
          </li>
          <li>
            <strong>서비스 제공:</strong> <br />본 서비스는 &quot;있는 그대로&quot; 제공되며, 특정 목적에서의 적합성을
            보증하지 않습니다.
          </li>
          <li>
            <strong>사용자의 의무:</strong> <br />
            사용자는 본 서비스를 불법적인 목적으로 사용하거나 타인의 권리를 침해해서는 안 됩니다.
          </li>
          <li>
            <strong>책임의 제한:</strong>
            <br /> 법이 허용하는 범위 내에서, 당사는 본 서비스 사용으로 인한 손해에 대해 책임을 지지 않습니다.
          </li>
          <li>
            <strong>약관의 변경:</strong>
            <br /> 필요시 본 약관이 변경될 수 있으며, 변경 사항은 서비스 내에 공지됩니다.
          </li>
          <li>
            <strong>준거법 및 관할:</strong> <br />본 약관은 대한민국 법에 따라 해석되며, 분쟁 시 서울중앙지방법원을
            관할로 합니다.
          </li>
        </ol>
        <p className="mt-20">위 약관에 동의하시면 회원가입 시 이용약관 동의 체크박스를 선택해 주세요.</p>
      </div>
      <div className="mx-10 my-20 flex justify-end">
        <Button.Default className="h-42 hover:bg-gray-800 sm:w-138 md:right-30 md:h-48 md:w-120" onClick={onClose}>
          확인
        </Button.Default>
      </div>
    </div>
  );
};

export default Terms;
