export interface ImageUploadResponse {
  activityImageUrl: string;
}

export interface Activity {
  id: string;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MyActivitiesResponse {
  activities: Activity[];
  totalCount: number;
  cursorId: number | null;
}

export interface ActivityFormData {
  title: string;
  category: string;
  description: string;
  price: number | null | undefined;
  address: string;
  schedules: { date: string; startTime: string; endTime: string }[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export interface ActivityFormDataResponse {
  title: string;
  category: string;
  description: string;
  price: number | null;
  address: string;
  schedules: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
  bannerImageUrl: string;
  subImages: { id: number; imageUrl: string }[];
}

export interface PatchActivityFormData {
  title: string;
  category: string;
  description: string;
  price: number | null | undefined;
  address: string;
  schedules: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  bannerImageUrl: string;
  subImageUrls: string[];
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}
