export type UserProfile = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfileParams = {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
};

export type UploadImageResponse = {
  profileImageUrl: string;
};
