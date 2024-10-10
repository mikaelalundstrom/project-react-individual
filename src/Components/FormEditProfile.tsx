import { FormEvent, useContext, useEffect } from "react";
import FormSelectInput from "./FormSelectInput";
import FormTextInput from "./FormTextInput";
import { EntriesContext, ProfileContext, ShowMsgContext } from "../Context";
import FormDateInput from "./FormDateInput";
import Button from "./Button";
import FormMsg from "./FormMsg";

function FormEditProfile() {
  const { entries } = useContext(EntriesContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const { setShowMsg } = useContext(ShowMsgContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.fName.value;
    const birthday = form.fBirthday.value;
    const from = form.fFrom.value;
    const favoriteDestination = form.fFavoriteDestination.value;
    const dreamDestination = form.fDreamDestination.value;
    const favoriteEntry = form.fFavoriteEntry.value;

    if (profile) {
      const updatedProfile = {
        name: name,
        birthday: birthday,
        from: from,
        favoriteDestination: favoriteDestination,
        dreamDestination: dreamDestination,
        favoriteEntry: favoriteEntry,
      };

      setProfile!(updatedProfile);
      setShowMsg!(true);
    }
  };

  useEffect(() => {
    return () => {
      setShowMsg!(false);
    };
  }, []);

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
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
          value={profile?.from}
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
          value={profile?.favoriteDestination}
        />
        <FormTextInput
          label="Dream Destination"
          id="fDreamDestination"
          required={false}
          className="span-full"
          placeholder="Your dream travel destination..."
          value={profile?.dreamDestination}
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
      <FormMsg message="Profile Updated." link={`/profile`} />
    </>
  );
}

export default FormEditProfile;
