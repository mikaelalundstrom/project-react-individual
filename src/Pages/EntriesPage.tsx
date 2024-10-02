import EntriesGrid from "../Components/EntriesGrid";
import Header from "../Components/Header";

function EntriesPage() {
  return (
    <>
      <Header bgColor="var(--color-orange)" color="var(--color-white)" />
      <main className="entries-page">
        <div className="page-container">
          <article className="entries">
            <h1 className="heading">Journal Entries</h1>
            <EntriesGrid />
          </article>
        </div>
      </main>
    </>
  );
}

export default EntriesPage;
