import Form from "../Components/Form";
import Header from "../Components/Header";

function NewEntryPage() {
  return (
    <>
      <Header bgColor="var(--color-green-light)" color="var(--color-green)" />
      <main className="new-entry">
        <div className="page-container small">
          <h1 className="heading">New Entry</h1>
          <Form />
        </div>
      </main>
    </>
  );
}

export default NewEntryPage;
