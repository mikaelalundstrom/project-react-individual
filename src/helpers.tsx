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

// Match locationType to the right icon keyword
export const matchingStamp = (locationType: string) => {
  let icon;
  switch (locationType) {
    case "Mountain":
      icon = "mountains";
      break;
    case "Nature":
      icon = "park";
      break;
    case "Beach/Tropical":
      icon = "island";
      break;
    case "Culture/Heritage":
      icon = "castle-turret";
      break;
    case "City":
      icon = "buildings";
      break;
    case "Countryside":
      icon = "farm";
      break;
    case "Sea/Ocean":
      icon = "waves";
      break;
    case "Attraction/Amusement":
      icon = "balloon";
      break;
    default:
      icon = "map-pin";
      break;
  }

  return icon;
};
