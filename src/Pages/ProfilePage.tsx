import { Link } from "react-router-dom";
import Header from "../Components/Header";
import { useContext } from "react";
import { EntriesContext, ProfileContext } from "../Context";

function ProfilePage() {
  const { entries } = useContext(EntriesContext);
  const { profile } = useContext(ProfileContext);

  return (
    <>
      <Header color="var(--color-black)" bgColor="var(--color-orange)" />
      <main className="profile-page">
        <div className="page-container">
          <div className="content">
            <h1 className="heading ">Profile</h1>
            <div className="edit">
              <Link to={`/edit/profile`}>
                <p className="article">Edit Profile</p> <i className="ph ph-pen"></i>
              </Link>
            </div>
            <article className="profile">
              <div className="profile-header">
                <h2 className="heading-italic align-right">Travel Journal</h2>
              </div>

              <div className="profile-header">
                <h2 className="heading-italic">Profile</h2>
              </div>

              <div className="profile-body big">
                <div className="info">
                  <h3>Favorite Entry:</h3>
                  <p>{profile?.favoriteEntry ? profile.favoriteEntry : "N/A"}</p>
                </div>
                <div className="info">
                  <h3>From:</h3>
                  <p>{profile?.from ? profile.from : "N/A"}</p>
                </div>

                <div className="info">
                  <h3>Entries:</h3>
                  <p>{entries?.length}</p>
                </div>

                <div className="info">
                  <h3>Favorite Destination:</h3>
                  <p>{profile?.favoriteDestination ? profile.favoriteDestination : "N/A"}</p>
                </div>
                <div className="info right">
                  <h3>Dream Destination:</h3>
                  <p>{profile?.dreamDestination ? profile.dreamDestination : "N/A"}</p>
                </div>
              </div>

              <div className="profile-body">
                <div className="info">
                  <h3>Name:</h3>
                  <p>{profile?.name ? profile.name : "N/A"}</p>
                </div>
                <div className="info padding">
                  <h3>BDay:</h3>
                  <p>
                    {profile?.birthday
                      ? ` ${profile.birthday.substring(5, 7)}/${profile.birthday.substring(8, 10)}`
                      : "N/A"}
                  </p>
                </div>
                <figure className="stamp ">
                  <i className="ph ph-globe"></i>
                </figure>
                <figure className="icon">
                  <i className="ph ph-qr-code"></i>
                </figure>
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
