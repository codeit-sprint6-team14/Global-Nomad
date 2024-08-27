export interface Activity {
  id: number;
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

export interface ActivitiesResponse {
  activities: Activity[];
  totalCount: number;
  cursorId: number | null;
}

export interface ActivityCardProps {
  activity: Activity;
}

export interface FilteredActivitiesProps {
  activities: Activity[];
  currentPage: number;
  pageSize: number;
}

export interface GetActivitiesParams {
  method: 'offset';
  page: number;
  size: number;
  category?: string;
  sortBy?: string;
}

export interface SearchProps {
  onSearch: (searchTerm: string) => void;
}
