"use client";
import SettingsRow from "core/SettingsRow";

type Props = {
  roundNumber: number;
  onChangeRound: (value: number) => void;
  roundTime: number;
  onChangeRoundTime: (value: number) => void;
  restTime: number;
  onChangeRestTime: (value: number) => void;
};

export default function Settings({
  roundNumber,
  onChangeRound,
  roundTime,
  onChangeRoundTime,
  restTime,
  onChangeRestTime,
}: Props) {
  return (
    <div className="px-10 py-4">
      <div className="flow-root">
        {/* <div className="overflow-x-auto"> */}
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <tbody className="divide-y divide-gray-200">
              <SettingsRow
                label="Rounds"
                interval={1}
                value={roundNumber}
                onChangeValue={onChangeRound}
              />
              <SettingsRow
                label="Time"
                type="time"
                interval={30}
                isFormattedTime
                value={roundTime}
                onChangeValue={onChangeRoundTime}
              />
              <SettingsRow
                label="Rest"
                type="time"
                interval={30}
                isFormattedTime
                value={restTime}
                onChangeValue={onChangeRestTime}
              />
            </tbody>
          </table>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
