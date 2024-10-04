type ButtonType = "submit" | "reset" | "button";

interface IProps {
  label: string;
  bgColor?: string;
  color?: string;
  onClick?: () => void;
  className?: string;
  type?: ButtonType;
}

function Button({ label, bgColor, color, onClick, className, type }: IProps) {
  return (
    <button
      className={`button ${className}`}
      style={{ color: color, backgroundColor: bgColor }}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}

export default Button;
