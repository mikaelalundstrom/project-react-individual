import { Link } from "react-router-dom";

function EntryCard() {
  return (
    <>
      <Link to="/entry/1">
        <article className="entry-card">
          <div className="left-side">
            <h3 className="heading-card">The beautiful scenery of Lake Lucerne</h3>
          </div>

          <div className="divider"></div>
          <div className="right-side">
            <div className="details">
              <p>2024/07</p>
              <figure className="icon">
                <i className="ph ph-arrow-up-right"></i>
              </figure>
            </div>
            <div className="desc">
              <h4 className="cursive-card">
                Lucerne, <br /> Switzerland
              </h4>
              <p className="small">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi provident quam
                earum aspernatur magni consequatur nam numquam distinctio expedita, dolorem
                assumenda dolorum cupiditate nesciunt dolore vitae dicta saepe quo quidem.
              </p>
            </div>
          </div>
        </article>
      </Link>
    </>
  );
}

export default EntryCard;
