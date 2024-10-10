import { useContext } from "react";
import { IProfile } from "../Interfaces";
import FormSelectInput from "./FormSelectInput";
import FormTextInput from "./FormTextInput";
import { EntriesContext } from "../Context";
import FormDateInput from "./FormDateInput";
import Button from "./Button";

interface IProps {
  profile: IProfile;
}

function FormEditProfile({ profile }: IProps) {
  const { entries } = useContext(EntriesContext);

  return (
    <>
      <form className="form">
        <FormTextInput
          label="Name"
          id="fName"
          required={false}
          className="span-full"
          placeholder="Your name..."
          value={profile?.name}
        />
        <FormTextInput
          label="From"
          id="fFrom"
          required={false}
          className="span-full"
          placeholder="Location/country where you're from..."
          value={profile?.name}
        />
        <FormDateInput label="Birthday" id="fBirthday" defaultValue={profile?.birthday} />
        <FormSelectInput
          label="Favorite Entry"
          id="fFavoriteEntry"
          placeholder="Select a Favorite Entry"
          options={entries!.map((entry) => entry.title)}
          defaultValue={profile?.favoriteEntry}
        />
        <FormTextInput
          label="Favorite Destination"
          id="fFavoriteDestination"
          required={false}
          className="span-full"
          placeholder="Your favorite travel destination..."
          value={profile?.name}
        />
        <FormTextInput
          label="Dream Destination"
          id="fDreamDestination"
          required={false}
          className="span-full"
          placeholder="Your dream travel destination..."
          value={profile?.name}
        />
        <div className="span-full new-button">
          <Button
            label="Update Profile"
            color="var(--color-white)"
            bgColor="var(--color-green)"
            type="submit"
          />
        </div>
      </form>
    </>
  );
}

export default FormEditProfile;
