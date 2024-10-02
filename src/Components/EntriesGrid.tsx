import { useContext } from "react";
import EntryCard from "./EntryCard";
import { EntriesContext } from "../Context";

interface IProps {
  cardLimit?: number;
}

function EntriesGrid({ cardLimit }: IProps) {
  const { entries } = useContext(EntriesContext);

  return (
    <section className="entries-grid">
      {cardLimit
        ? entries?.slice(0, cardLimit).map((entry) => <EntryCard key={entry.id} entry={entry} />)
        : entries?.map((entry) => <EntryCard key={entry.id} entry={entry} />)}
    </section>
  );
}

export default EntriesGrid;
