import FormEditProfile from "../Components/FormEditProfile";
import Header from "../Components/Header";

function EditProfilePage() {
  return (
    <>
      <Header bgColor="var(--color-green-light)" color="var(--color-green)" />
      <main className="new-entry">
        <div className="page-container small">
          <h1 className="heading">Edit Profile</h1>
          <FormEditProfile />
        </div>
      </main>
    </>
  );
}

export default EditProfilePage;
