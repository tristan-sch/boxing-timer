"use client";
import { useState, useEffect, useRef } from "react";
import { pauseAudio, playAudio } from "utils/helpers";

export default function useTimer(
  startTime: number,
  roundNumber: number,
  roundTime: number,
  restTime: number
) {
  const [timeRemaining, setTimeRemaining] = useState(startTime); // Initial time in seconds
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isRoundPhase, setIsRoundPhase] = useState<boolean>(false);
  const [isRestPhase, setIsRestPhase] = useState<boolean>(false);
  const [completedRounds, setCompletedRounds] = useState<number>(0);

  useEffect(() => {
    if (startTime > 0) {
      setTimeRemaining(startTime);
    }
  }, [startTime]);

  const audioRoundRef = useRef<HTMLAudioElement | null>(null);
  const audioBeepRef = useRef<HTMLAudioElement | null>(null);
  const audioBell3Ref = useRef<HTMLAudioElement | null>(null);
  // const audioCountDown103Ref = useRef<HTMLAudioElement | null>(null);
  const tripleClapRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (completedRounds < roundNumber + 1) {
      if (isRunning) {
        interval = setInterval(() => {
          setTimeRemaining((prevTimer) => prevTimer - 1);
        }, 1000);

        /* ***SOUND*** */
        if (isRoundPhase) {
          /* To play the muay thai music during the round */
          // playAudio(audioRoundRef);
          if (timeRemaining === 10) {
            /* To sound the bell 10 seconds before the end of the round */
            // playAudio(audioBell3Ref);
            // playAudio(audioCountDown103Ref);
            playAudio(tripleClapRef);
          }
        }
        if (isRestPhase) {
          /* To stop the muay thai music during the rest time */
          // pauseAudio(audioRoundRef);
          if (timeRemaining < 5) {
            /* To play the beep before the round begins */
            playAudio(audioBeepRef);
          }
        }
        if (!isRoundPhase && !isRestPhase) {
          /* To play the beep before the round begins */
          playAudio(audioBeepRef);
        }
        if (timeRemaining === 0) {
          /* To sound the bell at the beginning and the end of the rounds */
          playAudio(audioBell3Ref);
        }

        /* ***TIME*** */
        if (timeRemaining === 0) {
          /* To sound the bell 10 seconds before the end of the round */
          if (isRoundPhase) {
            setIsRoundPhase(false);
            setIsRestPhase(true);
            setTimeRemaining(restTime);
          } else {
            setIsRoundPhase(true);
            setIsRestPhase(false);
            setTimeRemaining(roundTime);
            setCompletedRounds((prevRounds) => prevRounds + 1);
          }
          if (completedRounds === roundNumber) {
            setIsRunning(false);
            setIsRoundPhase(false);
            setIsRestPhase(false);
            setTimeRemaining(0);
            // pauseAudio(audioRoundRef);
          }
        }
      } else {
        clearInterval(interval);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    timeRemaining,
    isRunning,
    roundNumber,
    isRoundPhase,
    roundTime,
    isRestPhase,
    restTime,
    completedRounds,
  ]);

  const handleTogglePause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTimeRemaining(startTime); // Reset to the initial time
    setIsRunning(false);
    setIsRoundPhase(false);
    setIsRestPhase(false);
    setCompletedRounds(0);
    // pauseAudio(audioCountDown103Ref);
  };

  return {
    minutes: Math.floor(timeRemaining / 60),
    seconds: timeRemaining % 60,
    handleTogglePause,
    handleReset,
    isRunning,
    isRoundPhase,
    isRestPhase,
    completedRounds,
    roundNumber,
    audioRoundRef,
    audioBeepRef,
    audioBell3Ref,
    // audioCountDown103Ref,
    tripleClapRef,
  };
}
