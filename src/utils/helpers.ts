"use client";
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

export function timeToSeconds(timeString: string) {
  const [minutes, seconds] = timeString.split(":").map(Number);
  const totalSeconds = minutes * 60 + seconds;
  return totalSeconds;
}

export function parseTimeInput(inputValue: number) {
  const [minutesStr, secondsStr] = inputValue.toString().split(":");
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

  return inputValue; // Return the original value if parsing fails
}

export function timeType(type?: string): boolean {
  return type === "time";
}

export function playAudio(
  audioRef: React.RefObject<HTMLAudioElement> | null,
  playbackRate?: number
) {
  if (audioRef && audioRef.current && playbackRate) {
    audioRef.current.playbackRate = playbackRate;
    audioRef.current.play();
  } else {
    audioRef?.current?.play();
  }
}

export function pauseAudio(audioRef: React.RefObject<HTMLAudioElement> | null) {
  audioRef?.current?.pause();
}
