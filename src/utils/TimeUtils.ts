
export const getFormatTime = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().substring(11, 19);
  return timeString
}
