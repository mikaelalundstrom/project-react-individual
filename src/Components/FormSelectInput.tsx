import { useEffect, useState } from "react";

interface IProps {
  label: string;
  id: string;
  placeholder: string;
  options: string[];
  defaultValue?: string;
}

function FormSelectInput({ label, id, placeholder, options, defaultValue }: IProps) {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);
  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  return (
    <div className="select">
      <label htmlFor={id} className="heading-italic">
        {label}:
      </label>
      <select id={id} name={id} value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value="0">--{placeholder}--</option>
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
