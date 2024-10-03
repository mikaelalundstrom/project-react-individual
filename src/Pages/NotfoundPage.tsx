import { Link } from "react-router-dom";
import Header from "../Components/Header";

function NotfoundPage() {
  return (
    <>
      <Header bgColor="var(--color-yellow)" color="var(--color-black)" />
      <main className="notfound">
        <div className="page-container">
          <div className="content">
            <Link to="/">
              <article className="entry-card notfound">
                <div className="left-side">
                  <h3 className="heading-card">404 - Page Not Found</h3>
                </div>

                <div className="divider"></div>
                <div className="right-side">
                  <div className="details">
                    <p>404</p>
                    <figure className="icon">
                      <i className="ph ph-x"></i>
                    </figure>
                  </div>
                  <div className="desc">
                    <h4 className="cursive-card">
                      The page you're <br /> looking for can't be found.
                    </h4>
                    <p className="small">
                      The page you're looking for can't be found. Click on this card to return to
                      the landing page.
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default NotfoundPage;
