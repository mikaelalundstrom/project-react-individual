import { Link } from "react-router-dom";
import EntriesGrid from "../Components/EntriesGrid";
import Header from "../Components/Header";
import Button from "../Components/Button";

function LandingPage() {
  return (
    <>
      <Header color="var(--color-yellow-light)" bgColor="var(--color-black)" />
      <main className="landing-page">
        <article className="hero">
          <div className="page-container">
            <section className="hero-figure">
              <h1 className="heading-huge">Travel Journal</h1>
              <h4 className="heading-italic">
                a place to remember
                <br /> all your wonderful travels
              </h4>
            </section>
          </div>
        </article>
        <article className="recent-entries">
          <div className="page-container">
            <div className="content">
              <figure className="stamp orange">
                <i className="ph ph-island"></i>
              </figure>
              <h2 className="heading">Recent Entries</h2>
              <EntriesGrid cardLimit={2} />
              <Link to="/entries">
                <Button label="All Entries" bgColor="var(--color-orange)" />
              </Link>
            </div>
          </div>
        </article>
        <article className="write-new">
          <div className="page-container">
            <div className="content">
              <h2 className="heading-huge">Document Your Journey</h2>
              <Link to="/new">
                <Button label="write a new entry" className="big"></Button>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}

export default LandingPage;
