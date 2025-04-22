const Leftside = ({
  address,
  selectedTab,
  isHolder,
  daoDATA,
}) => {
  return (
    <div className="col-lg-3">
      <div className="acc-leftbar">
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            className={selectedTab === "rules" ? "nav-item nav-link active" : selectedTab?.length === 0 || selectedTab === null || !address ? "nav-item nav-link active" : "nav-item nav-link"}
            id="nav-rules-tab"
            data-toggle="tab"
            href="#nav-rules"
            role="tab"
            aria-controls="nav-rules"
            aria-selected="false">
            <i className="fas fa-info-circle"></i>Rules
          </a>
          {address && isHolder && (
            <>
              <a
                className={selectedTab === "profile" ? "nav-item nav-link active" : "nav-item nav-link"}
                id="nav-profile-tab"
                data-toggle="tab"
                href="#nav-profile"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false">
                <i className="fas fa-user-alt"></i>Profile
              </a>
            </>
          )}
          {address === daoDATA[0]?.wallet && (
            <>
              <a
                className={selectedTab === "deactivate" ? "nav-item nav-link active" : "nav-item nav-link"}
                id="nav-deactivate-tab"
                data-toggle="tab"
                href="#nav-deactivate"
                role="tab"
                aria-controls="nav-deactivate"
                aria-selected="false">
                <i className="fas fa-trash"></i>Deactivate
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Leftside;