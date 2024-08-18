// Banner Image
export interface UploadBannerImageSectionProps {
  error: boolean;
  onChange: (images: string) => void;
  initialImage: string;
}

// Intro Image
export interface BaseImage {
  id: number;
  imageUrl: string;
}

export interface LocalImage {
  blobUrl: string;
  file: File;
}

export interface IntroImageData {
  currentImages: string[];
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
}

export interface UploadIntroImageSectionProps {
  onChange: (data: IntroImageData) => void;
  error: boolean;
  initialImages: BaseImage[];
}
