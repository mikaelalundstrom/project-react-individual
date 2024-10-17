import { Link } from "react-router-dom";

interface IProps {
  obj: object;
}

function Graph({ obj }: IProps) {
  return (
    <div className="graph">
      {Object.keys(obj).map((key, i) => (
        <Link key={i} to={`/entries/tagged/${encodeURIComponent(key)}`} className="graph-item">
          <div
            className="bar"
            style={{
              height: `${obj[key as keyof typeof obj] * 2}rem`,
            }}
          >
            <p>{obj[key as keyof typeof obj]}</p>
          </div>
          <p className="label">{key}</p>
        </Link>
      ))}
    </div>
  );
}

export default Graph;
