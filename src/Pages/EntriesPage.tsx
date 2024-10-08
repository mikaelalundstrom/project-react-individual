import { useContext, useEffect } from "react";
import EntriesGrid from "../Components/EntriesGrid";
import FormMsg from "../Components/FormMsg";
import Header from "../Components/Header";
import { ShowMsgContext } from "../Context";
import TagSection from "../Components/TagSection";

function EntriesPage() {
  const { setShowMsg } = useContext(ShowMsgContext);

  useEffect(() => {
    return () => {
      setShowMsg!(false);
    };
  }, []);

  return (
    <>
      <Header bgColor="var(--color-orange)" color="var(--color-white)" />
      <main className="entries-page">
        <section className="entries-section">
          <div className="page-container">
            <article className="entries">
              <h1 className="heading">Journal Entries</h1>
              <EntriesGrid />
            </article>
            <FormMsg message="Entry has been deleted." />
          </div>
        </section>
        <TagSection />
      </main>
    </>
  );
}

export default EntriesPage;
