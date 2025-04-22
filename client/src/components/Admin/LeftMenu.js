import StickyBox from "react-sticky-box";

const LeftMenu = ({ adminAccount, selectedTab }) => {
  return (
    <div className="col-lg-3">
      <StickyBox offsetTop={20} offsetBottom={20}>
        <div className="acc-leftbar">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            {adminAccount?.controls ? (
              <a
                onClick={(() => { window.history.pushState("object or string", "Title", "?tab=control"); })}
                className={selectedTab === "control" ? "nav-item nav-link active" : "nav-item nav-link"}
                id="nav-control-tab"
                data-toggle="tab"
                href="#nav-control"
                role="tab"
                aria-controls="nav-control"
                aria-selected="true">
                <i className="la la-cogs"></i>Controls
              </a>
            ) : (<></>)}
            {adminAccount?.accounts ? (
              <a
                onClick={(() => { window.history.pushState("object or string", "Title", "?tab=accounts"); })}
                className={selectedTab === "accounts" ? "nav-item nav-link active" : "nav-item nav-link"}
                id="nav-acc-tab"
                data-toggle="tab"
                href="#nav-acc"
                role="tab"
                aria-controls="nav-acc"
                aria-selected="false">
                <i className="fas fa-user-shield"></i>Accounts
              </a>
            ) : (<></>)}
            {adminAccount?.requests ? (
              <a
                onClick={(() => { window.history.pushState("object or string", "Title", "?tab=request"); })}
                className={selectedTab === "request" ? "nav-item nav-link active" : "nav-item nav-link"}
                id="nav-request-tab"
                data-toggle="tab"
                href="#request"
                role="tab"
                aria-controls="privacy"
                aria-selected="false">
                <i className="fas fa-mail-bulk"></i>Requests
              </a>
            ) : (<></>)}
            {/*<a
            className="nav-item nav-link"
            id="nav-requested-tab"
            data-toggle="tab"
            href="#requested"
            role="tab"
            aria-controls="privacy"
            aria-selected="false">
            </a>*/}
          </div>
        </div>
      </StickyBox>
    </div>
  );
};
export default LeftMenu;