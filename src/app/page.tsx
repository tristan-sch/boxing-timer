"use client";
import { useState } from "react";
import Head from "next/head";
import Header from "components/Header";
import Settings from "components/Settings";
import Timer from "components/Timer";

export default function Home() {
  const [isSoundActive, setIsSoundActive] = useState(true);
  const handleSoundToggle = () => {
    setIsSoundActive(!isSoundActive);
  };

  const [startTime, setStartTime] = useState(5);

  const [roundNumber, setRoundNumber] = useState(3);
  const handleDecreaseRound = (newRoundNumber: number) => {
    if (newRoundNumber > 1) {
      setRoundNumber(newRoundNumber - 1);
    }
  };
  const handleIncreaseRound = (newRoundNumber: number) => {
    setRoundNumber(newRoundNumber + 1);
  };

  const [roundTime, setRoundTime] = useState(180);
  const handleDecreaseRoundTime = (newRoundTime: number) => {
    if (newRoundTime > 30) {
      setRoundTime(newRoundTime - 30);
    }
  };
  const handleIncreaseRoundTime = (newRoundTime: number) => {
    setRoundTime(newRoundTime + 30);
  };

  const [restTime, setRestTime] = useState(60);
  const handleDecreaseRestTime = (newRestTime: number) => {
    if (newRestTime > 30) {
      setRestTime(newRestTime - 30);
    }
  };
  const handleIncreaseRestTime = (newRestTime: number) => {
    setRestTime(newRestTime + 30);
  };

  return (
    <>
      <Head>
        <title>Boxing-timer</title>
        {/* <link rel="icon" href="/" /> */}
        <meta name="description" content="Timer app for boxing" />
      </Head>
      <Header
        isSoundActive={isSoundActive}
        onSoundIconClick={handleSoundToggle}
      />
      <main>
        <Timer
          startTime={startTime}
          roundNumber={roundNumber}
          roundTime={roundTime}
          restTime={restTime}
          isSoundActive={isSoundActive}
        />
        <Settings
          roundNumber={roundNumber}
          onDecreaseRound={handleDecreaseRound}
          onIncreaseRound={handleIncreaseRound}
          roundTime={roundTime}
          onDecreaseRoundTime={handleDecreaseRoundTime}
          onIncreaseRoundTime={handleIncreaseRoundTime}
          restTime={restTime}
          onDecreaseRestTime={handleDecreaseRestTime}
          onIncreaseRestTime={handleIncreaseRestTime}
        />
      </main>
    </>
  );
}
