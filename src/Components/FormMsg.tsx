import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShowMsgContext } from "../Context";

interface IProps {
  message: string;
  link?: string;
}

function FormMsg({ message, link }: IProps) {
  const { showMsg, setShowMsg } = useContext(ShowMsgContext);
  return (
    <>
      {showMsg ? (
        <p className="form-msg">
          <span>
            {message}
            {link ? <Link to={link}>See it here.</Link> : null}
          </span>
          <i className="ph ph-x-circle" onClick={() => setShowMsg!(false)}></i>
        </p>
      ) : null}
    </>
  );
}

export default FormMsg;
