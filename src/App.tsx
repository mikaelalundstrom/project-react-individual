import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";
import { IEntry } from "./Interfaces";
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
      const sortedEntries = sortEntriesByDate(data.entries);

      setEntries(sortedEntries);
    } catch (error) {
      console.log(error);
    }
  };

  const sortEntriesByDate = (entries: IEntry[]) => {
    // sorts by newest first
    const sortedEntries = entries.sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;
      if (dateA > dateB) {
        return -1;
      }
      if (dateA < dateB) {
        return 1;
      }
      return 0;
    });
    return sortedEntries;
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
