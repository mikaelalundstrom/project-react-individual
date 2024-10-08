import { Link } from "react-router-dom";

interface IProps {
  tag: string;
  className?: string;
}

function Tag({ tag, className }: IProps) {
  return (
    <Link className={className} to={`/entries/tagged/${encodeURIComponent(tag)}`}>
      {tag}
    </Link>
  );
}

export default Tag;
