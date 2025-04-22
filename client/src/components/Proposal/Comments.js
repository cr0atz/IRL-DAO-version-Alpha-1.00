import { Tooltip } from "@mui/material";

const Comments = ({
  address,
  commentList,
  moment,
  deleteComment,
  updateComment,
  shortenAddress,
}) => {
  return (
    <div className="comment-sec">
      <ul>
        {commentList?.map((val, idx) => {
          return (
            <li key={idx}>
              {val.comments.user_wallet_address === address ? (
                <>
                  <Tooltip placement="top" title="Delete Content" arrow>
                    <a onClick={() => { deleteComment(val.comments.id, val.comments.user_wallet_address); }} id="mini_button_delete"><i className="fa fa-trash" aria-hidden="true"></i></a>
                  </Tooltip>
                  <Tooltip placement="top" title="Edit Content" arrow>
                    <a onClick={() => { updateComment(val.comments.id, val.comments.comment); }} id="mini_button_update"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                  </Tooltip>
                </>
              ) : (
                <Tooltip placement="top" title="Report" arrow>
                  <a id="mini_button_report"><i className="fa fa-info-circle" aria-hidden="true"></i></a>
                </Tooltip>
              )}
              <div className="comment-list">
                <div className="bg-img">
                  <img style={{ backgroundColor: 'gainsboro' }} width={40} height={40} src={val.profile?.avatar ? val.profile?.avatar : "/uploads/unknown.PNG"} alt="" />
                </div>
                <div className="comment">
                  <h3>{val.profile?.name ? val.profile?.name : shortenAddress(val.comments.user_wallet_address)}</h3>
                  <span><img src="/assets/images/clock.png" alt="" /> {moment.utc(val.comments.datetime).local().startOf('seconds').fromNow()}</span>
                  <p style={{ whiteSpace: 'pre-wrap' }} id="comment_gio_font">{val.comments.comment}{(() => {
                    if (val.comments.isEdited === 1) {
                      return (
                        <small title={moment(val.comments.datetime_edited).format('MMMM D, yyyy h:mm a')} id="gio_edited"> (edited)</small>
                      );
                    }
                  })()}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Comments;