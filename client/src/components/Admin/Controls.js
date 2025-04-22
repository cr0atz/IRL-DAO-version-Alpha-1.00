const Controls = ({
  selectedTab,
  histories,
  ImREALConfig,
  tokenBalance,
  totalSupply,
  webWalletVal,
  checkingIfValidWallet,
  contractAddressVal,
  checkingIfValidContract,
  RPCURLVal,
  handleRPCURL,
  handleExecVal,
  handleClaimVal,
  historyClicked,
  shortenDisplay,
  handleWebWallet,
  handleExecSwitch,
  handleContractAddress,
}) => {
  return (
    <div
      className={selectedTab === "control" && !histories ? "tab-pane fade show active" : "tab-pane fade"}
      id="nav-control"
      role="tabpanel"
      aria-labelledby="nav-control-tab">
      <div className="acc-setting">
        <h3>DAO Controls</h3>
        <form>
          <div className="profile-bx-details">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="profile-bx-info">
                  <div className="pro-bx">
                    <div className="bx-info">
                      <h3>
                        <span suppressContentEditableWarning="true">
                          <a
                            id="exec_val"
                            onInput={handleExecVal}
                            suppressContentEditableWarning={true}
                            contentEditable={true}>
                            {Number(ImREALConfig[0]?.ImREAL_execVal).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </a>
                          <small style={{ fontSize: '11px' }}> {tokenBalance?.symbol}</small>
                        </span>
                      </h3>
                      <h5>Exec Value</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="profile-bx-info">
                  <div className="pro-bx">
                    <div className="bx-info">
                      <h3>
                        <span>
                          <a
                            id="claim_val"
                            onInput={handleClaimVal}
                            suppressContentEditableWarning={true}
                            contentEditable={true}>
                            {Number(ImREALConfig[0]?.ImREAL_claimVal).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </a>
                          <small style={{ fontSize: '11px' }}> {tokenBalance?.symbol}</small>
                        </span>
                      </h3>
                      <h5>Claim Value</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="profile-bx-info">
                  <div className="pro-bx">
                    <div className="bx-info">
                      <h3>
                        <span>
                          {Number(tokenBalance?.displayValue).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          <small style={{ fontSize: '11px' }}> {tokenBalance?.symbol}</small>
                        </span>
                      </h3>
                      <h5>Token Balance</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className="profile-bx-info">
                  <div className="pro-bx">
                    <div className="bx-info">
                      <h3>
                        <span>
                          {Number(totalSupply?.displayValue).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          <small style={{ fontSize: '11px' }}> {totalSupply?.symbol}</small>
                        </span>
                      </h3>
                      <h5>Total Supply</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="notbar">
            <h4>Token Transaction Histories</h4>
            <p>This will give a view to all "Token Contract" transaction histories.</p>
            <div className="toggle-btn">
              <div className="custom-control custom-switch link_effect">
                <a onClick={historyClicked}>View transaction histories</a>
              </div>
            </div>
          </div>
          <div className="notbar">
            <h4>Execution Payment</h4>
            <p>DAO proposals that have execution will pay the value stated above "Exec Value" if this switch is on.</p>
            <div className="toggle-btn">
              <div className="custom-control custom-switch">
                <input onChange={handleExecSwitch} defaultChecked={ImREALConfig[0]?.execVal_status} type="checkbox" className="custom-control-input" id="execValSwitch0" />
                <label className="custom-control-label" htmlFor="execValSwitch0"></label>
              </div>
            </div>
          </div>
          <div className="notbar">
            <div className="suggestion-usd">
              <div className="sgt-text">
                <h4>Web Wallet</h4>
                <span>{shortenDisplay(ImREALConfig[0]?.ImREAL_wallet)}</span>
              </div>
              <span>
                <div className="gsearch-bar">
                  <span>
                    <input
                      id="web_wallet"
                      onChange={handleWebWallet}
                      value={webWalletVal}
                      className="form-control"
                      type="text"
                      placeholder="New Wallet Address"
                    />
                    <button type="submit" disabled>
                      {checkingIfValidWallet ? (
                        <b className="fas fa-sync fa-spin"></b>
                      ) : (
                        <b className="fas fa-wallet"></b>
                      )}
                    </button>
                  </span>
                </div>
              </span>
            </div>
          </div>
          <div className="notbar">
            <div className="suggestion-usd">
              <div className="sgt-text">
                <h4>Token Contract</h4>
                <span>{shortenDisplay(ImREALConfig[0]?.ImREAL_token)}</span>
              </div>
              <span>
                <div className="gsearch-bar">
                  <span>
                    <input
                      id="contract_address"
                      onChange={handleContractAddress}
                      value={contractAddressVal}
                      className="form-control"
                      type="text"
                      placeholder="New Token Contract"
                    />
                    <button type="submit" disabled>
                      {checkingIfValidContract ? (
                        <b className="fas fa-sync fa-spin"></b>
                      ) : (
                        <b className="fas fa-file-contract"></b>
                      )}
                    </button>
                  </span>
                </div>
              </span>
            </div>
          </div>
          <div className="notbar">
            <div className="suggestion-usd">
              <div className="sgt-text">
                <h4>Web RPC</h4>
                <span>{shortenDisplay(ImREALConfig[0]?.ImREAL_RPC)}</span>
              </div>
              <span>
                <div className="gsearch-bar">
                  <span>
                    <input id="rpc_url" onChange={handleRPCURL} value={RPCURLVal} className="form-control" type="text" placeholder="New RPC URL" />
                    <button type="submit" disabled>
                      <b className="fas fa-network-wired"></b>
                    </button>
                  </span>
                </div>
              </span>
            </div>
          </div>
          <div className="save-stngs">
          </div>
        </form>
      </div>
    </div>
  );
};
export default Controls;