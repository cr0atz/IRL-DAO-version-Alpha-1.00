const DepositToken = ({
  handleDeposit,
  alertType,
  alertKind,
  alertMSG,
  currentQuorum,
  totalSuply,
  NumericFormat,
  handleDepositAmount,
  balance,
  depositValue,
  isDepositing
}) => {
  return (
    <div className="modal" id="modal3" data-animation="slideInOutLeft">
      <div style={{ maxWidth: 500 }} className="modal-dialog">
        <header className="modal-header">
          Deposit tokens into the treasury
          <button className="close-modal" aria-label="close modal" data-close>
            ✕
          </button>
        </header>
        <section className="modal-content">
          {/*<p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: inviteeStatus === 1 ? 'red' : 'green' }} id="gio_display_error">{emptyInputErr}</p>*/}

          {/*<div className="post-project-fields">
              <p>Note that when depositing your token back to the treasury be sure that you and the members has the exact amout of the token required from the quorum.</p>
            </div>*/}

          <div className="post-project-fields">
            <form onSubmit={handleDeposit}>
              <div className={`alert ${alertType}`}>
                {/*<span onClick={handleCloseAlert} className="closebtn">&times;</span>*/}
                <strong>{alertKind ? alertKind : "Note!"}</strong> {alertMSG ? alertMSG : "when depositing your tokens back to the treasury be sure that you and the members have the exact amounts of the token required from the quorum."}
              </div>
              {/*<div className="row">
                  <div className="col-lg-7">
                    <input value={daoDATA[0]?.vote ? daoDATA[0]?.vote : ""} type="text" placeholder="Treasury Address" readOnly />
                  </div>
                  <div className="col-lg-5">
                    <input type="number" placeholder="Tokens" />
                  </div>
                </div>*/}
              <div className="filter-ttl"></div>
              <div className="suggestion-usd">
                <div className="sgt-text">
                  <h4>Current Quorum</h4>
                  <span>({currentQuorum().quorumPercent}) {Number(currentQuorum().quorumCal).toLocaleString(undefined, { maximumFractionDigits: 2 })} <small style={{ fontSize: '11px' }}>{totalSuply?.symbol}</small></span>
                </div>
                {/*<span><input value={depositValue} onChange={handleDepositAmount} type="number" placeholder="Token Value" /></span>*/}
                <span><NumericFormat onChange={handleDepositAmount} isAllowed={(values) => {
                  const { formattedValue, floatValue } = values;
                  return formattedValue === "" || floatValue <= balance?.displayValue;
                }} value={depositValue} allowLeadingZeros thousandSeparator="," placeholder="Token Value" required /></span>
              </div>
              <div className="filter-ttl"></div>
              <div className="col-lg-12">
                <ul>
                  <li>
                    <button disabled={isDepositing} className="active" type="submit">
                      {isDepositing ? (<><i className="fas fa-sync fa-spin"></i><b> Depositing...</b></>) : (<><i className="fas fa-sync"></i><b> Deposit</b></>)}
                    </button>
                  </li>
                </ul>
              </div>
            </form>
          </div>

        </section>
        <footer className="modal-footer">
        </footer>
      </div>
    </div >
  );
};
export default DepositToken;