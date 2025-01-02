export const formatCourseDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = (minutes % 60).toFixed(0);

  return `${hours}h ${remainingMinutes}m`;
};

export function formatSecondsToMMSS(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds
    .toFixed(0)
    .toString()
    .padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function numberFormat(num: number) {
  const format = num.toLocaleString("en-US");
  return format;
}
