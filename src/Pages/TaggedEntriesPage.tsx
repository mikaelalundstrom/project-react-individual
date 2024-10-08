import { useParams } from "react-router-dom";
import EntriesGrid from "../Components/EntriesGrid";
import Header from "../Components/Header";
import TagSection from "../Components/TagSection";
import { useContext } from "react";
import { EntriesContext } from "../Context";

function TaggedEntriesPage() {
  const { tag } = useParams();
  const { entries } = useContext(EntriesContext);

  const filteredEntries = entries!.filter((entry) => {
    if (
      entry.location.continent === tag ||
      entry.location.country === tag ||
      entry.location.type === tag
    ) {
      return entry;
    }
  });

  return (
    <>
      <Header bgColor="var(--color-orange)" color="var(--color-white)" />
      <main className="entries-page">
        <section>
          <div className="page-container">
            <article className="entries">
              <h1 className="heading">Journal Entries</h1>
              <p className="article">Entries tagged #{tag}.</p>
              <EntriesGrid filteredEntries={filteredEntries} />
            </article>
          </div>
        </section>
        <TagSection />
      </main>
    </>
  );
}

export default TaggedEntriesPage;
