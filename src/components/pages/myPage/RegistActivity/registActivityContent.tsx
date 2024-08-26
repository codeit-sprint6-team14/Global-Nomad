/* eslint-disable @typescript-eslint/no-explicit-any */
import { PatchActivityFormData } from '@/apis/myPage/myActivitySettings.types';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import TextArea from '@/components/common/TextArea';
import { formatNumber, isNumber, unformatNumber } from '@/utils/formatNumber';
import { registActivitySchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import AddActivityTimeSection from './addActivityTimeSection';
import AddressInputSection from './addressInputSection';
import { useActivityByIdQuery } from './hooks/useActivityByIdQuery';
import { useActivityMutation } from './hooks/useActivityMutation';
import {
  ActivityFormData,
  InitialImage,
  RegistActivityContentProps,
  Schedule,
} from './types/registActivityContent.types';
import UploadBannerImageSection from './uploadBannerImageSection';
import UploadIntroImageSection from './uploadIntroImageSection';

const categoryOptions = [
  { value: '문화 · 예술', label: '문화 · 예술' },
  { value: '식음료', label: '식음료' },
  { value: '스포츠', label: '스포츠' },
  { value: '관광', label: '관광' },
  { value: '투어', label: '투어' },
  { value: '웰빙', label: '웰빙' },
];

const RegistActivityContent = ({ activityId }: RegistActivityContentProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialImages, setInitialImages] = useState<InitialImage[]>([]);
  const [subImageIdsToRemove, setSubImageIdsToRemove] = useState<number[]>([]);
  const [subImageUrlsToAdd, setSubImageUrlsToAdd] = useState<string[]>([]);
  const [initialSchedules, setInitialSchedules] = useState<Schedule[]>([]);
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);
  const [schedulesToAdd, setSchedulesToAdd] = useState<Schedule[]>([]);
  const isEditMode = !!activityId;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ActivityFormData>({
    resolver: yupResolver(registActivitySchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      price: null,
      address: {
        postcode: '',
        address: '',
        detailAddress: '',
      },
      schedules: [],
      bannerImageUrl: '',
      subImageUrls: [],
    },
  });

  const { error: activityQueryError, data: activityData } = useActivityByIdQuery(activityId);
  const { error: activityMutationError, mutate: mutateActivity } = useActivityMutation(activityId, () =>
    setIsModalOpen(true),
  );

  const onSubmit = (data: any) => {
    if (isValid) {
      const fullAddress = `${data.address.address} ${data.address.detailAddress}`.trim();
      const submissionData: PatchActivityFormData = {
        ...data,
        address: fullAddress,
        subImageIdsToRemove,
        subImageUrlsToAdd,
        scheduleIdsToRemove,
        schedulesToAdd,
      };

      mutateActivity(submissionData);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/my-page/activity-settings');
  };

  useEffect(() => {
    if (activityData) {
      const formData = {
        title: activityData.title || '',
        category: activityData.category || '',
        description: activityData.description || '',
        price: activityData.price || null,
        address: {
          postcode: '',
          address: activityData.address || '',
          detailAddress: '',
        },
        schedules: activityData.schedules || [],
        bannerImageUrl: activityData.bannerImageUrl || '',
        subImageUrls: activityData.subImages?.map((image) => image.imageUrl) || [],
      };
      reset(formData);

      if (activityData.subImages) {
        setInitialImages(
          activityData.subImages.map((image) => ({
            id: image.id,
            imageUrl: image.imageUrl,
          })),
        );
      }

      if (activityData.schedules) {
        setInitialSchedules(
          activityData.schedules.map((schedule) => ({
            id: schedule.id,
            date: schedule.date,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
          })),
        );
      }
    }
  }, [activityData, reset]);

  return (
    <>
      {activityQueryError && <div className="mb-4 text-red-500">{activityQueryError.message}</div>}
      {activityMutationError && <div className="mb-4 text-red-500">{activityMutationError.message}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="w-343 md:w-429 lg:w-792">
        <div className="mb-24 flex items-center justify-between">
          <h1 className="text-3xl-bold">내 체험 등록</h1>
          <Button.Default type="submit" className="h-48 w-120 rounded-4">
            {isEditMode ? '수정하기' : '등록하기'}
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
              render={({ field: { onChange, value } }) => (
                <Input.Dropdown
                  options={categoryOptions}
                  defaultOption="카테고리를 선택해주세요."
                  value={value}
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
              render={({ field: { onChange, value } }) => (
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
                <AddressInputSection
                  value={value}
                  isEditMode={isEditMode}
                  onChange={onChange}
                  error={!!errors.address}
                />
              )}
            />
            {errors.address?.address && <span className="errorText">{errors.address.address.message}</span>}
          </div>

          {/* 날짜, 시간 선택 */}
          <div>
            <Controller
              name="schedules"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <AddActivityTimeSection
                  initialSchedules={initialSchedules}
                  onChange={(data) => {
                    onChange(data.currentSchedules);
                    setScheduleIdsToRemove(data.scheduleIdsToRemove);
                    setSchedulesToAdd(data.schedulesToAdd);
                  }}
                  error={!!errors.schedules}
                />
              )}
            />
            {errors.schedules && <span className="errorText">{errors.schedules.message}</span>}
          </div>

          {/* 배너 이미지 */}
          <div>
            <Controller
              name="bannerImageUrl"
              control={control}
              render={({ field: { onChange, value } }) => (
                <UploadBannerImageSection onChange={onChange} initialImage={value} error={!!errors.bannerImageUrl} />
              )}
            />
            {errors.bannerImageUrl && <span className="errorText">{errors.bannerImageUrl.message}</span>}
          </div>

          {/* 소개 이미지 */}
          <div>
            <Controller
              name="subImageUrls"
              control={control}
              render={({ field: { onChange } }) => (
                <UploadIntroImageSection
                  onChange={(data) => {
                    onChange(data.currentImages);
                    setSubImageIdsToRemove(data.subImageIdsToRemove);
                    setSubImageUrlsToAdd(data.subImageUrlsToAdd);
                  }}
                  initialImages={initialImages}
                  error={!!errors.subImageUrls}
                />
              )}
            />
            {errors.subImageUrls && <span className="errorText">{errors.subImageUrls.message}</span>}
          </div>
        </div>
      </form>
      <Modal.Overlay isOpen={isModalOpen} onClose={handleCloseModal}>
        <Modal.RegisterConfirm onClose={handleCloseModal}>
          {`체험 ${isEditMode ? '수정' : '등록'}이 완료되었습니다.`}
        </Modal.RegisterConfirm>
      </Modal.Overlay>
    </>
  );
};

export default RegistActivityContent;
