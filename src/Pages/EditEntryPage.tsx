import { useParams } from "react-router-dom";
import Form from "../Components/Form";
import Header from "../Components/Header";
import { useContext, useEffect, useState } from "react";
import { EntriesContext } from "../Context";
import { IEntry } from "../Interfaces";

function EditEntryPage() {
  const { id } = useParams();
  const { entries } = useContext(EntriesContext);
  const [entry, setEntry] = useState<IEntry>();

  useEffect(() => {
    const currentEntry = entries?.find((entry) => entry.id === parseInt(id!));
    setEntry(currentEntry);
  }, [entries]);

  return (
    <>
      <Header bgColor="var(--color-green-light)" color="var(--color-green)" />
      <main className="new-entry">
        <div className="page-container small">
          <h1 className="heading">Edit Entry</h1>
          <Form entry={entry} />
        </div>
      </main>
    </>
  );
}

export default EditEntryPage;
