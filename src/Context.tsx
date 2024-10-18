import { createContext } from "react";
import { IEntry, IProfile } from "./Interfaces";

// Entries
export const EntriesContext = createContext<{
  entries?: IEntry[];
  setEntries?: (favoriteDrinks: IEntry[]) => void;
}>({});

// To show form message
export const ShowMsgContext = createContext<{
  showMsg?: boolean;
  setShowMsg?: (showMsg: boolean) => void;
}>({});

// Profile info
export const ProfileContext = createContext<{
  profile?: IProfile;
  setProfile?: (profile: IProfile) => void;
}>({});
