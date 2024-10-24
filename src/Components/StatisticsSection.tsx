import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EntriesContext } from "../Context";
import Graph from "./Graph";
import { matchingStamp } from "../helpers";

function StatisticsSection() {
  const { entries } = useContext(EntriesContext);
  const [continentCount, setContinentCount] = useState<object>({});
  const [countryCount, setCountryCount] = useState<object>({});
  const [mostCommonYear, setMostCommonYear] = useState<string>("");
  const [mostCommonType, setMostCommonType] = useState<string>("");

  /* Word & Character count */

  const getTotalWordCount = () => {
    let totalWordCount = 0;
    entries?.forEach((entry) => {
      // split at spaces and do not include empty strings(line breaks, etc)
      let wordCount = entry.description.split(" ").filter((word) => word !== "").length;
      totalWordCount += wordCount;
    });
    return totalWordCount;
  };

  const getTotalCharacterCount = () => {
    let totalCharacters = 0;
    entries?.forEach((entry) => {
      totalCharacters += entry.description.length;
    });
    return totalCharacters;
  };

  /* Earliest entry */
  const getEarliestEntryDate = () => {
    if (entries && entries.length !== 0) {
      // Get last item of array (since entries are sorted latest first)
      const date = entries[entries!.length - 1].date.replaceAll("-", "/").substring(2);
      return date;
    }
  };

  /* Continent & Country frequency */
  const getContinentFrequency = () => {
    const continents = entries?.map((entry) => {
      if (entry.location.continent) {
        return entry.location.continent;
      }
    });
    setContinentCount(countFrequency(continents!.sort()));
  };

  const getCountryFrequency = () => {
    const countries = entries?.map((entry) => {
      if (entry.location.country) {
        return entry.location.country;
      }
    });
    setCountryCount(countFrequency(countries!.sort()));
  };

  // Count frequency and save it as an obj
  const countFrequency = (array: (string | undefined)[]) => {
    const counts: { [key: string]: number } = {};
    array!.forEach((item) => {
      item ? (counts[item] = (counts[item] || 0) + 1) : null;
    });
    return counts;
  };

  /* Get most common */
  const getMostCommon = (array: (string | undefined)[]) => {
    return (
      // sorts so that the most common is last in the array, and pops it
      array!
        .sort(
          (a, b) =>
            array!.filter((type) => type === a).length - array!.filter((type) => type === b).length
        )
        .pop() || ""
    );
  };

  // Only call once entries have loaded
  useEffect(() => {
    if (entries && entries.length !== 0) {
      setMostCommonType(
        getMostCommon(
          entries
            ?.map((entry) => {
              if (entry.location.type) {
                return entry.location.type;
              }
            })
            .filter((type) => type !== undefined)
        )
      );
      setMostCommonYear(
        getMostCommon(
          entries.map((entry) => {
            return entry.date.substring(0, 4);
          })
        )
      );

      getContinentFrequency();
      getCountryFrequency();
    }
  }, [entries]);

  return (
    <article className="statistics">
      <div className="page-container">
        <h2 className="heading">Statistics</h2>
        <section className="stats-container">
          <Link to="/entries" className="entries stat-item">
            <p className="big">{entries?.length}</p>
            <p>Entries</p>
          </Link>
          <div className="words stat-item">
            <p className="big italic">{entries ? getTotalWordCount() : null} words</p>
            <p>in total written across all entries.</p>
          </div>
          <Link
            className="date-entry stat-item"
            to={`/entry/${entries && entries.length !== 0 ? entries[entries.length - 1].id : null}`}
          >
            <p className="big">{entries ? getEarliestEntryDate() : null}</p>
            <p>the date of your earliest entry.</p>
          </Link>
          <div className="continents stat-item">
            <p className="graph-label">Entries per Continent</p>
            <Graph obj={continentCount} />
          </div>
          <Link
            to={`/entries/tagged/${entries ? encodeURIComponent(mostCommonType) : null}`}
            className="location-type stat-item"
          >
            <p className="big italic">Most common location type:</p>
            <figure>
              <i className={`ph ph-${entries ? matchingStamp(mostCommonType) : null}`}></i>
            </figure>
          </Link>
          <Link
            className="date-entry latest stat-item"
            to={`/entry/${entries && entries.length !== 0 ? entries[0].id : null}`}
          >
            <p className="big">
              {entries && entries.length !== 0
                ? entries[0].date.replaceAll("-", "/").substring(2)
                : null}
            </p>
            <p>the date of your latest entry.</p>
          </Link>
          <div className="words stat-item">
            <p className="big italic">{entries ? getTotalCharacterCount() : null} characters</p>
            <p>in total written across all entries.</p>
          </div>
          <div className="year stat-item">
            <p>
              You wrote the most entries for{" "}
              <span className="bold">{entries ? mostCommonYear : null}.</span>
            </p>
          </div>
          <div className="countries stat-item">
            <p className="graph-label">Entries per Country</p>
            <Graph obj={countryCount} />
          </div>
        </section>
      </div>
    </article>
  );
}

export default StatisticsSection;
