import { Link } from "react-router-dom";
import { IEntry } from "../Interfaces";

interface IProps {
  entry: IEntry;
}

function EntryCard({ entry }: IProps) {
  return (
    <>
      <Link to={`/entry/${entry.id}`}>
        <article className="entry-card">
          <div className="left-side">
            <h3 className="heading-card">{entry.title}</h3>
          </div>

          <div className="divider"></div>
          <div className="right-side">
            <div className="details">
              <p>
                {entry.date.substring(0, 4)}/{entry.date.substring(5, 7)}
              </p>
              <figure className="icon">
                <i className="ph ph-arrow-up-right"></i>
              </figure>
            </div>
            <div className="desc">
              <h4 className="cursive-card">
                {entry.location.location}, <br /> {entry.location.country}
              </h4>
              <p className="small">{entry.description}</p>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
}

export default EntryCard;
