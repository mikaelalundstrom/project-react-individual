import { Link, useParams } from "react-router-dom";
import Header from "../Components/Header";
import { useContext, useEffect, useState } from "react";
import { IEntry } from "../Interfaces";
import { EntriesContext, ShowMsgContext } from "../Context";
import ImgPlaceholder from "../Components/ImgPlaceholder";
import { matchingStamp } from "../helpers";
import Tag from "../Components/Tag";

function EntryPage() {
  const { id } = useParams();
  const { entries } = useContext(EntriesContext);
  const [entry, setEntry] = useState<IEntry>();
  // Used to know when to display placeholder for image
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);
  const { setShowMsg } = useContext(ShowMsgContext);

  const handleOnLoad = () => {
    setImgLoaded(true);
  };

  const formatDesc = (desc: string) => {
    // Split up entry description on line breaks to be able to render as separate paragraphs
    const descParagraphs = desc.split("\n");
    return descParagraphs;
  };

  useEffect(() => {
    return () => {
      setShowMsg!(false);
    };
  }, []);

  useEffect(() => {
    setImgLoaded(false);
  }, [entry]);

  useEffect(() => {
    // Set current entry based on URLParams
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
                  style={
                    imgLoaded
                      ? {
                          display: "block",
                          objectPosition: `${entry.imgPosition!.x} ${entry.imgPosition!.y}`,
                        }
                      : { display: "none" }
                  }
                />
              </figure>
              <div className="edit">
                <Link to={`/edit/${id}`}>
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
                {formatDesc(entry.description).map((paragraph, i) =>
                  paragraph ? (
                    <p key={i} className="article">
                      {paragraph}
                    </p>
                  ) : null
                )}
              </div>

              <div className="tags">
                {entry.location.continent! || entry.location.country! || entry.location.type! ? (
                  <figure className="icon">
                    <i className="ph ph-hash"></i>
                  </figure>
                ) : null}
                {entry.location.continent ? <Tag tag={entry.location.continent} /> : null}
                {entry.location.country ? <Tag tag={entry.location.country} /> : null}
                {entry.location.type ? <Tag tag={entry.location.type} /> : null}
              </div>
            </div>
          </div>
        </main>
      ) : null}
    </>
  );
}

export default EntryPage;
