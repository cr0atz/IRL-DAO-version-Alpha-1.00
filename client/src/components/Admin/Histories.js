import { Tooltip } from "@mui/material";

const Histories = ({
  histories,
  ImREALConfig,
  transactionOptions,
  filteredTransaction,
  handleBlocks,
  shortenDisplay,
  ConvertBignumber,
  handleBackRequest,
  searchTransactions,
  filterTransactionOption
}) => {
  return (
    <div
      className={histories ? "tab-pane fade show active" : "tab-pane fade"}
      id="hitories"
      role="tabpanel"
      aria-labelledby="nav-welcome-tab">
      <div className="acc-setting">
        <h3>
          <i onClick={(() => { handleBackRequest("nav-control", "hitories"); })} className="fas fa-angle-double-left gio_default_property"></i>
          <b style={{ float: 'right' }} className="link_effect2">
            <Tooltip placement="top" title="Click to check current blocks" arrow>
              <a href="https://polygonscan.com/" target="_blank"><i className="fab fa-hive"></i></a>
            </Tooltip>
            <Tooltip placement="top" title="Click to edit blocks" arrow>
              <a
                id="options"
                onInput={handleBlocks}
                suppressContentEditableWarning={true}
                contentEditable={true}> {ImREALConfig[0]?.ImREAL_blocks}
              </a>
            </Tooltip>
          </b>
        </h3>
        <h3>
          <div className="filter-dd">
            <div className="row">
              <div className="col-lg-9 col-md-9 col-sm-8">
                <form>
                  <input onChange={searchTransactions} style={{ color: 'black' }} type="text" name="search-skills" placeholder="Search for event name, codes and address" />
                </form>
              </div>
              <div className="ccol-lg-3 col-md-3 col-sm-4">
                <form className="job-tp">
                  <select onChange={filterTransactionOption} style={{ color: 'black' }}>
                    <option value="all">Filter By</option>
                    {transactionOptions.map((options, idx) => {
                      return (
                        <option key={idx} value={options.eventName}>{options.eventName}</option>
                      );
                    })}
                  </select>
                  <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </form>
              </div>
            </div>
          </div>
        </h3>
        <div className="requests-list">
          {filteredTransaction.map((events, idx) => {
            return (
              <div key={idx} className="notbar single-article">
                <div className="dropdown privacydropd">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">{events.eventName}
                    <small style={{ fontSize: '13px' }}> (<i className="fab fa-hive fa-sm"></i> {events.transaction.blockNumber})</small>
                  </a>
                  <div className="dropdown-menu">
                    <p className="link_effect" title='View "Transaction Hash" on block explorer'>
                      <a style={{ fontSize: '14px', fontWeight: 'bold' }} href={`https://polygonscan.com/tx/${events.transaction.transactionHash}`} target="_blank">
                        {shortenDisplay(events.transaction.transactionHash)}
                      </a>
                    </p>
                    {events.eventName === "Transfer" ? (
                      <p className="data-display code-display">
                        <a>from: {events.data.from}</a><br></br>
                        <a>to: {events.data.to}</a><br></br>
                        <a>value: {Number(ConvertBignumber(events.data.value._hex)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</a>
                      </p>
                    ) : events.eventName === "TokensMinted" ? (
                      <p className="data-display code-display">
                        <a>mintedTo: {events.data.mintedTo}</a><br></br>
                        <a>value: {Number(ConvertBignumber(events.data.quantityMinted._hex)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</a>
                      </p>
                    ) : events.eventName === "Approval" ? (
                      <p className="data-display code-display">
                        <a>owner: {events.data.owner}</a><br></br>
                        <a>spender: {events.data.spender}</a><br></br>
                        <a>value: {Number(ConvertBignumber(events.data.value._hex)).toLocaleString(undefined, { maximumFractionDigits: 2 })}</a>
                      </p>
                    ) : (
                      <p className="code-display">{JSON.stringify(events.data, null, 2)}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Histories;