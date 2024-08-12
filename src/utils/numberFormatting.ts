/**
 * 숫자 문자열에 1000 단위로 콤마를 추가합니다.
 * @param num 포맷팅할 숫자 문자열
 * @returns 콤마가 추가된 숫자 문자열
 */
export const formatNumber = (num: string): string => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * 숫자 문자열에서 콤마를 제거합니다.
 * @param num 콤마를 제거할 숫자 문자열
 * @returns 콤마가 제거된 숫자 문자열
 */
export const unformatNumber = (num: string): string => {
  return num.replace(/,/g, '');
};

/**
 * 입력값이 숫자인지 확인합니다.
 * @param value 확인할 값
 * @returns 숫자이면 true, 아니면 false
 */
export const isNumber = (value: string): boolean => {
  return value === '' || /^\d+$/.test(value);
};
