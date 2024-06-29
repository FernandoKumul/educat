export const formatDate = (datetime: string) => {
  const date = new Date(datetime);
  return date.toLocaleDateString();
}