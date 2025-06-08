/**
 * convert a duration string (e.g.) to toal secondes
 * @param duration - in "mm:ss" format
 */

export function durationsToSecond(duration: string): number {
  if ("" == duration) return 0;
  const [minutes, secondes] = duration.split(":").map(Number);
  return minutes * 60 + secondes;
}

export function secondsToFormat(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${paddedSeconds}`;
}

export const getPastXDays = (xDays: number): string[]=> {
  if (xDays > 30 || xDays < 1) {
    console.error("X days should be between 1 and 30");
    return [];
  }
  const dates: string[] = [];
  for (let i = 0; i < xDays; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const formatted = date.toISOString().split("T")[0]; // "YYYY-MM-DD"
    dates.push(formatted);
  }
  return dates;
};
