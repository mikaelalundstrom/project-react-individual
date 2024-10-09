import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";
import { IEntry } from "./Interfaces";
import { EntriesContext, ShowMsgContext } from "./Context";
import ScrollTopSwitchPage from "./Components/ScrollTopSwitchPage";
import { sortEntriesByDate } from "./helpers";

function App() {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [showMsg, setShowMsg] = useState<boolean>(false);

  const getEntries = async () => {
    let entries = getEntriesFromLS();
    if (entries.length === 0) {
      entries = await getEntriesFromAPI();
    }
    console.log(entries);
    setEntries(sortEntriesByDate(entries));
  };

  const getEntriesFromAPI = async () => {
    try {
      const response = await fetch(
        "https://mikaelalundstrom.github.io/json-data/travel-journal/entries.json"
      );
      const data = await response.json();
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

  useEffect(() => {
    getEntries();
  }, []);

  useEffect(() => {
    setEntriesInLS(entries);
    console.log("Updated LS");
  }, [entries]);

  return (
    <>
      <ScrollTopSwitchPage />
      <EntriesContext.Provider value={{ entries, setEntries }}>
        <ShowMsgContext.Provider value={{ showMsg, setShowMsg }}>
          <Outlet />
        </ShowMsgContext.Provider>
        <Footer />
      </EntriesContext.Provider>
    </>
  );
}

export default App;
