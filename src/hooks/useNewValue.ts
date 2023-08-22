import { useEffect, useState } from "react";
import { parseTimeInput } from "utils/helpers";

export function useNewValue(value: number, isTimeType: boolean) {
  const [newValue, setNewValue] = useState<number>(
    isTimeType ? parseTimeInput(value) : value
  );

  useEffect(() => {
    setNewValue(isTimeType ? parseTimeInput(value) : value);
  }, [value, isTimeType]);

  return { newValue, setNewValue };
}
