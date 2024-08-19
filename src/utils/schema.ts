import ErrorMessages from '@/constants/errorMessages';
import REGIST_ACTIVITY_ERROR_MESSAGES from '@/constants/registAcitivtyErrorMessages';
import * as yup from 'yup';

export const signupValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required(ErrorMessages.EMAIL_REQUIRED)
    .matches(/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/, ErrorMessages.INVALID_EMAIL),
  password: yup.string().required(ErrorMessages.PASSWORD_REQUIRED).min(8, ErrorMessages.INVALID_PASSWORD),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], ErrorMessages.PASSWORD_CONFIRMATION_MISMATCH)
    .required(ErrorMessages.PASSWORD_CONFIRMATION_REQUIRED),
  nickname: yup
    .string()
    .required(ErrorMessages.NICKNAME_REQUIRED)
    .max(10, ErrorMessages.NICKNAME_TOO_LONG)
    .matches(/^[가-힣a-zA-Z0-9]+$/, ErrorMessages.NICKNAME_NO_SPECIAL_CHARS),
});

export const signinValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required(ErrorMessages.EMAIL_REQUIRED)
    .matches(/^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/, ErrorMessages.INVALID_EMAIL),
  password: yup.string().required(ErrorMessages.PASSWORD_REQUIRED).min(8, ErrorMessages.INVALID_PASSWORD),
});

export const registActivitySchema = yup.object().shape({
  title: yup.string().required(REGIST_ACTIVITY_ERROR_MESSAGES.TITLE_REQUIRED),
  category: yup.string().required(REGIST_ACTIVITY_ERROR_MESSAGES.CATEGORY_REQUIRED),
  description: yup.string().required(REGIST_ACTIVITY_ERROR_MESSAGES.DESCRIPTION_REQUIRED),
  price: yup
    .number()
    .transform((value) => (isNaN(value) ? null : value))
    .test(
      'is-greater-than-zero',
      REGIST_ACTIVITY_ERROR_MESSAGES.MIN_PRICE,
      (value) => value === null || value === undefined || value > 0,
    )
    .required(REGIST_ACTIVITY_ERROR_MESSAGES.PRICE_REQUIRED) as yup.NumberSchema<number | null | undefined>,
  address: yup.object().shape({
    postcode: yup.string(),
    address: yup.string().required(REGIST_ACTIVITY_ERROR_MESSAGES.ADDRESS_REQUIRED),
    detailAddress: yup.string(),
  }),
  schedules: yup.array().min(1, REGIST_ACTIVITY_ERROR_MESSAGES.MIN_TIME_SLOTS),
  bannerImageUrl: yup
    .string()
    .required(REGIST_ACTIVITY_ERROR_MESSAGES.BANNER_IMAGE_REQUIRED)
    .test('is-image-url', REGIST_ACTIVITY_ERROR_MESSAGES.BANNER_IMAGE_REQUIRED, (value) => {
      if (!value) return false;
      return value.startsWith('data:image/') || value.startsWith('blob:') || /\.(jpg|jpeg|png|gif)$/i.test(value);
    }),
  subImageUrls: yup
    .array()
    .of(
      yup.string().test('is-valid-image-url', REGIST_ACTIVITY_ERROR_MESSAGES.INTRO_IMAGES_REQUIRED, (value) => {
        if (!value) return false;
        return value.startsWith('data:image/') || value.startsWith('blob:') || /\.(jpg|jpeg|png|gif)$/i.test(value);
      }),
    )
    .min(1, REGIST_ACTIVITY_ERROR_MESSAGES.INTRO_IMAGES_REQUIRED)
    .required(REGIST_ACTIVITY_ERROR_MESSAGES.INTRO_IMAGES_REQUIRED),
});
