import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShowMsgContext } from "../Context";

function Message() {
  const { showMsg, setShowMsg, msgContent } = useContext(ShowMsgContext);
  return (
    <>
      {showMsg ? (
        <p className="msg">
          <span>
            {msgContent?.message}
            {msgContent?.link ? (
              <Link to={msgContent.link.link}>{msgContent.link.label}</Link>
            ) : null}
          </span>
          <i className="ph ph-x-circle" onClick={() => setShowMsg!(false)}></i>
        </p>
      ) : null}
    </>
  );
}

export default Message;
