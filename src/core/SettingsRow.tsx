import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Button from "./Button";
import { formatTime, parseTimeInput } from "utils/helpers";
import { useState } from "react";

type Props = {
  label: string;
  interval: number;
  value: number;
  isFormattedTime?: boolean;
  type?: string;
  onChangeValue: (value: number) => void;
};

export default function SettingsRow({
  label,
  interval,
  value,
  isFormattedTime,
  type,
  onChangeValue,
}: Props) {
  const isTimeType = type === "time";
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<number | string>(
    isTimeType ? parseTimeInput(value.toString(), value) : value
  );

  const formattedTime = isFormattedTime
    ? formatTime(typeof newValue === "number" ? newValue : value).toString()
    : newValue.toString();

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pr-2 text-xs font-medium text-gray-100">
        <Button
          id="decreaseRound"
          type="Decrease"
          onAction={(e) => {
            onChangeValue(value > interval ? e - interval : e);
            setNewValue(value > interval ? e - interval : e);
          }}
          value={newValue}
        />
      </td>
      <td className="whitespace-nowrap py-2 pr-3 text-xs font-medium text-gray-100">
        <Button
          id="increaseRound"
          type="Increase"
          onAction={(e) => {
            onChangeValue(e + interval);
            setNewValue(e + interval);
          }}
          value={newValue}
        />
      </td>
      <td className="whitespace-nowrap py-4 pl-2 pr-4 text-center text-base font-medium text-gray-800">
        {label}
      </td>
      <td className="whitespace-nowrap py-4 text-base font-bold text-indigo-600 dark:text-gray-100">
        <label htmlFor={label} className="sr-only">
          {label}
        </label>
        <input
          type={isTimeType ? "time" : "text"}
          pattern={isTimeType ? "d{2}:d{2}" : "d*"}
          maxLength={2}
          id={label}
          onFocus={() => {
            setIsFocused(true);
            setNewValue("");
          }}
          onBlur={() => {
            setIsFocused(false);
            setNewValue(
              isTimeType ? parseTimeInput(value.toString(), value) : value
            );
          }}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (!isNaN(parseInt(inputValue))) {
              onChangeValue(
                isTimeType
                  ? parseTimeInput(inputValue, value)
                  : parseInt(inputValue)
              );
              setNewValue(e.target.value);
            }
          }}
          className="block w-20 whitespace-nowrap rounded-md border-0 py-1.5 text-center text-base font-bold text-indigo-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-indigo-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-gray-100 placeholder:dark:text-gray-100"
          placeholder={!isFocused ? formattedTime : ""}
          value={formattedTime}
        />
      </td>
    </tr>
  );
}
