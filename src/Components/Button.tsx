interface IProps {
  label: string;
  bgColor?: string;
  color?: string;
  onClick?: () => void;
  type?: string;
}

function Button({ label, bgColor, color, onClick, type }: IProps) {
  return (
    <button
      className={`button ${type}`}
      style={{ color: color, backgroundColor: bgColor }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
