import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useRef } from 'react';

import { AddressCode, AddressInputSectionProps } from './types/addressInputSection.types';

const AddressInputSection = ({ error, onChange, value, isEditMode = false }: AddressInputSectionProps) => {
  const detailAddressRef = useRef<HTMLInputElement>(null);

  const handlePostcodeSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: AddressCode) {
        onChange({
          postcode: data.zonecode,
          address: data.address,
          detailAddress: '',
        });

        if (detailAddressRef.current) {
          detailAddressRef.current.focus();
        }
      },
    }).open();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Input
          placeholder="우편번호"
          className={`h-[44px] ${isEditMode ? 'cursor-not-allowed bg-gray-300' : ''}`}
          error={error}
          readOnly
          value={value.postcode}
          onChange={(e) => onChange({ ...value, postcode: e.target.value })}
        />
        <Button.Default onClick={handlePostcodeSearch} type="button" className="h-[44px] w-120">
          우편번호 찾기
        </Button.Default>
      </div>
      <Input
        placeholder="주소"
        className="h-[44px] cursor-not-allowed"
        readOnly
        value={value.address}
        onChange={(e) => onChange({ ...value, address: e.target.value })}
      />
      <Input
        ref={detailAddressRef}
        placeholder="상세주소"
        className="h-[44px]"
        value={value.detailAddress}
        onChange={(e) => onChange({ ...value, detailAddress: e.target.value })}
      />
    </div>
  );
};

export default AddressInputSection;
