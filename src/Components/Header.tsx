import { Link } from "react-router-dom";

interface IProps {
  bgColor?: string;
  color?: string;
}

function Header({ bgColor, color }: IProps) {
  return (
    <header style={{ color: color, backgroundColor: bgColor }}>
      <div className="page-container">
        <div className="header">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/entries">Entries</Link>
            <Link to="/new">
              <span className="new" style={{ color: bgColor, backgroundColor: color }}>
                New <i className="ph ph-plus"></i>
              </span>
            </Link>
          </nav>
          <figure className="icon">
            <i className="ph ph-map-pin"></i>
          </figure>
        </div>
      </div>
    </header>
  );
}

export default Header;
