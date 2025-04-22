import { Tooltip } from "@mui/material";

const Propose = ({
  dataCreation,
  balance
}) => {
  return (
    <div className="post-topbar">
      <div className="user-picy">
        <img style={{ width: '50px', height: "100%" }} src={"/uploads/" + dataCreation[0]?.vote_img} alt="" />
      </div>
      <div className="post-st">
        <ul>
          <li>
            <Tooltip placement="top" title={parseInt(balance?.displayValue) < parseInt(dataCreation[0].token_threshhold) ? "you dont have power to propose" : "Click to create proposal"} arrow>
              <span>
                {/*<button style={parseInt(balance?.displayValue) < parseInt(dataCreation[0].token_threshhold) ? { backgroundColor: 'gray' } : { cursor: 'pointer' }} disabled={parseInt(balance?.displayValue) < parseInt(dataCreation[0].token_threshhold)} className="open-modal" data-open="modal1" type="button" value="post">
                Create Proposal
                </button>*/}
                {parseInt(balance?.displayValue) < parseInt(dataCreation[0].token_threshhold) ? (
                  <a><i className="fas fa-file-signature"></i></a>
                ) : (
                  <a className="post_project active" style={{ cursor: 'pointer' }} data-open="modal1"><i className="fas fa-file-signature"></i></a>
                )}
              </span>
            </Tooltip>
          </li>
          {/*<li>
          <Tooltip placement="top" title="Reload" arrow>
          <span onClick={refreshing ? emptyFunction : handleReload} className="gio_default_property">
          <a className={refreshing ? "post_project active" : "post_project"} title=""><i className={refreshing ? "fas fa-sync fa-spin" : "fas fa-sync"} ></i></a>
          </span>
          </Tooltip>
          </li>*/}
        </ul>
      </div>
    </div>
  );
};
export default Propose;