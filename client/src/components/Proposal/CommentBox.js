import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Tooltip } from "@mui/material";
import { useState, useEffect, useRef } from "react";

const CommentBox = ({
  commenterProfile,
  comment,
  submitComment,
  btnSubmitting,
  btnSubmit,
  emptyBoxErr,
  setComment,
  postComment,
  handleKeypress,
}) => {

  const [container, setContainer] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
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
    <div className="post-comment-box">
      <div className="user-poster">
        <div className="usr-post-img">
          <img style={{ backgroundColor: 'gainsboro' }} width={50} height={50} src={commenterProfile[0]?.avatar ? commenterProfile[0]?.avatar : "/uploads/unknown.PNG"} alt="" />
        </div>
        <div className="post_comment_sec">
          <form onSubmit={postComment}>
            <div className="sn-gio dropup">
              <textarea
                id="comment_area"
                className="comment-textarea"
                placeholder="Your Comment"
                value={comment}
                onKeyDown={handleKeypress}
                onChange={(e) => { setComment(e.target.value); }}>
              </textarea>
              <Tooltip placement="top" title="Select Emoji" arrow>
                <i onClick={(() => handleContainer())} className="la la-smile-o dropbtn"></i>
              </Tooltip>
              {container && (
                <div ref={wrapperRef} className="dropup-content">
                  <Picker previewPosition="none" data={data} onEmojiSelect={addEmoji} />
                </div>
              )}
            </div>
            <button type="submit" disabled={submitComment}>{submitComment ? btnSubmitting : btnSubmit}</button>
            <p id="gio_display_error">{emptyBoxErr}</p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CommentBox;