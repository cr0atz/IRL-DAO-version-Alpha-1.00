import LoadEffect from "../../LoadEffect";

const Transfer = ({
  alertType,
  alertKind,
  alertMSG,
  tokenIMG,
  tokenBalance,
  tokenShare,
  isTransfering,
  tokenBalanceLoading,
  transferDAO,
  handleNewOwner,
}) => {

  function chekVal() {
    if (tokenShare < 0) {
      return 0;
    } else {
      return tokenShare;
    }
  }

  return (
    <div className="modal" id="modal4" data-animation="slideInOutLeft">
      <div style={{ maxWidth: 500 }} className="modal-dialog">
        <header className="modal-header">
          Transfer DAO and Tokens
          <button className="close-modal" aria-label="close modal" data-close>
            ✕
          </button>
        </header>
        <section className="modal-content">

          <div className="post-project-fields">
            <form onSubmit={transferDAO}>
              <div className={`alert ${alertType}`}>
                <strong>{alertKind ? alertKind : "Note!"}</strong> {alertMSG ? alertMSG : "Make sure that the wallet address is valid."}
              </div>
              <div className="filter-ttl"></div>
              <div className="suggestion-usd">
                {tokenBalanceLoading ? (
                  <LoadEffect />
                ) : (
                  <>
                    <div className="noty-user-img">
                      <img src={`/uploads/${tokenIMG}`} alt="" />
                    </div>
                    <div className="sgt-text">
                      <h4>{tokenBalance?.name}</h4>
                      <span>{Number(chekVal()).toLocaleString(undefined, { maximumFractionDigits: 2 })} <small style={{ fontSize: '10px' }}>{tokenBalance?.symbol}</small></span>
                    </div>
                    <span>
                      <input onChange={handleNewOwner} type="text" placeholder="New Owner Wallet Address" />
                    </span>
                  </>
                )}
                <div className="filter-ttl"></div>
              </div>
              <ul>
                <li>
                  <button className="active" type="submit" disabled={isTransfering}>
                    {isTransfering ? (<><i className="fas fa-sync fa-spin"></i><b> Transfering...</b></>) : (<><i className="fas fa-sync"></i><b> Transfer</b></>)}
                  </button>
                </li>
              </ul>
            </form>
          </div>

        </section>
        <footer className="modal-footer">
        </footer>
      </div>
    </div>
  );
};
export default Transfer;