import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
var CryptoJS = require("crypto-js");

const DAOs = ({
  filteredData,
  adminAccount,
  tabLink,
  moment,
  handleRestore,
  handleGenerate,
  handleDeactivate,
}) => {
  return (
    <div className="companies-list">
      <div className="row">
        {filteredData.map((val, index) => {
          var ciphertext = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(val.editiondrop + "," + val.token + "," + val.vote), process.env.REACT_APP_SECRET_KEY).toString());
          const imgsrc = "/uploads/" + val.dao_image;
          return (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6">
              <div className="company_profile_info">
                <div className="company-up-info">
                  <img src={imgsrc} alt="" />
                  <h3>{val.dao_name}</h3>
                  <h4>{moment.utc(val.datetime).local().startOf('seconds').fromNow()}</h4>
                  <ul>
                    <li>
                      <Tooltip placement="bottom" title="DAO Members" arrow>
                        <a className="message-us gio_default1_property"><i className="fas fa-user-friends"></i> {val.members ? val.members : '0'}</a>
                      </Tooltip>
                    </li>
                    {adminAccount?.DAOs && tabLink !== "deactivated" ? (
                      <li>
                        <Tooltip placement="bottom" title="Deactivate DAO" arrow>
                          <button onClick={(() => { handleDeactivate(val.id, val.creation_id, val.dao_name); })} style={{ backgroundColor: 'tomato' }} className="message-us gio_default_property"><i className="fas fa-ban"></i></button>
                        </Tooltip>
                      </li>
                    ) : adminAccount?.DAOs && tabLink === "deactivated" && (
                      <li>
                        <Tooltip placement="bottom" title="Restore DAO" arrow>
                          <button onClick={(() => { handleRestore(val.id, val.creation_id, val.dao_name); })} style={{ backgroundColor: '#5dbb63' }} className="message-us gio_default_property"><i className="fas fa-reply-all"></i></button>
                        </Tooltip>
                      </li>
                    )}
                  </ul>
                </div>
                {tabLink === "deactivated" ? (
                  <a>This DAO is Deactivated</a>
                ) : (
                  <Link
                    onClick={() => {
                      handleGenerate(
                        val.id,
                        val.link_created,
                        val.dao_link,
                        ciphertext);
                    }}>
                    Enter DAO <i className="fas fa-sign-in-alt"></i>
                  </Link>
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};
export default DAOs;