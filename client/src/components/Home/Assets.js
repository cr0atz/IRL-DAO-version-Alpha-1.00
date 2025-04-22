const Assets = () => {
  return (
    <div className="widget suggestions full-width">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="sd-title">
        <h3>Other Assets</h3>
      </div>
      <div className="suggestions-list">
        <div className="filter-dd paddy">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="filter-ttl">
            <h3>$5,600.00</h3>
          </div>
        </div>
        <div className="suggestion-usd">
          <img style={{ width: '35px', height: "100%" }} src="http://via.placeholder.com/35x35" alt="" />
          <div className="sgt-text">
            <h4>ImREAL <span>(REAL)</span></h4>
            <span>1,356</span>
          </div>
          <span><i className="fas fa-plus"></i></span>
        </div>
        <div className="suggestion-usd">
          <img style={{ width: '35px', height: "100%" }} src="http://via.placeholder.com/35x35" alt="" />
          <div className="sgt-text">
            <h4>MATIC <span>(Polygon)</span></h4>
            <span>821.1345</span>
          </div>
          <span><i className="fas fa-plus"></i></span>
        </div>
        <div className="suggestion-usd">
          <img style={{ width: '35px', height: "100%" }} src="http://via.placeholder.com/35x35" alt="" />
          <div className="sgt-text">
            <h4>USDT <span>(PoS)</span></h4>
            <span>1,035.1133</span>
          </div>
          <span><i className="fas fa-plus"></i></span>
        </div>
        <div className="suggestion-usd">
          <img style={{ width: '35px', height: "100%" }} src="http://via.placeholder.com/35x35" alt="" />
          <div className="sgt-text">
            <h4>USDC <span>(PoS)</span></h4>
            <span>2,801</span>
          </div>
          <span><i className="fas fa-plus"></i></span>
        </div>
        <div className="view-more">
          <div className="filter-dd paddy">
            <div className="filter-ttl">
            </div>
            <form onSubmit={async (e) => { e.preventDefault(); }}>
              <button className="left_button" type="submit">Add assets</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Assets;