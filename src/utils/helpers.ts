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

export const parseTimeInput = (inputValue: string, value: number) => {
  const [minutesStr, secondsStr] = inputValue.split(":");
  const minutes = parseInt(minutesStr);
  const seconds = parseInt(secondsStr);

  if (
    !isNaN(minutes) &&
    !isNaN(seconds) &&
    minutes >= 0 &&
    seconds >= 0 &&
    seconds < 60
  ) {
    return minutes * 60 + seconds;
  }

  return value; // Return the original value if parsing fails
};
