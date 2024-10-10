interface IProps {
  label: string;
  id: string;
  required?: boolean;
  defaultValue?: string;
}

function FormDateInput({ label, id, defaultValue, required }: IProps) {
  return (
    <div>
      <label htmlFor={id} className="heading-italic">
        {label}:{required ? <span>*</span> : null}
      </label>
      <input type="date" id={id} name={id} required={required} defaultValue={defaultValue} />
    </div>
  );
}

export default FormDateInput;
