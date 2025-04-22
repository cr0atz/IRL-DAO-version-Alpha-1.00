import Tooltip from '@mui/material/Tooltip';

const Wallet = ({
  address,
  _copyAddress,
  ImREAL_token,
  ImREALToken,
  isWholeNumIMREAL,
  copyAddress,
  shortenAddress,
  disconnectWallet,
  usingMetamaskWallet,
  usingWalletConnect,
}) => {
  return (
    <div className="user-account">
      <Tooltip placement="top" title={address ? "Wallet Connected" : "Click to Connect Wallet"} followCursor arrow>
        <div className="user-info hand_pointer">
          {address ? <></> : <img style={{ width: '30px', height: "100%" }} src="/assets/images/wallet_white.png" alt="" />}
          <a>{address ? "Connected" : "Wallet"}</a>
          {address ? <i className="la la-sort-down"></i> : <></>}
        </div>
      </Tooltip>
      {address ? (
        <div className="user-account-settingss">
          <h3 className="tc">
            <Tooltip placement="top" title="Click to copy address" arrow>
              <p onClick={copyAddress} className="gio_link"><a>{shortenAddress(address)}</a> <i className={_copyAddress ? "fas fa-check-circle" : "fas fa-clone"}></i></p>
            </Tooltip>
          </h3>
          <ul className="on-off-status">
            <li>
              <img width={35} height={35} src="/assets/images/ImRealToken.png" alt="" />
              <div className="sgt-text">
                <h3><b>{ImREAL_token?.name}</b></h3>
                <span>{Number(ImREALToken).toLocaleString(undefined, { maximumFractionDigits: isWholeNumIMREAL })} <small style={{ fontSize: '10px' }}>({ImREAL_token?.symbol})</small></span>
              </div>
            </li>
          </ul>
          <ul className="us-links">
            <li><a href="/account" title="">Setting</a></li>
          </ul>
          <h3 onClick={() => disconnectWallet().finally(() => { window.location.href = "/"; })} className="tc hand_pointer">
            Log out <i className="fas fa-sign-out-alt"></i>
          </h3>
        </div>
      ) : (
        <>
          <div className="user-account-settingss">
            <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Connect Wallet</h3>
            <div className="search_form">
              <form
                onSubmit={((e) => { e.preventDefault(); })}
                onClick={() => usingMetamaskWallet().then((err) => {
                  if (err.error?.name === "UserRejectedRequestError") {
                    return;
                  } else {
                    //setConnection("Metamask");
                    sessionStorage.setItem("connection", "Metamask");
                    window.location.href = '/dashboard';
                  }
                })}>
                <input className="hand_pointer" value="Metamask" readOnly />
                <button type="submit"><img style={{ width: '35px', height: "100%" }} src="/assets/images/metamask.png"></img></button>
              </form>
            </div>
            <div className="search_form">
              <form
                onSubmit={((e) => { e.preventDefault(); })}
                onClick={() => usingWalletConnect().then((err) => {
                  //console.log("GioData ", err);
                  if (err.error?.name === "UserRejectedRequestError") {
                    return;
                  } else {
                    //setConnection("WalletConnect");
                    sessionStorage.setItem("connection", "WalletConnect");
                    window.location.href = '/dashboard';
                  }
                })}>
                <input className="hand_pointer" value="WalletConnect" readOnly />
                <button type="submit"><img style={{ width: '35px', height: "100%" }} src="/assets/images/walletconnect.png"></img></button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Wallet;