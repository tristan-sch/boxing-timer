"use client";
import SettingsRow from "core/SettingsRow";

type Props = {
  roundNumber: number;
  onDecreaseRound: (value: number) => void;
  onIncreaseRound: (value: number) => void;
  roundTime: number;
  onDecreaseRoundTime: (value: number) => void;
  onIncreaseRoundTime: (value: number) => void;
  restTime: number;
  onDecreaseRestTime: (value: number) => void;
  onIncreaseRestTime: (value: number) => void;
};

export default function Settings({
  roundNumber,
  onDecreaseRound,
  onIncreaseRound,
  roundTime,
  onDecreaseRoundTime,
  onIncreaseRoundTime,
  restTime,
  onDecreaseRestTime,
  onIncreaseRestTime,
}: Props) {
  return (
    <div className="px-10 py-4">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <tbody className="divide-y divide-gray-200">
                <SettingsRow
                  label="Rounds"
                  value={roundNumber}
                  onDecreaseValue={onDecreaseRound}
                  onIncreaseValue={onIncreaseRound}
                />
                <SettingsRow
                  label="Time"
                  isFormattedTime
                  value={roundTime}
                  onDecreaseValue={onDecreaseRoundTime}
                  onIncreaseValue={onIncreaseRoundTime}
                />
                <SettingsRow
                  label="Rest"
                  isFormattedTime
                  value={restTime}
                  onDecreaseValue={onDecreaseRestTime}
                  onIncreaseValue={onIncreaseRestTime}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
