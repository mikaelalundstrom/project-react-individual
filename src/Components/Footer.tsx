import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="page-container">
        <div className="footer">
          <nav>
            <h4 className="heading-italic">Navigation</h4>
            <Link to="/">Home</Link>
            <Link to="/entries">Journal entries</Link>
            <Link to="/new">Write new</Link>
            <Link to="/profile">Profile & Statistics</Link>
          </nav>
          <figure className="stamp green">
            <i className="ph ph-mountains"></i>
          </figure>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
