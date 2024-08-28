export interface reviewDataProps {
  title: string | undefined;
  bannerImageUrl: string;
  date: string | undefined;
  startTime: string | undefined;
  endTime: string | undefined;
  totalPrice: number | undefined;
  headCount: number | undefined;
}

export interface TextareaWithSubmitProps {
  content: string;
  onContentChange: (content: string) => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

export interface StarRatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
}
