import LoadEffect from "../../LoadEffect";

const Profile = ({
  address,
  selectedTab,
  avatarsLoading,
  handleOpenedModal,
  daoDATA,
  avatars,
  profile,
  shortenAddress,
  inputName,
  handleName,
  setName,
  nameIsLoading,
  nameResult,
}) => {
  return (
    <div className={selectedTab === "profile" ? "tab-pane fade show active" : "tab-pane fade"} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
      <div className="acc-setting">
        <h3>Profile Settings</h3>
        <form onSubmit={async (e) => { e.preventDefault(); }}>
          {avatarsLoading ? (
            <>
              <div className="cp-field">
                <LoadEffect />
              </div>
            </>
          ) : (
            <>
              <div className="cp-field">
                <div className="requests-list">
                  <div className="request-info">
                    <span><h5>NFT Avatars <p>(NFT collections will be displayed here.)</p></h5></span>
                  </div>
                  <div className="accept-feat">
                    <div className="cpp-fiel gio_input_name">
                      <button className="accept-req hand_pointer" data-open="modal4">Add Avatar</button>
                    </div>
                  </div>
                </div>
                <div className="request-details">
                  <div className="gio-pf-gallery">
                    <ul>
                      <li>
                        <a onClick={(() => handleOpenedModal("/uploads/default/Jane.png", address, daoDATA[0]?.vote))} data-open="modal3">
                          <img width={70} height={250} style={{ backgroundColor: 'gainsboro' }} src="/uploads/default/Jane.png" className="hand_pointer" alt="" />
                        </a>
                      </li>
                      <li>
                        <a onClick={(() => handleOpenedModal("/uploads/default/D0e.png", address, daoDATA[0]?.vote))} data-open="modal3">
                          <img width={70} height={250} style={{ backgroundColor: 'gainsboro' }} src="/uploads/default/D0e.png" className="hand_pointer" alt="" />
                        </a>
                      </li>
                      <li>
                        <a onClick={(() => handleOpenedModal("/uploads/default/NotME.png", address, daoDATA[0]?.vote))} data-open="modal3">
                          <img width={70} height={250} style={{ backgroundColor: 'gainsboro' }} src="/uploads/default/NotME.png" className="hand_pointer" alt="" />
                        </a>
                      </li>
                      {avatars?.map((imgData, idx) => {
                        return (
                          <li key={idx}>
                            <a onClick={(() => handleOpenedModal(imgData.avatar, imgData.wallet, imgData.vote))} data-open="modal3">
                              <img width={70} height={250} style={{ backgroundColor: 'gainsboro' }} src={imgData.avatar} className="hand_pointer" alt="" />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="requests-list">
                  <div className="request-details">
                    <div className="noty-user-img">
                      <img style={{ backgroundColor: 'gainsboro' }} src={profile[0]?.avatar ? profile[0]?.avatar : "/uploads/unknown.PNG"} alt="" />
                    </div>
                    <div className="request-info">
                      <h3>{profile[0]?.name ? profile[0]?.name : "ImREAL User"}</h3>
                      <span>{shortenAddress(address)}</span>
                    </div>
                    <div className="accept-feat">
                      <div className="cpp-fiel gio_input_name">
                        <input value={inputName} onChange={handleName} type="text" id="setname" placeholder="New Name (max 20 char.)" />
                        <i className="fas fa-user-edit"></i>
                      </div>
                    </div>

                  </div>
                  <div className="accept-feat">
                    <div className="gio_btn_name">
                      <button onClick={(() => { setName(); })} className="accept-req hand_pointer" disabled={nameIsLoading || nameResult}>
                        <i className={nameIsLoading ? "fas fa-sync fa-spin" : nameResult === "success" ? "fas fa-check-circle" : "fas fa-sync"}>
                        </i> {nameIsLoading ? "Saving..." : nameResult === "success" ? "Saved" : "Save Name"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="save-stngs pd3">
          </div>
        </form>
      </div>
    </div>
  );
};
export default Profile;