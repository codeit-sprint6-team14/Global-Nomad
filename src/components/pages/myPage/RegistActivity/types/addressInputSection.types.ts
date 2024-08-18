/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    daum: any;
  }
}

export interface AddressInputSectionProps {
  error: boolean;
  value: {
    postcode?: string;
    address: string;
    detailAddress?: string;
  };
  onChange: (value: { postcode?: string; address: string; detailAddress?: string }) => void;
  isEditMode?: boolean;
}

export interface AddressCode {
  address: string;
  zonecode: string;
}
