import { useNewValue } from "hooks/useNewValue";
import { formatTime, timeToSeconds } from "utils/helpers";

type Props = {
  isTimeType: boolean;
  initialValue: number;
  onChangeValue: (value: number) => void;
  isFormattedTime?: boolean;
};

export default function InputField({
  isTimeType,
  initialValue,
  onChangeValue,
  isFormattedTime,
}: Props) {
  const { newValue, setNewValue } = useNewValue(initialValue, isTimeType);
  const formattedValue = isFormattedTime ? formatTime(newValue) : newValue;

  return (
    <input
      type={isTimeType ? "time" : "text"}
      pattern={isTimeType ? "HH:mm" : "d*"}
      maxLength={isTimeType ? undefined : 2}
      onFocus={() => {
        setNewValue(isFormattedTime ? initialValue : 0);
      }}
      onBlur={() => {
        setNewValue(initialValue);
      }}
      onChange={(e) => {
        //For time value HH:mm
        if (isTimeType) {
          const inputValueTime = timeToSeconds(e.target.value);
          if (!isNaN(inputValueTime)) {
            onChangeValue(inputValueTime);
            setNewValue(inputValueTime);
          }
        }
        //For number of rounds
        else {
          const inputValueUnit = parseInt(e.target.value);
          if (!isNaN(inputValueUnit)) {
            onChangeValue(inputValueUnit);
            setNewValue(inputValueUnit);
          }
        }
      }}
      // className="block w-20 whitespace-nowrap rounded-md border-0 py-1.5 text-center text-base font-bold text-indigo-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-indigo-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:text-gray-100 placeholder:dark:text-gray-100"
      className="block w-20 whitespace-nowrap rounded-md border-0 py-1.5 text-center text-base font-bold text-indigo-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-indigo-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
      value={formattedValue}
    />
  );
}
