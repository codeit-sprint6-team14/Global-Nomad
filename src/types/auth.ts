export interface SignupData {
  email: string;
  nickname: string;
  password: string;
}

export interface SigninData {
  email: string;
  password: string;
}

export interface TokensResponse {
  refreshToken: string;
  accessToken: string;
}

export type LoginResult = { success: true; data: TokensResponse } | { success: false; error: string };
