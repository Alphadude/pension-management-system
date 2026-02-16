import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";

type FormWithSetFieldValue = {
  setFieldValue: (field: string, value: unknown) => void;
};

export const useNumberInput = (
  form: FormWithSetFieldValue,
  fieldName: string,
  decimals = 2,
  defaultValue?: number,
) => {
  const [display, setDisplay] = useState(defaultValue?.toString() ?? "");

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/,/g, "");

      // When decimals=0, only allow whole numbers
      if (decimals === 0) {
        if (!/^\d*$/.test(raw)) return; // only digits, no dot allowed
        const withCommas = raw.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setDisplay(withCommas);
        // Set as string, not number
        form.setFieldValue(fieldName, raw || "0");
        return;
      }

      // Original decimal handling
      if (!/^\d*\.?\d*$/.test(raw)) return; // only digits + dot
      const [int = "", originalDec] = raw.split(".");
      let dec = originalDec;
      if (dec !== undefined) {
        dec = dec.slice(0, decimals); // only allowed decimal places
      }
      const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const formatted = dec !== undefined ? `${withCommas}.${dec}` : withCommas;
      setDisplay(formatted);
      // Set as string, not number
      form.setFieldValue(fieldName, raw || "0");
    },
    [fieldName, form, decimals],
  );

  const onBlur = useCallback(() => {
    // ensure form value and display are in sync
    const raw = String(display).replace(/,/g, "");
    form.setFieldValue(fieldName, raw || "0");
  }, [display, fieldName, form]);

  const reset = useCallback(() => {
    setDisplay(defaultValue?.toString() ?? "");
  }, [defaultValue]);
  return { display, onChange, onBlur, reset };
};
