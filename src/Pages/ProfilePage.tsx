import { Link } from "react-router-dom";
import Header from "../Components/Header";
import { useContext, useEffect, useState } from "react";
import { EntriesContext, ProfileContext } from "../Context";
import { matchingStamp } from "../helpers";
import Graph from "../Components/Graph";

function ProfilePage() {
  const { entries } = useContext(EntriesContext);
  const { profile } = useContext(ProfileContext);
  const [continentCount, setContinentCount] = useState<object>({});
  const [countryCount, setCountryCount] = useState<object>({});

  const getTotalWordCount = () => {
    let totalWordCount = 0;
    entries?.forEach((entry) => {
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

  const getEarliestEntryDate = () => {
    if (entries) {
      const date = entries[entries?.length - 1]?.date.replaceAll("-", "/").substring(2);
      return date;
    }
  };

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

  const countFrequency = (array: (string | undefined)[]) => {
    const counts: { [key: string]: number } = {};
    array!.forEach((item) => {
      item ? (counts[item] = (counts[item] || 0) + 1) : null;
    });
    return counts;
  };

  const getMostCommonLocationType = () => {
    const locationTypes = entries?.map((entry) => {
      if (entry.location.type) {
        return entry.location.type;
      }
    });
    return getMostCommon(locationTypes!);
  };

  const getMostCommonYear = () => {
    const years = entries?.map((entry) => {
      return entry.date.substring(0, 4);
    });
    return getMostCommon(years!);
  };

  const getMostCommon = (array: (string | undefined)[]) => {
    return (
      array!
        .sort(
          (a, b) =>
            array!.filter((type) => type === a).length - array!.filter((type) => type === b).length
        )
        .pop() || ""
    );
  };

  useEffect(() => {
    getContinentFrequency();
    getCountryFrequency();
  }, [entries]);

  return (
    <>
      <Header color="var(--color-black)" bgColor="var(--color-orange)" />
      <main className="profile-page">
        <article className="profile-section">
          <div className="page-container">
            <div className="content">
              <h1 className="heading ">Profile</h1>
              <div className="edit">
                <Link to={`/edit/profile`}>
                  <p className="article">Edit Profile</p> <i className="ph ph-pen"></i>
                </Link>
              </div>
              <article className="profile">
                <div className="profile-header general">
                  <h2 className="heading-italic align-right">Travel Journal</h2>
                </div>
                <div className="profile-header personal">
                  <h2 className="heading-italic">Profile</h2>
                </div>
                <div className="profile-body big general">
                  <div className="info">
                    <h3>Favorite Entry:</h3>
                    <p>{profile?.favoriteEntry ? profile.favoriteEntry : "N/A"}</p>
                  </div>
                  <div className="info">
                    <h3>From:</h3>
                    <p>{profile?.from ? profile.from : "N/A"}</p>
                  </div>
                  <div className="info">
                    <h3>Entries:</h3>
                    <p>{entries?.length}</p>
                  </div>
                  <div className="info">
                    <h3>Favorite Destination:</h3>
                    <p>{profile?.favoriteDestination ? profile.favoriteDestination : "N/A"}</p>
                  </div>
                  <div className="info right">
                    <h3>Dream Destination:</h3>
                    <p>{profile?.dreamDestination ? profile.dreamDestination : "N/A"}</p>
                  </div>
                </div>
                <div className="profile-body personal">
                  <div className="info">
                    <h3>Name:</h3>
                    <p>{profile?.name ? profile.name : "N/A"}</p>
                  </div>
                  <div className="info padding">
                    <h3>BDay:</h3>
                    <p>
                      {profile?.birthday
                        ? ` ${profile.birthday.substring(5, 7)}/${profile.birthday.substring(
                            8,
                            10
                          )}`
                        : "N/A"}
                    </p>
                  </div>
                  <figure className="stamp ">
                    <i className="ph ph-globe"></i>
                  </figure>
                  <figure className="icon">
                    <i className="ph ph-qr-code"></i>
                  </figure>
                </div>
              </article>
            </div>
          </div>
        </article>

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
                to={`/entry/${
                  entries && entries.length !== 0 ? entries[entries.length - 1].id : null
                }`}
              >
                <p className="big">{entries ? getEarliestEntryDate() : null}</p>
                <p>the date of your earliest entry.</p>
              </Link>
              <div className="continents stat-item">
                <p className="graph-label">Entries per Continent</p>
                <Graph obj={continentCount} />
              </div>
              <Link
                to={`/entries/tagged/${encodeURIComponent(getMostCommonLocationType())}`}
                className="location-type stat-item"
              >
                <p className="big italic">Most common location type:</p>
                <figure>
                  <i
                    className={`ph ph-${
                      entries ? matchingStamp(getMostCommonLocationType()) : null
                    }`}
                  ></i>
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
                  You wrote the most entries for
                  <span className="bold"> {getMostCommonYear()}.</span>
                </p>
              </div>
              <div className="countries stat-item">
                <p className="graph-label">Entries per Country</p>
                <Graph obj={countryCount} />
              </div>
            </section>
          </div>
        </article>
      </main>
    </>
  );
}

export default ProfilePage;
