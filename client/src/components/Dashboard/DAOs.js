import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
var CryptoJS = require("crypto-js");

const DAOs = ({
  filteredData,
  adminAccount,
  moment,
  handleModal,
  handleGenerate,
}) => {
  return (
    <div className="companies-list">
      <div className="row">
        {filteredData.map((val, index) => {
          const imgsrc = "/uploads/" + val.dao_image;
          var ciphertext = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(val.editiondrop + "," + val.token + "," + val.vote), process.env.REACT_APP_SECRET_KEY).toString());
          return (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6">
              <div className="company_profile_info">
                <div className="company-up-info">
                  <img src={imgsrc} alt="" />
                  <h3 style={{ marginLeft: '1px' }}>{val.dao_name} <i style={{ color: 'goldenrod' }} className={val.owned === 1 ? "fas fa-crown" : ""}></i></h3>
                  <h4>{moment.utc(val.datetime).local().startOf('seconds').fromNow()}</h4>
                  <ul>
                    <li>
                      <Tooltip placement="bottom" title="DAO Members" arrow>
                        <a className="message-us gio_default1_property"><i className="fas fa-user-friends"></i> {val.members ? val.members : '0'}</a>
                      </Tooltip>
                    </li>
                    {!!adminAccount?.DAOs && val.owned === 1 && (
                      <>
                        <li>
                          <Tooltip placement="bottom" title="Transfer DAO and Tokens" arrow>
                            <button
                              style={{/* backgroundColor: '#4BB543' */ }}
                              onClick={(() => {
                                handleModal(
                                  "modal4",
                                  val.wallet,
                                  val.id,
                                  val.creation_id,
                                  val.creationData.token_img,
                                  val.token,
                                  val.creationData.token_transfer,
                                  val.vote,
                                );
                              })}
                              className="message-us gio_default_property">
                              <i className="fas fa-hand-holding-water"></i>
                            </button>
                          </Tooltip>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <Link
                  onClick={() => {
                    handleGenerate(
                      val.id,
                      val.link_created,
                      val.dao_link,
                      ciphertext
                    );
                  }}>
                  Enter DAO <i className="fas fa-sign-in-alt"></i>
                </Link>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};
export default DAOs;