import { createContext } from "react";
import { IEntry, IProfile } from "./Interfaces";

export const EntriesContext = createContext<{
  entries?: IEntry[];
  setEntries?: (favoriteDrinks: IEntry[]) => void;
}>({});

export const ShowMsgContext = createContext<{
  showMsg?: boolean;
  setShowMsg?: (showMsg: boolean) => void;
}>({});

export const ProfileContext = createContext<{
  profile?: IProfile;
  setProfile?: (profile: IProfile) => void;
}>({});
