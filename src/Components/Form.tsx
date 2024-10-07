import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Button from "./Button";
import FormSelectInput from "./FormSelectInput";
import FormTextInput from "./FormTextInput";
import { IEntry } from "../Interfaces";
import { EntriesContext } from "../Context";
import { Link, useNavigate } from "react-router-dom";
import { sortEntriesByDate, sortNumbers } from "../helpers";

interface IProps {
  entry?: IEntry;
}

function Form({ entry }: IProps) {
  const [locationTypes, setLocationTypes] = useState<string[]>([]);
  const { entries, setEntries } = useContext(EntriesContext);
  const [submitMsg, setSubmitMsg] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  let newId = useRef(0);
  const navigate = useNavigate();

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

    if (entry) {
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
      setEntries!(sortEntriesByDate(updatedArr));
    } else {
      const allIds = entries!.map((entry) => entry.id);
      allIds.sort(sortNumbers);
      newId.current = allIds[allIds.length - 1] + 1;

      const newEntry: IEntry = {
        id: newId.current,
        title: title,
        img: img,
        location: {
          continent: continent,
          country: country,
          location: location,
          type: locationType,
        },
        date: date,
        description: description,
      };
      const updatedArr = [...entries!, newEntry];
      setEntries!(sortEntriesByDate(updatedArr));
      form.reset();
    }
    setSubmitMsg(true);
  };

  const showConfirmDelete = () => {
    setDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setDeleteConfirm(false);
  };

  const handleDelete = () => {
    const entrytoDelete = entry;
    const updatedArr = entries!.filter((entry) => entry.id !== entrytoDelete!.id);
    console.log(updatedArr);
    setEntries!(updatedArr);
    navigate("/entries");
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
          <div>
            {!deleteConfirm ? (
              <Button
                label="Delete Entry"
                color="var(--color-white)"
                bgColor="var(--color-orange)"
                type="button"
                onClick={showConfirmDelete}
              />
            ) : null}

            {deleteConfirm ? (
              <div className="confirm-delete">
                <Button
                  label="Cancel"
                  color="var(--color-black)"
                  bgColor="var(--color-white)"
                  type="button"
                  onClick={cancelDelete}
                />
                <Button
                  label="Delete"
                  color="var(--color-white)"
                  bgColor="#E1443A"
                  type="button"
                  onClick={handleDelete}
                />
              </div>
            ) : null}
          </div>
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
      {submitMsg ? (
        <div className="span-full submit-msg">
          {entry ? (
            <p>
              Entry updated.
              <Link to={`/entry/${entry.id}`}>
                See it here <i className="ph-bold ph-arrow-right"></i>
              </Link>
            </p>
          ) : (
            <p>
              New entry created.{" "}
              <Link to={`/entry/${newId.current}`}>
                See it here <i className="ph-bold ph-arrow-right"></i>
              </Link>
            </p>
          )}
        </div>
      ) : null}
    </form>
  );
}

export default Form;
