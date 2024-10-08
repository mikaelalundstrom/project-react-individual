import { Link } from "react-router-dom";
import { matchingStamp } from "../helpers";

interface IProps {
  locationType: string;
}

function TagCard({ locationType }: IProps) {
  return (
    <Link to={`/entries/tagged/${encodeURIComponent(locationType)}`}>
      <div className="tag-card">
        <i className={`ph ph-${matchingStamp(locationType)} `}></i>
        <p>{locationType}</p>
      </div>
    </Link>
  );
}

export default TagCard;
