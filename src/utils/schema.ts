import ErrorMessages from '@/constants/errorMessages';
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
