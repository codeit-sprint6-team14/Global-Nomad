export interface reviewDataProps {
  title: string;
  bannerImageUrl: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  headCount: number;
}

export interface TextareaWithSubmitProps {
  text: string;
  onTextChange: (text: string) => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

export interface StarRatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
}
