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
  price: yup.string().required(REGIST_ACTIVITY_ERROR_MESSAGES.PRICE_REQUIRED),
  address: yup.object().shape({
    postcode: yup.string(),
    address: yup.string().required(REGIST_ACTIVITY_ERROR_MESSAGES.ADDRESS_REQUIRED),
    detailAddress: yup.string(),
  }),
  timeSlots: yup
    .array()
    .of(
      yup.object().shape({
        date: yup.string().required(REGIST_ACTIVITY_ERROR_MESSAGES.DATE_REQUIRED),
        startTime: yup.string().required(REGIST_ACTIVITY_ERROR_MESSAGES.START_TIME_REQUIRED),
        endTime: yup.string().required(REGIST_ACTIVITY_ERROR_MESSAGES.END_TIME_REQUIRED),
      }),
    )
    .min(1, REGIST_ACTIVITY_ERROR_MESSAGES.MIN_TIME_SLOTS),
  bannerImage: yup
    .array()
    .of(
      yup.object().shape({
        file: yup.mixed().required(),
        preview: yup.string().required(),
      }),
    )
    .min(1, REGIST_ACTIVITY_ERROR_MESSAGES.BANNER_IMAGE_REQUIRED)
    .required(REGIST_ACTIVITY_ERROR_MESSAGES.BANNER_IMAGE_REQUIRED),
  introImages: yup
    .array()
    .of(
      yup.object().shape({
        file: yup.mixed().required(),
        preview: yup.string().required(),
      }),
    )
    .min(1, REGIST_ACTIVITY_ERROR_MESSAGES.INTRO_IMAGES_REQUIRED)
    .required(REGIST_ACTIVITY_ERROR_MESSAGES.INTRO_IMAGES_REQUIRED),
});
