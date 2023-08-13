"use client";
import { PlayIcon, StopIcon, PauseIcon } from "@heroicons/react/20/solid";
import useTimer from "../hooks/useTimer";

type Props = {
  startTime: number;
  roundNumber: number;
  roundTime: number;
  restTime: number;
  isSoundActive: boolean;
};

export default function Timer({
  startTime,
  roundNumber,
  roundTime,
  restTime,
  isSoundActive,
}: Props) {
  const {
    minutes,
    seconds,
    isRunning,
    isRoundPhase,
    isRestPhase,
    completedRounds,
    audioRoundRef,
    audioBeepRef,
    audioBell3Ref,
    handleTogglePause,
    handleReset,
  } = useTimer(startTime, roundNumber, roundTime, restTime);

  const isFinished =
    !isRunning && completedRounds > 0 && !isRoundPhase && !isRestPhase;

  let phase: string;
  let bgColor: String;
  if (isRoundPhase) {
    phase = `Round ${completedRounds}`;
    bgColor = "bg-red-400";
  } else if (isRestPhase) {
    phase = `Rest ${completedRounds}`;
    bgColor = "bg-yellow-400";
  } else if (isFinished) {
    phase = "BÚINN";
    bgColor = "bg-green-400";
  } else {
    phase = "Start in";
    bgColor = "bg-gray-400";
  }

  return (
    <div className={`${bgColor} px-10  py-8`}>
      <audio
        ref={audioRoundRef}
        src="/assets/muayThai.mp3"
        loop
        muted={!isSoundActive}
      />
      <audio ref={audioBeepRef} src="/assets/beep.mp3" muted={!isSoundActive} />
      <audio
        ref={audioBell3Ref}
        src="/assets/bell3.mp3"
        muted={!isSoundActive}
      />

      <div className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow">
        <h3 className="mt-6 text-sm font-medium text-gray-900">{`Round ${completedRounds}/${roundNumber}`}</h3>
        <div className="flex flex-1 flex-col p-6 text-indigo-600 ">
          {isFinished ? (
            <span className="text-5xl">Vel gert!</span>
          ) : (
            <span className="text-7xl">
              {`${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`}
            </span>
          )}

          <h3 className="mt-6 text-sm font-medium text-gray-900">{phase}</h3>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1">
              <button
                onClick={handleTogglePause}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border py-4 text-xs font-semibold text-gray-900"
              >
                {!isRunning ? (
                  <PlayIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <PauseIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                )}
                {!isRunning ? "Play" : "Pause"}
              </button>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <button
                onClick={handleReset}
                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border py-4 text-xs font-semibold text-gray-900"
              >
                <StopIcon
                  className="h-4 w-4 text-gray-400"
                  aria-hidden="true"
                />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
