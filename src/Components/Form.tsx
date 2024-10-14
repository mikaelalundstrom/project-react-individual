import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import Button from "./Button";
import FormSelectInput from "./FormSelectInput";
import FormTextInput from "./FormTextInput";
import { IEntry } from "../Interfaces";
import { EntriesContext, ShowMsgContext } from "../Context";
import { useNavigate } from "react-router-dom";
import { sortEntriesByDate, sortNumbers } from "../helpers";
import FormMsg from "./FormMsg";
import FormDateInput from "./FormDateInput";
import ImgPlaceholder from "./ImgPlaceholder";

interface IProps {
  entry?: IEntry;
}

function Form({ entry }: IProps) {
  const [locationTypes, setLocationTypes] = useState<string[]>([]);
  const { entries, setEntries } = useContext(EntriesContext);
  const { setShowMsg } = useContext(ShowMsgContext);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const deletingEntryRef = useRef(false);
  let newIdRef = useRef(0);
  const navigate = useNavigate();

  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [imgXValue, setImgXValue] = useState<string>("");
  const [imgYValue, setImgYValue] = useState<string>("");

  const handleOnLoad = () => {
    setImgLoaded(true);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const title = form.fTitle.value;
    const img = form.fImg.value;
    const imgPositionX = form.fImgX.value;
    const imgPositionY = form.fImgY.value;
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
          entryToUpdate.imgPosition!.x = imgPositionX;
          entryToUpdate.imgPosition!.y = imgPositionY;
          entryToUpdate.location.continent = continent;
          entryToUpdate.location.country = country;
          entryToUpdate.location.location = location;
          entryToUpdate.location.type = locationType;
          entryToUpdate.date = date;
          entryToUpdate.description = description;
        }
        return entryToUpdate;
      });

      setEntries!(sortEntriesByDate(updatedArr));
    } else {
      const allIds = entries!.map((entry) => entry.id);
      allIds.sort(sortNumbers);
      newIdRef.current = allIds[allIds.length - 1] + 1;

      const newEntry: IEntry = {
        id: newIdRef.current,
        title: title,
        img: img,
        imgPosition: { x: imgPositionX, y: imgPositionY },
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
    setShowMsg!(true);
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
    setEntries!(updatedArr);
    deletingEntryRef.current = true;
    setShowMsg!(true);
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
    setImgLoaded(false);
    console.log("img url updated");
  }, [imgUrl]);

  useEffect(() => {
    getLocationTypes();
    setImgLoaded(false);
    if (entry) {
      setImgUrl(entry.img);
      setImgXValue(entry.imgPosition!.x);
      setImgYValue(entry.imgPosition!.y);
    }
  }, [entry]);

  useEffect(() => {
    return () => {
      if (!deletingEntryRef.current) {
        setShowMsg!(false);
      }
    };
  }, []);

  return (
    <>
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
          setState={setImgUrl}
        />
        <div className="image-preview">
          <p>Image Preview:</p>
          <figure className="image-preview-figure">
            {!imgLoaded && <ImgPlaceholder />}
            <img
              src={imgUrl}
              alt="Image preview"
              onLoad={handleOnLoad}
              style={
                imgLoaded
                  ? { display: "block", objectPosition: `${imgXValue} ${imgYValue}` }
                  : { display: "none" }
              }
            />
          </figure>
        </div>
        <div className="image-preview img-position">
          <FormSelectInput
            label="Position X"
            id="fImgX"
            placeholder="Image Position X"
            options={["Left", "Center", "Right"]}
            defaultValue={entry?.imgPosition?.x}
            setState={setImgXValue}
          />
          <FormSelectInput
            label="Position Y"
            id="fImgY"
            placeholder="Image Position Y"
            options={["Top", "Center", "Bottom"]}
            defaultValue={entry?.imgPosition?.y}
            setState={setImgYValue}
          />
        </div>
        <div className="span-full">
          <hr />
        </div>
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

        <FormDateInput label="Date" id="fDate" required={true} defaultValue={entry?.date} />
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
        </div>
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
      </form>
      {entry ? (
        <FormMsg message="Entry Updated." link={`/entry/${entry.id}`} />
      ) : (
        <FormMsg message="New entry created." link={`/entry/${newIdRef.current}`} />
      )}
    </>
  );
}

export default Form;
