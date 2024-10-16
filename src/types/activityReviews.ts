export interface User {
  profileImageUrl: string;
  nickname: string;
  id: number;
}
export type ReviewType = {
  id: number;
  user: User;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};
