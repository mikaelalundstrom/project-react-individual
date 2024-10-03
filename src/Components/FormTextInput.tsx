interface IProps {
  label: string;
  id: string;
  required: boolean;
  placeholder: string;
  className?: string;
}

function FormTextInput({ label, id, required, className, placeholder }: IProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="heading-italic">
        {label}:{required ? <span>*</span> : null}
      </label>
      <input type="text" id={id} name={id} required={required} placeholder={placeholder} />
    </div>
  );
}

export default FormTextInput;
