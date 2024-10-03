import { Link, useParams } from "react-router-dom";
import Header from "../Components/Header";
import { useContext, useEffect, useState } from "react";
import { IEntry } from "../Interfaces";
import { EntriesContext } from "../Context";
import ImgPlaceholder from "../Components/ImgPlaceholder";

function EntryPage() {
  const { id } = useParams();
  const { entries } = useContext(EntriesContext);
  const [entry, setEntry] = useState<IEntry>();
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  const handleOnLoad = () => {
    setImgLoaded(true);
  };

  useEffect(() => {
    setImgLoaded(false);
  }, [entry]);

  const formatDesc = (desc: string) => {
    const descParagraphs = desc.split("\n");
    return descParagraphs;
  };

  const matchingStamp = (locationType: string) => {
    let icon;
    switch (locationType) {
      case "Mountain":
        icon = "mountains";
        break;
      case "Nature":
        icon = "park";
        break;
      case "Beach/Tropical":
        icon = "island";
        break;
      case "Culture/Heritage":
        icon = "castle-turret";
        break;
      case "City":
        icon = "buildings";
        break;
      case "Countryside":
        icon = "farm";
        break;
      case "Sea/Ocean":
        icon = "waves";
        break;
      case "Attraction/Amusement":
        icon = "balloon";
        break;
      default:
        icon = "map-pin";
        break;
    }

    return icon;
  };

  useEffect(() => {
    const currentEntry = entries?.find((entry) => entry.id === parseInt(id!));
    setEntry(currentEntry);
  }, [entries]);

  return (
    <>
      <Header bgColor="var(--color-white)" color="var(--color-black)" />
      {entry ? (
        <main className="entry-page">
          <div className="page-container">
            <div className="intro">
              <figure className="image">
                <figure className="stamp">
                  <i className={`ph ph-${matchingStamp(entry.location.type!)}`}></i>
                </figure>
                {!imgLoaded && <ImgPlaceholder />}
                <img
                  src={entry.img}
                  alt={entry.location.location}
                  onLoad={handleOnLoad}
                  style={imgLoaded ? { display: "block" } : { display: "none" }}
                />
              </figure>
              <div className="edit">
                <Link to="/edit">
                  <p className="article">Edit Entry</p> <i className="ph ph-pen"></i>
                </Link>
              </div>
              <h1 className="heading-article">{entry.title}</h1>
              <p className="date article">{entry.date.replaceAll("-", "/")}</p>
            </div>
          </div>
          <div className="text-body">
            <div className="page-container">
              <h2 className="cursive-article">
                {entry.location.location}, {entry.location.country}
              </h2>
              <div className="desc">
                {formatDesc(entry.description).map((paragraph, i) => (
                  <p key={i} className="article">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="tags">
                <figure className="icon">
                  <i className="ph ph-hash"></i>
                </figure>
                <Link to={`/entries/tagged/${entry.location.continent}`}>
                  {entry.location.continent}
                </Link>
                <Link to={`/entries/tagged/${entry.location.country}`}>
                  {entry.location.country}
                </Link>
                <Link to={`/entries/tagged/${entry.location.type}`}>{entry.location.type}</Link>
              </div>
            </div>
          </div>
        </main>
      ) : null}
    </>
  );
}

export default EntryPage;
