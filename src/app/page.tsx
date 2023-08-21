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
  const handleChangeRound = (newRoundNumber: number) => {
    setRoundNumber(newRoundNumber);
  };

  const [roundTime, setRoundTime] = useState(180);
  const handleChangeRoundTime = (newRoundTime: number) => {
    setRoundTime(newRoundTime);
  };

  const [restTime, setRestTime] = useState(60);
  const handleChangeRestTime = (newRestTime: number) => {
    setRestTime(newRestTime);
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
          onChangeRound={handleChangeRound}
          roundTime={roundTime}
          onChangeRoundTime={handleChangeRoundTime}
          restTime={restTime}
          onChangeRestTime={handleChangeRestTime}
        />
      </main>
    </>
  );
}
