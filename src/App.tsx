import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";
import { IEntry } from "./interfaces";
import { EntriesContext } from "./Context";

function App() {
  const [entries, setEntries] = useState<IEntry[]>([]);

  const getEntries = async () => {
    try {
      const response = await fetch(
        "https://mikaelalundstrom.github.io/json-data/travel-journal/entries.json"
      );
      const data = await response.json();
      console.log(data.entries);
      setEntries(data.entries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <>
      <EntriesContext.Provider value={{ entries, setEntries }}>
        <Outlet />
      </EntriesContext.Provider>
      <Footer />
    </>
  );
}

export default App;
