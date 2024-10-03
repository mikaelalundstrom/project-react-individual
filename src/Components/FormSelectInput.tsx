interface IProps {
  label: string;
  id: string;
  placeholder: string;
  options: string[];
}

function FormSelectInput({ label, id, placeholder, options }: IProps) {
  return (
    <div className="select">
      <label htmlFor={id} className="heading-italic">
        {label}:
      </label>
      <select id={id} name={id}>
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
