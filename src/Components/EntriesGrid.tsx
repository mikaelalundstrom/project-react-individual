import { useContext, useState } from "react";
import EntryCard from "./EntryCard";
import { EntriesContext } from "../Context";
import { IEntry } from "../Interfaces";
import { Link } from "react-router-dom";
import Button from "./Button";

interface IProps {
  cardLimit?: number;
  filteredEntries?: IEntry[];
}

function EntriesGrid({ cardLimit, filteredEntries }: IProps) {
  const { entries } = useContext(EntriesContext);
  const entryBatchSize = 8;
  const [nmbrToShow, setNmbrToShow] = useState<number>(entryBatchSize);

  const showMoreEntries = () => {
    setNmbrToShow((prev) => prev + entryBatchSize);
  };

  return (
    <>
      <section className="entries-grid">
        {cardLimit
          ? entries?.slice(0, cardLimit).map((entry) => <EntryCard key={entry.id} entry={entry} />)
          : filteredEntries
          ? filteredEntries
              .slice(0, nmbrToShow)
              .map((entry) => <EntryCard key={entry.id} entry={entry} />)
          : entries
              ?.slice(0, nmbrToShow)
              .map((entry) => <EntryCard key={entry.id} entry={entry} />)}
      </section>
      {(filteredEntries && !cardLimit && filteredEntries.length > nmbrToShow) ||
      (!filteredEntries && !cardLimit && entries!.length > nmbrToShow) ? (
        <Button
          label="Show More"
          bgColor="var(--color-white)"
          color="var(--color-black)"
          onClick={showMoreEntries}
        />
      ) : null}

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
