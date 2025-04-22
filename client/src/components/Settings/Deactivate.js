import { useState, useEffect, useRef } from "react";
import { Tooltip } from "@mui/material";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const Deactivate = ({
  selectedTab,
  requestKind,
  _requestAlert,
  sending,
  sendRequest,
  handleEmail,
  handleMessage,
  handleKeypress,
  message,
  setMessage
}) => {

  const [container, setContainer] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMessage(message + emoji);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setContainer(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const handleContainer = () => {
    if (container === true) {
      setContainer(false);
    } else {
      setContainer(true);
    }
  };

  return (
    <div className={selectedTab === "deactivate" ? "tab-pane fade show active" : "tab-pane fade"} id="nav-deactivate" role="tabpanel" aria-labelledby="nav-deactivate-tab">
      <div className="acc-setting">
        <h3>Deactivate DAO</h3>
        <form onSubmit={sendRequest}>
          <div className="cp-field">
            <h5>Email</h5>
            <div className="cpp-fiel">
              <input onChange={handleEmail} type="text" name="email" placeholder="Email" required />
              <i className="fa fa-envelope"></i>
            </div>
          </div>
          <div className="cp-field">
            <h5>Please Explain Further</h5>
            <div className="sn-gio dropup">
              <textarea
                id="request-textarea"
                placeholder="Your message here"
                value={message}
                onKeyDown={handleKeypress}
                onChange={handleMessage}>
              </textarea>
              <Tooltip placement="top" title="Select Emoji" arrow>
                <i onClick={(() => handleContainer())} className="la la-smile-o dropbtn"></i>
              </Tooltip>
              {container && (
                <div ref={wrapperRef} className="dropup-content-request">
                  <Picker previewPosition="none" data={data} onEmojiSelect={addEmoji} />
                </div>
              )}
            </div>
          </div>
          <div className="save-stngs pd3">
            <ul><p style={{ color: requestKind }} id="gio_display_error">{_requestAlert}</p>
              <li>
                <button type="submit"><i className={sending ? "fas fa-sync fa-spin" : "fas fa-paper-plane"}></i> {sending ? "Sending..." : "Send"}</button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Deactivate;