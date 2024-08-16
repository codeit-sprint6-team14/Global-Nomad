const ErrorMessages = {
  EMAIL_REQUIRED: '이메일을 입력해주세요.',
  INVALID_EMAIL: '이메일 형식으로 작성해 주세요.',
  EMAIL_ALREADY_REGISTERED: '이미 사용 중인 이메일입니다.',
  PASSWORD_REQUIRED: '비밀번호를 입력해주세요.',
  INVALID_PASSWORD: '8자 이상 입력해 주세요.',
  PASSWORD_CONFIRMATION_MISMATCH: '비밀번호가 일치하지 않습니다.',
  PASSWORD_CONFIRMATION_REQUIRED: '비밀번호 확인란을 입력해주세요.',
  NICKNAME_TOO_LONG: '열 자 이하로 작성해주세요.',
  NICKNAME_REQUIRED: '닉네임을 입력해주세요.',
  NICKNAME_NO_SPECIAL_CHARS: '특수문자는 사용할 수 없습니다',
  SIGNIN_ERROR: '로그인 중 오류가 발생했습니다.',
  SIGNUP_ERROR: '회원가입 중 오류가 발생했습니다.',
  UNKOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
};

export default ErrorMessages;

export const DELETE_ACTIVITY_ERROR_MESSAGES = {
  PENDING_RESERVATION: '신청 예약이 있는 체험은 삭제할 수 없습니다.',
  CONFIRMED_RESERVATION: '확정 예약이 있는 체험은 삭제할 수 없습니다.',
  UNAUTHORIZED: '로그인 만료 시간이 지났습니다.',
  FORBIDDEN: '본인의 체험만 삭제할 수 있습니다.',
  NOT_FOUND: '존재하지 않는 체험입니다.',
  DEFAULT: '체험을 삭제하는데 실패했습니다.',
};
