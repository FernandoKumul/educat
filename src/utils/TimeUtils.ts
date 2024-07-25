export const getFormatTime = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeString = date.toISOString().substring(11, 19);
  return timeString
}

export const getFormatTimeinMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const secondsRemaining = seconds % 60
  return minutes.toString().padStart(2, '0') + ':' + secondsRemaining.toString().padStart(2, '0')
}
