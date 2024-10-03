import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";
import { IEntry } from "./Interfaces";
import { EntriesContext } from "./Context";
import ScrollTopSwitchPage from "./Components/ScrollTopSwitchPage";

function App() {
  const [entries, setEntries] = useState<IEntry[]>([]);

  const getEntries = async () => {
    let entries = getEntriesFromLS();
    if (entries.length === 0) {
      entries = await getEntriesFromAPI();
    }
    setEntries(sortEntriesByDate(entries));
  };

  const getEntriesFromAPI = async () => {
    try {
      const response = await fetch(
        "https://mikaelalundstrom.github.io/json-data/travel-journal/entries.json"
      );
      const data = await response.json();
      console.log(data.entries);
      return data.entries;
    } catch (error) {
      console.log(error);
    }
  };

  const getEntriesFromLS = () => {
    return JSON.parse(localStorage.getItem("TJ_entries")!) || [];
  };

  const setEntriesInLS = (entries: IEntry[]) => {
    localStorage.setItem("TJ_entries", JSON.stringify(entries));
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

  useEffect(() => {
    setEntriesInLS(entries);
  }, [entries]);

  return (
    <>
      <ScrollTopSwitchPage />
      <EntriesContext.Provider value={{ entries, setEntries }}>
        <Outlet />
        <Footer />
      </EntriesContext.Provider>
    </>
  );
}

export default App;
