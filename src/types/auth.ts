export interface SignupFormData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export type SignupData = Omit<SignupFormData, 'passwordConfirmation'>;
export interface SigninData {
  email: string;
  password: string;
}

export interface TokensResponse {
  refreshToken: string;
  accessToken: string;
}

export interface UserProfile {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SigninResponse {
  user: UserProfile;
  refreshToken: string;
  accessToken: string;
}

export interface SigninError {
  error: string;
}

export type SigninResult = SigninResponse | SigninError;
