interface IProps {
  label: string;
  id: string;
  placeholder: string;
  options: string[];
  className?: string;
}

function FormSelectInput({ label, id, className, placeholder, options }: IProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="heading-italic">
        {label}:
      </label>
      <select id={id} name={id}>
        <option value="0">--{placeholder}--</option>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default FormSelectInput;
