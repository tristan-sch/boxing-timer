export function getTrimmedNumber(number = "") {
  const trimmedNumber = number.trim().replace(/[^\d]/g, "");
  return trimmedNumber;
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
