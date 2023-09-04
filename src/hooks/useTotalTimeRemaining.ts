"use client";
import { useState, useEffect } from "react";

export default function useTotalTimeRemaining(
  totalTime: number,
  hasProgressBarStarted: boolean
) {
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(totalTime); // Initial time in seconds

  useEffect(() => {
    if (totalTime > 0) {
      setTotalTimeRemaining(totalTime);
    }
  }, [totalTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (hasProgressBarStarted) {
      interval = setInterval(() => {
        setTotalTimeRemaining((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [totalTimeRemaining, hasProgressBarStarted]);

  return {
    totalTimeRemaining,
  };
}
