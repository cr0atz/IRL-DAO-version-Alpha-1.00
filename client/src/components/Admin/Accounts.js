import { Tooltip } from "@mui/material";

const Accounts = ({
  address,
  selectedTab,
  filteredData,
  _copyAddress,
  adminWallet,
  checkingIfValidAdminWallet,
  copyAddress,
  handleDelete,
  handleOptions,
  shortenDisplay,
  handleAdminAlias,
  searchNameHandler,
  handleAdminWallet,
  handleAdminSwitch,
  filterStatusHandler,
}) => {
  return (
    <div
      className={selectedTab === "accounts" ? "tab-pane fade show active" : "tab-pane fade"}
      id="nav-acc"
      role="tabpanel"
      aria-labelledby="nav-acc-tab">
      <div className="acc-setting">
        <h3>Admin Accounts</h3>
        <h3>
          <div className="filter-dd">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-8">
                <form>
                  <input onChange={searchNameHandler} style={{ color: 'black' }} type="text" name="search-skills" placeholder="Search for admin name, wallet address or status (active / disabled)" />
                </form>
              </div>
              <div className="ccol-lg-3 col-md-3 col-sm-4">
                <form className="job-tp">
                  <select onChange={filterStatusHandler} style={{ color: 'black' }}>
                    <option value="0">Select Status</option>
                    <option value="1">Disabled</option>
                    <option value="2">Active</option>
                  </select>
                  <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </form>
              </div>
            </div>
          </div>
        </h3>
        {filteredData?.map((admins, idx) => {
          const optionnLenght = admins.controls + admins.accounts + admins.requests + admins.DAOs;
          return (
            <div key={idx}>
              {admins.wallet === address ? (<></>) : (
                <div className="notbar single-article">
                  <Tooltip placement="top" title="Click to edit name" arrow>
                    <b
                      id="alias"
                      data-id={admins.id}
                      onInput={handleAdminAlias}
                      suppressContentEditableWarning={true}
                      contentEditable={true}
                      style={{ fontFamily: 'Trebuchet MS', fontWeight: 'bold', color: '#4682B4' }}>
                      {admins.alias ? admins.alias : admins.wallet}
                    </b>
                  </Tooltip>
                  <p>
                    <Tooltip placement="bottom" title="Click to copy address" arrow>
                      <b onClick={(() => { copyAddress(admins.wallet, idx); })} className="gio_link">
                        {shortenDisplay(admins.wallet)} <i className={_copyAddress.has(idx) ? "fas fa-check-circle" : "fas fa-clone"}></i>
                      </b>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Delete admin" arrow>
                      <b onClick={(() => { handleDelete(admins.id); })} className="gio_link"> <i style={{ color: 'tomato' }} className="fas fa-trash"></i></b>
                    </Tooltip>
                  </p>
                  <p className="powers">
                    <b className={admins.accounts ? 'power' : ''}>{admins.accounts ? 'Accounts' : ''}</b>
                    <b className={admins.controls ? 'power' : ''}>{admins.controls ? 'Controls' : ''}</b>
                    <b className={admins.creates ? 'power' : ''}>{admins.creates ? 'Create' : ''}</b>
                    <b className={admins.DAOs ? 'power' : ''}>{admins.DAOs ? 'DAOs' : ''}</b>
                    <b className={admins.requests ? 'power' : ''}>{admins.requests ? 'Request' : ''}</b>
                  </p>
                  <div className="toggle-btn">
                    <div className="custom-control custom-switch">
                      <input onChange={handleAdminSwitch} data-id={admins.id} checked={admins.isActive} className="custom-control-input" type="checkbox" id={`adminAccSwitch${admins.id}`} />
                      <label className="custom-control-label" htmlFor={`adminAccSwitch${admins.id}`}></label>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="row">
                    <div className="col-12">
                      <div className="dropdown privacydropd">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">Admin Power Option</a>
                        <div className="dropdown-menu">
                          <p>These are the admin options that can be activated when checked.</p>
                          <div className="row">
                            <form className="radio-form">
                              <div className="custom-control custom-radio">

                                <label className="custom-control-label gio_link" htmlFor={`adminAccounts${admins.id}`}>
                                  <input onChange={handleOptions} data-id={admins.id} checked={admins.accounts} id={`adminAccounts${admins.id}`} value="accounts" className="gio_link" type="checkbox" />
                                  Accounts
                                </label>
                              </div>
                              <div className="custom-control custom-radio">
                                <label className="custom-control-label gio_link" htmlFor={`adminControls${admins.id}`}>
                                  <input onChange={handleOptions} data-id={admins.id} checked={admins.controls} id={`adminControls${admins.id}`} value="controls" className="gio_link" type="checkbox" />
                                  Controls
                                </label>
                              </div>
                              <div className="custom-control custom-radio">
                                <label className="custom-control-label gio_link" htmlFor={`adminCreate${admins.id}`}>
                                  <input onChange={handleOptions} data-id={admins.id} checked={admins.creates} id={`adminCreate${admins.id}`} value="creates" className="gio_link" type="checkbox" />
                                  Create
                                </label>
                              </div>
                              <div className="custom-control custom-radio">
                                <label className="custom-control-label gio_link" htmlFor={`adminDAOs${admins.id}`}>
                                  <input onChange={handleOptions} data-id={admins.id} checked={admins.DAOs} id={`adminDAOs${admins.id}`} value="DAOs" className="gio_link" type="checkbox" />
                                  DAOs
                                </label>
                              </div>
                              <div className="custom-control custom-radio">
                                <label className="custom-control-label gio_link" htmlFor={`adminRequests${admins.id}`}>
                                  <input onChange={handleOptions} data-id={admins.id} checked={admins.requests} id={`adminRequests${admins.id}`} value="requests" className="gio_link" type="checkbox" />
                                  Request
                                </label>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div className="search_form">
          <form>
            <input id="admin_wallet" onChange={handleAdminWallet} value={adminWallet} type="text" placeholder="Insert wallet address here" />
            <button type="submit" disabled>
              <i className={checkingIfValidAdminWallet ? "fas fa-sync fa-spin" : "fas fa-wallet"}></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Accounts;