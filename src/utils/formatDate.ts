/**
 * * UTC 기준으로 날짜를 'YYYY-MM-DD' 형식의 문자열로 변환합니다.
 * @param dateString 변환할 날짜 (문자열 또는 Date 객체)
 * @returns 'YYYY-MM-DD' 형식의 날짜 문자열
 */

const formatDateUTC = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export default formatDateUTC;
