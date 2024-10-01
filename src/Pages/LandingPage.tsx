import Header from "../Components/Header";

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
        <article className="recent-entries"></article>
        <article className="write-new"></article>
      </main>
    </>
  );
}

export default LandingPage;
