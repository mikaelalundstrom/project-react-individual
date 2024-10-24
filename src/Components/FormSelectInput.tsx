import { useEffect, useState } from "react";

interface IProps {
  label: string;
  id: string;
  placeholder: string;
  options: string[];
  defaultValue?: string;
  setState?: (value: string) => void;
  disabled?: boolean;
}

function FormSelectInput({
  label,
  id,
  placeholder,
  options,
  defaultValue,
  setState,
  disabled,
}: IProps) {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);
  // to make sure the default value updates properly while still being able to pick a new value
  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  return (
    <div className="select">
      <label htmlFor={id} className="heading-italic">
        {label}:
      </label>
      <select
        id={id}
        name={id}
        disabled={disabled}
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          if (setState) {
            setState(e.target.value);
          }
        }}
      >
        <option value="">--{placeholder}--</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelectInput;
