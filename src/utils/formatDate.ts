const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // 'YYYY-MM-DD' 형식으로 반환
};

export default formatDate;
