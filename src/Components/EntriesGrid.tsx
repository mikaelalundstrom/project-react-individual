import { useContext } from "react";
import EntryCard from "./EntryCard";
import { EntriesContext } from "../Context";
import { IEntry } from "../Interfaces";
import { Link } from "react-router-dom";

interface IProps {
  cardLimit?: number;
  filteredEntries?: IEntry[];
}

function EntriesGrid({ cardLimit, filteredEntries }: IProps) {
  const { entries } = useContext(EntriesContext);

  return (
    <>
      <section className="entries-grid">
        {cardLimit
          ? entries?.slice(0, cardLimit).map((entry) => <EntryCard key={entry.id} entry={entry} />)
          : filteredEntries
          ? filteredEntries.map((entry) => <EntryCard key={entry.id} entry={entry} />)
          : entries?.map((entry) => <EntryCard key={entry.id} entry={entry} />)}
      </section>
      {(filteredEntries && filteredEntries.length === 0) || entries?.length === 0 ? (
        <p className="no-entries-msg heading-italic">
          No entries.{" "}
          <Link to="/new" className="heading-italic">
            Write a new one?
          </Link>
        </p>
      ) : null}
    </>
  );
}

export default EntriesGrid;
