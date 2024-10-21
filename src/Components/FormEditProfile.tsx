import { FormEvent, useContext, useEffect, useState } from "react";
import FormSelectInput from "./FormSelectInput";
import FormTextInput from "./FormTextInput";
import { EntriesContext, ProfileContext, ShowMsgContext } from "../Context";
import FormDateInput from "./FormDateInput";
import Button from "./Button";

function FormEditProfile() {
  const { entries } = useContext(EntriesContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const { setShowMsg, setMsgContent } = useContext(ShowMsgContext);
  const [resetConfirm, setResetConfirm] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = form.fName.value.trim();
    const birthday = form.fBirthday.value;
    const from = form.fFrom.value.trim();
    const favoriteDestination = form.fFavoriteDestination.value.trim();
    const dreamDestination = form.fDreamDestination.value.trim();
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
      setMsgContent!({
        message: "Profile Updated!",
        link: { link: "/profile", label: "See it here." },
      });
    }
  };

  // show buttons to confirm reset
  const showConfirmReset = () => {
    setResetConfirm(true);
  };

  // hide buttons to confirm reset
  const cancelReset = () => {
    setResetConfirm(false);
  };

  // reset prfile
  const handleReset = () => {
    const updatedProfile = {
      name: "",
      birthday: "",
      from: "",
      favoriteDestination: "",
      dreamDestination: "",
      favoriteEntry: "",
    };

    setProfile!(updatedProfile);
    setShowMsg!(true);
    setMsgContent!({
      message: "Profile Reset!",
      link: { link: "/profile", label: "See it here." },
    });
    setResetConfirm(false);
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
        <div className="span-full edit-buttons">
          <div>
            {!resetConfirm ? (
              <Button
                label="Reset Profile"
                color="var(--color-white)"
                bgColor="var(--color-orange)"
                type="button"
                onClick={showConfirmReset}
              />
            ) : null}

            {resetConfirm ? (
              <div className="confirm-delete">
                <Button
                  label="Cancel"
                  color="var(--color-black)"
                  bgColor="var(--color-white)"
                  type="button"
                  onClick={cancelReset}
                />
                <Button
                  label="Reset"
                  color="var(--color-white)"
                  bgColor="var(--color-red)"
                  type="button"
                  onClick={handleReset}
                />
              </div>
            ) : null}
          </div>
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
