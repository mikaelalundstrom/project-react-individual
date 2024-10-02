import { createContext } from "react";
import { IEntry } from "./interfaces";

export const EntriesContext = createContext<{
  entries?: IEntry[];
  setEntries?: (favoriteDrinks: IEntry[]) => void;
}>({});
