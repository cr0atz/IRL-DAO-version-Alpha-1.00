const Governance = ({
  totalSuply,
  supplyBalance,
  address,
  balance
}) => {
  return (
    <div className="widget filter-secs full-width">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="filter-heading sd-title">
        <h3>Governance Token</h3>
      </div>
      <div className="paddy">
        <div className="filter-dd">
          <div className="filter-ttl">
            <h3>{Number(totalSuply?.displayValue).toLocaleString(undefined, { maximumFractionDigits: 2 })} <small style={{ fontSize: '11px' }}>{totalSuply?.symbol}</small></h3>
            <a title="">Total Supply</a>
          </div>
        </div>
      </div>

      {/*<div className="paddy">
      <div className="filter-dd">
      <div className="filter-ttl">
      <h3>{Number(supplyBalance.displayValue).toLocaleString(undefined, { maximumFractionDigits: 2 })} <small style={{ fontSize: '11px' }}>{supplyBalance.symbol}</small></h3>
      <a title="">Balance</a>
      </div>
      </div>
      </div>*/}

      <div className="suggestion-usd">
        <div className="sgt-text">
          <h4>Treasury Balance</h4>
          <span>{Number(supplyBalance.displayValue).toLocaleString(undefined, { maximumFractionDigits: 2 })} <small style={{ fontSize: '11px' }}>{supplyBalance.symbol}</small></span>
        </div>
        {address && balance?.displayValue > 1 ? (
          <span data-open="modal3"><i className="fas fa-share-square"></i></span>
        ) : (
          <span><i className="fas fa-share-square"></i></span>
        )}
      </div>

      <div className="paddy">
        <div className="filter-dd">
          <div className="filter-ttl"></div>
        </div>
      </div>

    </div>
  );
};
export default Governance;