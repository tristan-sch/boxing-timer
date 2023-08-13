import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Button from "./Button";
import { formatTime } from "utils/helpers";

type Props = {
  label: string;
  value: number;
  isFormattedTime?: boolean;
  onDecreaseValue: (value: number) => void;
  onIncreaseValue: (value: number) => void;
};

export default function SettingsRow({
  label,
  value,
  isFormattedTime,
  onDecreaseValue,
  onIncreaseValue,
}: Props) {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-2 pr-4 text-sm font-medium text-gray-800">
        {label}
      </td>
      <td className="whitespace-nowrap py-2 pr-2 text-xs font-medium text-gray-100">
        <Button
          id="decreaseRound"
          type="Decrease"
          onAction={onDecreaseValue}
          value={value}
        />
      </td>
      <td className="whitespace-nowrap py-2 pr-3 text-xs font-medium text-gray-100">
        <Button
          id="increaseRound"
          type="Increase"
          onAction={onIncreaseValue}
          value={value}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-center text-sm font-bold text-indigo-600">
        {isFormattedTime ? formatTime(value) : value}
      </td>
      <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-xs font-medium">
        <button
          type="button"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Turn off sound</span>
          <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}
