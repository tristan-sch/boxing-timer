"use client";
import { useEffect, useState } from "react";
import { PlayIcon, StopIcon, PauseIcon } from "@heroicons/react/20/solid";
import useTimer from "../hooks/useTimer";
import useTotalTimeRemaining from "hooks/useTotalTimeRemaining";
import { calculateRemainingPercentage, formatTime } from "utils/helpers";

type Props = {
  startTime: number;
  roundNumber: number;
  roundTime: number;
  restTime: number;
  isSoundActive: boolean;
  isSettingsVisible: boolean;
  onIsSettingsVisible: (isProgressBarRunning: boolean) => void;
};

export default function Timer({
  startTime,
  roundNumber,
  roundTime,
  restTime,
  isSoundActive,
  isSettingsVisible,
  onIsSettingsVisible,
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
    // audioCountDown103Ref,
    tripleClapRef,
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
    bgColor = "bg-green-400";
  } else if (isFinished) {
    phase = "BÚINN";
    bgColor = "bg-yellow-400";
  } else {
    phase = "Start in";
    bgColor = "bg-gray-400";
  }

  // Progress bar for the total of the rounds + rest phases
  const totalTime = roundTime * roundNumber + restTime * (roundNumber - 1);
  const isProgressBarRunning =
    (isRunning && isRoundPhase) || (isRunning && isRestPhase);
  const { totalTimeRemaining } = useTotalTimeRemaining(
    totalTime,
    isProgressBarRunning
  );
  const roundPercentage = calculateRemainingPercentage(
    totalTimeRemaining,
    totalTime
  );

  const [hasBeenReset, setHasBeenReset] = useState<boolean>(false);

  useEffect(() => {
    if (
      // totalTime === totalTimeRemaining ||
      totalTimeRemaining === 0 ||
      hasBeenReset
    ) {
      onIsSettingsVisible(true);
    } else if (isRoundPhase || isRestPhase) {
      onIsSettingsVisible(false);
    }
  }, [
    totalTime,
    totalTimeRemaining,
    onIsSettingsVisible,
    hasBeenReset,
    isRoundPhase,
    isRestPhase,
  ]);

  return (
    <>
      <div
        className={`${
          isRoundPhase || isRestPhase ? `h-screen w-screen bg-gray-400` : ""
        }`}
      >
        <div
          className={`timer-progress transition-width h-0 w-full ${bgColor} duration-1000 ease-linear`}
          id="timer-progress"
          style={{
            height: `${isRoundPhase || isRestPhase ? roundPercentage : 0}%`,
          }}
        >
          <div className={`px-10 py-8`}>
            {/* TODO: refactor audio */}
            <audio
              ref={audioRoundRef}
              src="/assets/muayThai.mp3"
              loop
              muted={!isSoundActive}
            />
            <audio
              ref={audioBeepRef}
              src="/assets/beep.mp3"
              muted={!isSoundActive}
            />
            <audio
              ref={audioBell3Ref}
              src="/assets/bell3.mp3"
              muted={!isSoundActive}
            />
            {/* <audio
        ref={audioCountDown103Ref}
        src="/assets/countDown10.mp3"
        muted={!isSoundActive}
      /> */}
            <audio
              ref={tripleClapRef}
              src="/assets/tripleClap.mp3"
              muted={!isSoundActive}
            />

            <div className="flex flex-col justify-between">
              <div className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow">
                <h3 className="mt-6 text-sm font-medium text-gray-900">{`Round ${completedRounds}/${roundNumber}`}</h3>
                <div className="flex flex-1 flex-col p-6 text-indigo-600">
                  {isFinished ? (
                    <span className="text-5xl">Vel gert!</span>
                  ) : (
                    <span className="text-8xl">
                      {`${minutes.toString().padStart(2, "0")}:${seconds
                        .toString()
                        .padStart(2, "0")}`}
                    </span>
                  )}
                  <h3 className="mt-6 text-lg text-sm font-medium text-indigo-600">
                    Session: {formatTime(totalTimeRemaining)}
                  </h3>
                  <div className="flex flex-row justify-between text-sm font-medium text-gray-900">
                    <div className="flex flex-col text-gray-800">
                      <div>Round</div>
                      <div>{formatTime(roundTime)}</div>
                    </div>
                    <div className="flex flex-col text-gray-800">
                      <div>Rest</div>
                      <div>{formatTime(restTime)}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="flex w-0 flex-1">
                      <button
                        onClick={() =>
                          isFinished
                            ? (handleReset(),
                              handleTogglePause(),
                              setHasBeenReset(false))
                            : (handleTogglePause(), setHasBeenReset(false))
                        }
                        className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border py-4 text-xs font-semibold text-gray-900"
                      >
                        {!isRunning ? (
                          <PlayIcon
                            className="h-4 w-4 text-gray-400 dark:text-indigo-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <PauseIcon
                            className="h-4 w-4 text-gray-400 dark:text-indigo-400"
                            aria-hidden="true"
                          />
                        )}
                        {!isRunning ? "Play" : "Pause"}
                      </button>
                    </div>
                    <div className="-ml-px flex w-0 flex-1">
                      <button
                        onClick={() => (handleReset(), setHasBeenReset(true))}
                        className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border py-4 text-xs font-semibold text-gray-900"
                      >
                        <StopIcon
                          className="h-4 w-4 text-gray-400 dark:text-indigo-400"
                          aria-hidden="true"
                        />
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {!isSettingsVisible && (
                <div className="flex pt-16 text-center">
                  <div className="flex flex-1 flex-col p-6 text-indigo-600">
                    <span className="text-7xl">{phase}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
