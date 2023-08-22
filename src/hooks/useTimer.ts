"use client";

import { useState, useEffect, useRef } from "react";
import { toggleAudioPlayback } from "utils/helpers";

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

  // audioRoundRef.current && isRunning && isRoundPhase
  //   ? audioRoundRef?.current.play()
  //   : audioRoundRef?.current?.pause();

  // audioBeepRef.current && isRunning && !isRoundPhase && !isRestPhase
  //   ? audioBeepRef?.current.play()
  //   : audioBeepRef?.current?.pause();

  //To sound the bell 10 seconds before the end of the round
  // if (
  //   audioBell3Ref.current &&
  //   isRunning &&
  //   isRoundPhase &&
  //   timeRemaining === 11
  // ) {
  //   audioBell3Ref?.current.play();
  // }

  //To sound the bell at the beginning and the end of the rounds
  if (audioBell3Ref.current && timeRemaining === 1) {
    audioBell3Ref?.current.play();
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (completedRounds < roundNumber + 1) {
      if (isRunning) {
        interval = setInterval(() => {
          setTimeRemaining((prevTimer) => prevTimer - 1);
        }, 1000);
      } else {
        clearInterval(interval);
      }

      if (isRunning && timeRemaining === 0) {
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
      }

      if (isRunning && timeRemaining === 0 && completedRounds === roundNumber) {
        setIsRunning(false);
        setIsRoundPhase(false);
        setIsRestPhase(false);
        setTimeRemaining(0);
      }
    }

    //To play the beep at the start
    toggleAudioPlayback(
      audioBeepRef.current,
      isRunning && !isRoundPhase && !isRestPhase
    );
    //To play the music during the round
    toggleAudioPlayback(audioRoundRef.current, isRunning && isRoundPhase);
    //To sound the bell at the beginning and the end of the rounds
    toggleAudioPlayback(audioBell3Ref.current, timeRemaining === 1);
    //To sound the bell 10 seconds before the end of the round
    toggleAudioPlayback(
      audioBell3Ref.current,
      isRunning && isRoundPhase && timeRemaining === 11
    );

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
  };
}
