import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";
import { IEntry, IProfile } from "./Interfaces";
import { EntriesContext, ProfileContext, ShowMsgContext } from "./Context";
import ScrollTopSwitchPage from "./Components/ScrollTopSwitchPage";
import { sortEntriesByDate } from "./helpers";

function App() {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [profile, setProfile] = useState<IProfile>({});
  const [showMsg, setShowMsg] = useState<boolean>(false);

  const getEntries = async () => {
    let entries = getEntriesFromLS();
    // Only fetch from API if LS is empty
    if (entries.length === 0) {
      entries = await getEntriesFromAPI();
    }
    console.log(entries);
    setEntries(sortEntriesByDate(entries));
  };

  /* Get entries from API */

  const getEntriesFromAPI = async () => {
    try {
      const response = await fetch(
        "https://mikaelalundstrom.github.io/json-data/travel-journal/entries.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong while fetching entries");
      }
      const data = await response.json();
      data.entries.map((entry: IEntry) => {
        entry.imgPosition = { x: "Center", y: "Bottom" };
      });
      return data.entries;
    } catch (error) {
      console.log(error);
    }
  };

  /* LocalStorage */

  const getEntriesFromLS = () => {
    return JSON.parse(localStorage.getItem("TJ_entries")!) || [];
  };
  const setEntriesInLS = () => {
    localStorage.setItem("TJ_entries", JSON.stringify(entries));
  };
  const getProfileFromLS = () => {
    const profile = JSON.parse(localStorage.getItem("TJ_profile")!) || {};
    setProfile(profile);
  };
  const setProfileInLS = () => {
    localStorage.setItem("TJ_profile", JSON.stringify(profile));
  };

  useEffect(() => {
    getEntries();
    getProfileFromLS();
  }, []);

  // Update LS when entries/profile states change
  useEffect(() => {
    setEntriesInLS();
  }, [entries]);
  useEffect(() => {
    setProfileInLS();
  }, [profile]);

  return (
    <>
      <ScrollTopSwitchPage />
      <EntriesContext.Provider value={{ entries, setEntries }}>
        <ProfileContext.Provider value={{ profile, setProfile }}>
          <ShowMsgContext.Provider value={{ showMsg, setShowMsg }}>
            <Outlet />
          </ShowMsgContext.Provider>
        </ProfileContext.Provider>
        <Footer />
      </EntriesContext.Provider>
    </>
  );
}

export default App;
