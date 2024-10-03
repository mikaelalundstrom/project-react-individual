import { useEffect, useState } from "react";
import Button from "./Button";
import FormSelectInput from "./FormSelectInput";
import FormTextInput from "./FormTextInput";

function Form() {
  const [locationTypes, setLocationTypes] = useState<string[]>([]);
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
  }, []);

  return (
    <form className="form">
      <FormTextInput
        label="Title"
        id="title"
        required={true}
        className="span-full"
        placeholder="Title of your entry..."
      />
      <FormTextInput
        label="Image URL"
        id="img"
        required={true}
        className="span-full"
        placeholder="e.g. https://www.yourlink/image.png"
      />
      <FormSelectInput
        label="Continent"
        id="continent"
        placeholder="Select a Continent"
        options={["Africa", "Asia", "Europe", "North America", "Oceania", "South America"]}
      />
      <FormTextInput
        label="Country"
        id="country"
        required={false}
        placeholder="Enter country name..."
      />
      <FormTextInput
        label="Location"
        id="location"
        required={true}
        className="span-full"
        placeholder="Enter location name..."
      />
      <FormSelectInput
        label="Location type"
        id="type"
        placeholder="Select Location Type"
        options={locationTypes}
      />
      <div>
        <label htmlFor="date" className="heading-italic">
          Date:<span>*</span>
        </label>
        <input type="date" id="date" name="date" required />
      </div>
      <div className="span-full">
        <label htmlFor="desc" className="heading-italic">
          Description:<span>*</span>
        </label>
        <textarea
          name="desc"
          id="desc"
          required
          placeholder="Write something about your journey..."
        ></textarea>
      </div>
      <div className="span-full">
        <Button label="Create Entry" color="var(--color-white)" bgColor="var(--color-green)" />
      </div>
    </form>
  );
}

export default Form;
