import { IEntry } from "./Interfaces";

export const sortEntriesByDate = (entries: IEntry[]) => {
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

export function sortNumbers(a: number, b: number) {
  return a - b;
}
