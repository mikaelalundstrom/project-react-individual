import { Link } from "react-router-dom";
import Header from "../Components/Header";

function ProfilePage() {
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

              <div className="profile-body">
                <div className="info">
                  <h3>From:</h3>
                  <p>Country, Continent</p>
                </div>
                <div className="info">
                  <h3>Favorite Destination:</h3>
                  <p>Location, Country</p>
                </div>
                <div className="info">
                  <h3>Entries:</h3>
                  <p>9</p>
                </div>

                <div className="info">
                  <h3>Favorite Entry:</h3>
                  <p>Entry title</p>
                </div>
                <div className="info right">
                  <h3>Dream Destination</h3>
                  <p>Location, Country</p>
                </div>
              </div>

              <div className="profile-body">
                <div className="info">
                  <h3>Name:</h3>
                  <p>Name Lastname</p>
                </div>
                <div className="info padding">
                  <h3>BDay:</h3>
                  <p>JAN 1</p>
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
