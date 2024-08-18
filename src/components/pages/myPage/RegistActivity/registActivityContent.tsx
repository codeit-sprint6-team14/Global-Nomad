import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import { formatNumber, isNumber, unformatNumber } from '@/utils/numberFormatting';
import { registActivitySchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import AddActivityTimeSection from './addActivityTimeSection';
import AddressInputSection from './addressInputSection';
import ImageUploadSection, { ImageFile } from './imageUploadSection';

const categoryOptions = [
  { value: 'option1', label: '문화예술' },
  { value: 'option2', label: '식음료' },
  { value: 'option3', label: '스포츠' },
  { value: 'option4', label: '관광' },
  { value: 'option5', label: '투어' },
];

const RegistActivityContent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registActivitySchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      category: '',
      description: '',
      price: '',
      address: {
        postcode: '',
        address: '',
        detailAddress: '',
      },
      timeSlots: [],
      bannerImage: [],
      introImages: [],
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    if (isValid) {
      const fullAddress = `${data.address.address} ${data.address.detailAddress}`.trim();
      const submissionData = {
        ...data,
        address: fullAddress,
      };
      console.log('제출 데이터:', submissionData);
      // TODO: 나머지 Form 제출 로직
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-343 md:w-429 lg:w-792">
      <div className="mb-24 flex items-center justify-between">
        <h1 className="text-3xl-bold">내 체험 등록</h1>
        <Button.Default type="submit" className="h-48 w-120 rounded-4">
          등록하기
        </Button.Default>
      </div>
      <div className="flex flex-col gap-24">
        {/* 제목 */}
        <div>
          <h2 className="mb-12 text-xl-bold md:mb-16 md:text-2xl-bold">제목</h2>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input placeholder="제목" error={!!errors.title} {...field} />}
          />
          {errors.title && <span className="errorText">{errors.title.message}</span>}
        </div>

        {/* 카테고리 */}
        <div>
          <h2 className="mb-12 text-xl-bold md:mb-16 md:text-2xl-bold">카테고리</h2>
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange } }) => (
              <Input.Dropdown
                options={categoryOptions}
                defaultOption="카테고리를 선택해주세요."
                onSelect={(option) => onChange(option.value)}
                error={!!errors.category}
                className="h-56"
              />
            )}
          />
          {errors.category && <span className="errorText">{errors.category.message}</span>}
        </div>

        {/* 설명 */}
        <div>
          <h2 className="mb-12 text-xl-bold md:mb-16 md:text-2xl-bold">설명</h2>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextArea placeholder="설명" error={!!errors.description} {...field} />}
          />
          {errors.description && <span className="errorText">{errors.description.message}</span>}
        </div>

        {/* 가격 */}
        <div>
          <h2 className="mb-12 text-xl-bold md:mb-16 md:text-2xl-bold">가격</h2>
          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <Input
                placeholder="가격"
                value={formatNumber(value)}
                onChange={(e) => {
                  const inputValue = unformatNumber(e.target.value);

                  if (isNumber(inputValue)) {
                    onChange(inputValue);
                  }
                }}
                error={!!errors.price}
                {...rest}
              />
            )}
          />
          {errors.price && <span className="errorText">{errors.price.message}</span>}
        </div>

        {/* 주소 */}
        <div>
          <h2 className="mb-12 text-xl-bold md:mb-16 md:text-2xl-bold">주소</h2>
          <Controller
            name="address"
            control={control}
            render={({ field: { onChange, value } }) => (
              <AddressInputSection onChange={onChange} value={value} error={!!errors.address} />
            )}
          />
          {errors.address && <span className="errorText">{errors.address.message}</span>}
        </div>

        {/* 날짜, 시간 선택 */}
        <div>
          <Controller
            name="timeSlots"
            control={control}
            render={({ field: { value, onChange } }) => (
              <AddActivityTimeSection timeSlots={value || []} onChange={onChange} error={!!errors.timeSlots} />
            )}
          />
          {errors.timeSlots && <span className="errorText">{errors.timeSlots.message}</span>}
        </div>

        {/* 배너 이미지 */}
        <div>
          <Controller
            name="bannerImage"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImageUploadSection
                title="배너 이미지"
                onChange={onChange}
                value={value as ImageFile[]}
                error={!!errors.bannerImage}
              />
            )}
          />
          {errors.bannerImage && <span className="errorText">{errors.bannerImage.message}</span>}
        </div>

        {/* 소개 이미지 */}
        <div>
          <Controller
            name="introImages"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ImageUploadSection
                title="소개 이미지"
                multiple={true}
                onChange={onChange}
                value={value as ImageFile[]}
                error={!!errors.introImages}
              />
            )}
          />
          {errors.introImages && <span className="errorText">{errors.introImages.message}</span>}
        </div>

        <p className="text-2lg-regular text-gray-800">*이미지는 최대 4개까지 등록 가능합니다</p>
      </div>
    </form>
  );
};

export default RegistActivityContent;
