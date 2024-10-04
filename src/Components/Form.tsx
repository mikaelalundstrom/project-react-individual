import { FormEvent, useContext, useEffect, useState } from "react";
import Button from "./Button";
import FormSelectInput from "./FormSelectInput";
import FormTextInput from "./FormTextInput";
import { IEntry } from "../Interfaces";
import { EntriesContext } from "../Context";
import { Link } from "react-router-dom";

interface IProps {
  entry?: IEntry;
}

function Form({ entry }: IProps) {
  const [locationTypes, setLocationTypes] = useState<string[]>([]);
  const { entries, setEntries } = useContext(EntriesContext);
  const [showMsg, setShowMsg] = useState<boolean>(false);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const title = form.fTitle.value;
    const img = form.fImg.value;
    const continent = form.fContinent.value;
    const country = form.fCountry.value;
    const location = form.fLocation.value;
    const locationType = form.fType.value;
    const date = form.fDate.value;
    const description = form.fDesc.value;
    console.log(date);

    if (entry) {
      console.log(entries);

      const updatedArr = entries!.map((entryToUpdate) => {
        if (entryToUpdate.id === entry.id) {
          entryToUpdate.title = title;
          entryToUpdate.img = img;
          entryToUpdate.location.continent = continent;
          entryToUpdate.location.country = country;
          entryToUpdate.location.location = location;
          entryToUpdate.location.type = locationType;
          entryToUpdate.date = date;
          entryToUpdate.description = description;
        }
        return entryToUpdate;
      });

      console.log(updatedArr);
      setEntries!(updatedArr);
      setShowMsg(true);
    } else {
    }
  };

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

  useEffect(() => {
    getLocationTypes();
  }, [entry]);

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <FormTextInput
        label="Title"
        id="fTitle"
        required={true}
        className="span-full"
        placeholder="Title of your entry..."
        value={entry?.title}
      />
      <FormTextInput
        label="Image URL"
        id="fImg"
        required={true}
        className="span-full"
        placeholder="e.g. https://www.yourlink/image.png"
        value={entry?.img}
      />
      <FormSelectInput
        label="Continent"
        id="fContinent"
        placeholder="Select a Continent"
        options={["Africa", "Asia", "Europe", "North America", "Oceania", "South America"]}
        defaultValue={entry?.location.continent}
      />
      <FormTextInput
        label="Country"
        id="fCountry"
        required={false}
        placeholder="Enter country name..."
        value={entry?.location.country}
      />
      <FormTextInput
        label="Location"
        id="fLocation"
        required={true}
        className="span-full"
        placeholder="Enter location name..."
        value={entry?.location.location}
      />
      <FormSelectInput
        label="Location type"
        id="fType"
        placeholder="Select Location Type"
        options={locationTypes}
        defaultValue={entry?.location.type}
      />
      <div>
        <label htmlFor="fDate" className="heading-italic">
          Date:<span>*</span>
        </label>
        <input type="date" id="fDate" name="fDate" required defaultValue={entry?.date} />
      </div>
      <div className="span-full">
        <label htmlFor="fDesc" className="heading-italic">
          Description:<span>*</span>
        </label>
        <textarea
          name="fDesc"
          id="fDesc"
          required
          placeholder="Write something about your journey..."
          defaultValue={entry?.description}
        ></textarea>
      </div>{" "}
      {entry ? (
        <div className="span-full edit-buttons">
          <Button
            label="Delete Entry"
            color="var(--color-white)"
            bgColor="var(--color-orange)"
            type="button"
          />
          <Button
            label="Update Entry"
            color="var(--color-white)"
            bgColor="var(--color-green)"
            type="submit"
          />
        </div>
      ) : (
        <div className="span-full new-button">
          <Button
            label="Create Entry"
            color="var(--color-white)"
            bgColor="var(--color-green)"
            type="submit"
          />
        </div>
      )}
      {showMsg ? (
        <div className="span-full submit-msg">
          {entry ? (
            <p>
              Entry updated.
              <Link to={`/entry/${entry.id}`}>
                See it here <i className="ph-bold ph-arrow-right"></i>
              </Link>
            </p>
          ) : (
            <p>New entry created.</p>
          )}
        </div>
      ) : null}
    </form>
  );
}

export default Form;
