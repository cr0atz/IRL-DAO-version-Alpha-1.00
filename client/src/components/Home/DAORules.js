import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

const DAORules = ({
  dataCreation,
  copyGovernanceAddress,
  shortenAddress,
  creationWallet,
  _copyGovernanceAddress,
  daoDATA
}) => {
  return (
    <div className="widget widget-about">
      <div>
        <img style={{ width: '86px', height: "100%" }} src={"/uploads/" + dataCreation[0]?.vote_img} alt="" />
        <h3>{dataCreation[0]?.vote_name}</h3>
        <span className="gio_meta">
          <Tooltip placement="bottom" title="Copy creator address" arrow>
            <a onClick={() => { copyGovernanceAddress(dataCreation[0]?.sdk_wallet); }}>
              {shortenAddress(creationWallet) + " "}
              <i className={_copyGovernanceAddress ? "fas fa-check-circle" : "fas fa-clone"}></i>
            </a>
          </Tooltip>
        </span>
        <div className="sign_link">
          <Link
            style={{ fontWeight: '600' }}
            to={`/settings?link=${daoDATA[0]?.dao_link}&tab=rules`}
          >About DAO Rules</Link>
        </div>
      </div>
    </div>
  );
};

export default DAORules;