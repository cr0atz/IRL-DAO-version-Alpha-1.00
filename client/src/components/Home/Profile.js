import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';

const Profile = ({
  profile,
  copyWalletAddress,
  address,
  _copyWalletAddress,
  proposedCount,
  dataCreation,
  balance,
  copyContract,
  DATOS,
  _copyContract,
  addToken,
  daoDATA
}) => {

  // A fancy function to shorten someones wallet address, no need to show the whole thing.
  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  return (
    <div className="user-data full-width">
      <div className="user-profile">
        <div className="username-dt">
          <div className="usr-pic">
            {/*<img src="/assets/images/unknown.png" alt="" />*/}
            {/*<img style={{ with: '271', height: "100%" }} src={profile?.length === 0 ? "/uploads/unknown.PNG" : profile[0]?.avatar === null ? "/uploads/unknown.PNG" : profile[0].avatar} alt="" />*/}
            <img style={{ backgroundColor: 'gainsboro', with: '271', height: "100%" }} src={profile[0]?.avatar ? profile[0]?.avatar : "/uploads/unknown.PNG"} alt="" />
          </div>
        </div>
        <div className="user-specs">
          {/*<h3>{profile?.length === 0 ? "ImREAL User" : profile[0]?.name === null ? "ImREAL User" : profile[0]?.name}</h3>*/}
          <h3>{profile[0]?.name ? profile[0]?.name : "ImREAL User"}</h3>
          <Tooltip placement="bottom" title="Copy wallet address" arrow>
            <p className="gio_meta icon-icon" onClick={copyWalletAddress}>
              {shortenAddress(address) + " "}
              <i className={_copyWalletAddress ? "fas fa-check-circle" : "fas fa-clone"}></i>
            </p>
          </Tooltip>
          {/*<span>{shortenAddress(address)}</span>*/}
        </div>
      </div>
      <ul className="user-fw-status">
        <li>
          <h4><span>{proposedCount}</span> <a>Proposed</a></h4>
        </li>
        {dataCreation?.map((creation_token, idx) => {
          return (
            <li key={idx}>
              <h4><span>{Number(balance?.displayValue).toLocaleString(undefined, { maximumFractionDigits: 2 })} </span> <a>{balance?.symbol}</a></h4>
              <div className="img-div">
                <Tooltip placement="bottom" title="Copy contract address" arrow>
                  <p className="gio_meta icon-icon" onClick={copyContract}>
                    {shortenAddress(DATOS[1]) + " "}
                    <i className={_copyContract ? "fas fa-check-circle" : "fas fa-clone"}></i>
                  </p>
                </Tooltip>
                <Tooltip placement="bottom" title="Register token to metamask" arrow>
                  <img onClick={() => { addToken(creation_token.token_img, creation_token.token_symbol); }} className="img-img gio_meta" src="/assets/images/metamask.png" alt="" />
                </Tooltip>
              </div>
            </li>
          );
        })}
        <li>
          <Link
            to={`/settings?link=${daoDATA[0]?.dao_link}&tab=profile`}
          >Profile Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Profile;