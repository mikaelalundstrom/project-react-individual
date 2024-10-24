import { Link } from "react-router-dom";
import ScrollToTopBtn from "./ScrollToTopBtn";

// takes color props to be able to customize it as fit
interface IProps {
  bgColor: string;
  color: string;
}

function Header({ bgColor, color }: IProps) {
  return (
    <header style={{ color: color, backgroundColor: bgColor }}>
      <ScrollToTopBtn color={bgColor} bgColor={color} />
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
            <Link to="/profile">
              <i className="ph-bold ph-user"></i>
            </Link>
          </nav>
          <figure className="icon">
            <Link to="/">
              <i className="ph ph-map-pin"></i>
            </Link>
          </figure>
        </div>
      </div>
    </header>
  );
}

export default Header;
