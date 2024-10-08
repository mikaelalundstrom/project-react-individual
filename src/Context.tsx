import { createContext } from "react";
import { IEntry } from "./Interfaces";

export const EntriesContext = createContext<{
  entries?: IEntry[];
  setEntries?: (favoriteDrinks: IEntry[]) => void;
}>({});

export const ShowMsgContext = createContext<{
  showMsg?: boolean;
  setShowMsg?: (showMsg: boolean) => void;
}>({});
