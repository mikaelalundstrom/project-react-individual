import { useContext, useEffect, useState } from "react";
import TagCard from "./TagCard";
import { Link } from "react-router-dom";
import Tag from "./Tag";
import { EntriesContext } from "../Context";

function TagSection() {
  const [locationTypes, setLocationTypes] = useState<string[]>([]);
  const [locationContinents, setLocationContinents] = useState<string[]>([]);
  const [locationCountries, setLocationCountries] = useState<string[]>([]);
  const { entries } = useContext(EntriesContext);

  // get locationTypes from API
  const getLocationTypes = async () => {
    try {
      const response = await fetch(
        "https://mikaelalundstrom.github.io/json-data/travel-journal/location-types.json"
      );
      const data = await response.json();
      setLocationTypes(data.locationTypes);
    } catch (error) {
      console.log(error);
    }
  };

  // Get continents and countries
  const getLocationTags = () => {
    const locationContinentsArr: string[] = [];
    const locationCountriesArr: string[] = [];

    entries?.forEach((entry) => {
      if (entry.location.continent) {
        // only add to arr if not included already
        if (!locationContinentsArr.includes(entry.location.continent)) {
          locationContinentsArr.push(entry.location.continent);
        }
      }
      if (entry.location.country) {
        // only add to arr if not included already
        if (!locationCountriesArr.includes(entry.location.country)) {
          locationCountriesArr.push(entry.location.country);
        }
      }
    });
    setLocationContinents(locationContinentsArr.sort());
    setLocationCountries(locationCountriesArr.sort());
  };

  useEffect(() => {
    getLocationTags();
    getLocationTypes();
  }, [entries]);

  return (
    <section className="tags-section">
      <div className="page-container">
        <h2 className="heading">Tags</h2>
        <p className="article">
          Find entries based on their tags. Or view <Link to="/entries">all entries.</Link>
        </p>
        <div className="tags">
          <div className="location-type">
            {locationTypes.map((locationType, i) => (
              <TagCard key={i} locationType={locationType} />
            ))}
          </div>
          <div className="general">
            <div className="tags-locations">
              <figure className="icon">
                <i className="ph ph-hash"></i>
              </figure>
              {locationContinents.map((continent, i) => (
                <Tag key={i} tag={continent} className="continent" />
              ))}
              {locationCountries.map((country, i) => (
                <Tag key={i} tag={country} className="country" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TagSection;
