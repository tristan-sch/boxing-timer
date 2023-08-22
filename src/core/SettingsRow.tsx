import Button from "./Button";
import InputField from "./InputField";
import { useNewValue } from "hooks/useNewValue";

type Props = {
  label: string;
  interval: number;
  initialValue: number;
  isFormattedTime?: boolean;
  type?: string;
  onChangeValue: (value: number) => void;
};

export default function SettingsRow({
  label,
  interval,
  initialValue,
  type,
  onChangeValue,
  isFormattedTime,
}: Props) {
  const isTimeType = type === "time";
  const { newValue, setNewValue } = useNewValue(initialValue, isTimeType);

  return (
    <tr>
      <td className="whitespace-nowrap py-4 pr-2 text-xs font-medium text-gray-100">
        <Button
          id="decreaseRound"
          type="decrease"
          onAction={(e) => {
            onChangeValue((newValue as number) > interval ? e - interval : e);
            setNewValue((newValue as number) > interval ? e - interval : e);
          }}
          value={newValue as number}
        />
      </td>
      <td className="whitespace-nowrap py-2 pr-3 text-xs font-medium text-gray-100">
        <Button
          id="increaseRound"
          type="increase"
          onAction={(e) => {
            onChangeValue(e + interval);
            setNewValue(e + interval);
          }}
          value={newValue as number}
        />
      </td>
      <td className="whitespace-nowrap py-4 pl-2 pr-4 text-center text-base font-medium text-gray-800">
        {label}
      </td>
      <td className="whitespace-nowrap py-4 text-base font-bold text-indigo-600 dark:text-gray-100">
        <label htmlFor={label} className="sr-only">
          {label}
        </label>
        <InputField
          isTimeType={isTimeType}
          initialValue={newValue}
          onChangeValue={onChangeValue}
          isFormattedTime={isFormattedTime}
        />
      </td>
    </tr>
  );
}
