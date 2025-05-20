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
