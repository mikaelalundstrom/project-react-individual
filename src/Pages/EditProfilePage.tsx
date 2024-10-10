import { useContext } from "react";
import FormEditProfile from "../Components/FormEditProfile";
import Header from "../Components/Header";
import { ProfileContext } from "../Context";

function EditProfilePage() {
  const { profile } = useContext(ProfileContext);
  return (
    <>
      <Header bgColor="var(--color-green-light)" color="var(--color-green)" />
      <main className="new-entry">
        <div className="page-container small">
          <h1 className="heading">Edit Profile</h1>
          <FormEditProfile profile={profile!} />
        </div>
      </main>
    </>
  );
}

export default EditProfilePage;
