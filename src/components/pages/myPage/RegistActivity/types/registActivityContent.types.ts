export interface RegistActivityContentProps {
  activityId?: string | string[] | undefined;
}

export interface InitialImage {
  id: number;
  imageUrl: string;
}

export interface Schedule {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ActivityFormData {
  title: string;
  category: string;
  description: string;
  price?: number | null | undefined;
  address: {
    postcode?: string;
    address: string;
    detailAddress?: string;
  };
  schedules?: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  bannerImageUrl: string;
  subImageUrls: (string | undefined)[];
}
