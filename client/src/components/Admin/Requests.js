const Requests = ({
  moment,
  selectedTab,
  _requestID,
  requestData,
  mergeRequests,
  messageClicked,
  handleBackRequest,
}) => {
  return (
    <>
      <div
        className={selectedTab === "request" && !_requestID ? "tab-pane fade show active" : "tab-pane fade"}
        id="request"
        role="tabpanel"
        aria-labelledby="nav-request-tab">
        <div className="acc-setting">
          <h3>deactivation Requests</h3>
          <div className="requests-list">
            {mergeRequests.map((requests, idx) => {
              const imgsrc = "/uploads/" + requests.daoData.dao_image;
              return (
                <div key={idx} className="request-details" onClick={(() => { messageClicked(requests.request.id, requests.request.request_status); })}>
                  <div className="noty-user-img">
                    <img style={{ width: '35px', height: "auto" }} src={imgsrc} alt="" />
                  </div>
                  <div className="request-info">
                    <h3>{requests.daoData.dao_name}</h3>
                    <span>{moment.utc(requests.request.request_created).local().startOf('seconds').fromNow()}</span>
                  </div>
                  <div className="accept-feat">
                    <ul>
                      <li>
                        <p style={{ marginLeft: '10px' }}><i className={requests.request.request_status === 0 ? "fas fa-envelope" : "far fa-envelope-open"}></i></p>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div
        className={_requestID ? "tab-pane fade show active" : "tab-pane fade"}
        id="requested"
        role="tabpanel"
        aria-labelledby="nav-requested-tab">
        <div className="helpforum">
          <div className="row">
            <div className="col-12 security">
              <h3 onClick={(() => { handleBackRequest("request", "requested"); })}><i className="fas fa-angle-double-left gio_default_property"></i></h3>
              <hr />
            </div>
            <div className="row">
              <div className="col-12">
                <h4 className="indented">{requestData?.request_email}</h4><br></br>
                <div className="request">
                  <p style={{ lineHeight: '2' }} className="indented">{requestData?.request_message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Requests;