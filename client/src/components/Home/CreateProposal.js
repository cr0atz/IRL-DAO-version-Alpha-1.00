import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Tooltip } from "@mui/material";
import { useState, useEffect, useRef } from "react";

const CreateProposal = ({
  propose,
  handleOption,
  selectedValue,
  address,
  proposalAddress,
  handleAddress,
  amountValue,
  handleAmount,
  setMessage,
  message,
  handleMessageChange,
  handleKeypress,
  proposalErrAlert,
  isLoading,
  btnLoading,
  btnCreate
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

  const handleContainer = () => {
    if (container === true) {
      setContainer(false);
    } else {
      setContainer(true);
    }
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

  return (
    <div className="modal" id="modal1" data-animation="slideInOutLeft">
      <div className="modal-dialog">
        <header className="modal-header">
          Create Proposal
          <button className="close-modal" aria-label="close modal" data-close>
            ✕
          </button>
        </header>
        <section className="modal-content">
          <div className="">
            <div className="post-project-fields">
              <form onSubmit={propose}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="inp-field">
                      <select onChange={handleOption}>
                        <option value="0">No Execution</option>
                        <option value="1">Transfer token from treasury</option>
                        <option value="2">Mint token to my address</option>
                      </select>
                    </div>
                  </div>
                  <div className="row col-lg-7" hidden={selectedValue !== '1' && selectedValue !== '2'}>
                    <input
                      id="transfer"
                      value={selectedValue === '2' ? address : proposalAddress}
                      onChange={handleAddress}
                      type="text"
                      placeholder="Wallet Address"
                      readOnly={selectedValue === '2'} />
                  </div>
                  <div className="row col-lg-5" hidden={selectedValue !== '1' && selectedValue !== '2'}>
                    <input
                      id="mint"
                      value={selectedValue === '1' ? amountValue : "100"}
                      onChange={handleAmount}
                      type="number"
                      placeholder="Amount"
                      readOnly={selectedValue === '2'} />
                  </div>
                  <div className="col-lg-12">
                    <div className="sn-gio dropup">
                      <textarea
                        style={{ paddingRight: '35px' }}
                        id="propose"
                        name="description"
                        placeholder="Proposal Description"
                        value={message}
                        onKeyDown={handleKeypress}
                        onChange={handleMessageChange}>
                      </textarea>
                      <Tooltip placement="top" title="Select Emoji" arrow>
                        <i onClick={(() => handleContainer())} className="la la-smile-o dropbtn"></i>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <ul><p id="gio_display_error">{proposalErrAlert}</p>
                      <li>
                        <button disabled={isLoading} className="active" type="submit" value="post">
                          {isLoading ? btnLoading : btnCreate}
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        <footer className="modal-footer">
        </footer>
      </div>
      {container && (
        <div ref={wrapperRef} className="dropup-content-proposal">
          <Picker previewPosition="none" data={data} onEmojiSelect={addEmoji} />
        </div>
      )}
    </div>
  );
};
export default CreateProposal;