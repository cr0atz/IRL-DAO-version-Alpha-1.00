const Access = ({ selectedTab }) => {
  return (
    <div
      className={selectedTab?.length === 0 || selectedTab === null ? "tab-pane fade show active" : "tab-pane fade"}
      id="welcome"
      role="tabpanel"
      aria-labelledby="nav-welcome-tab">
      <div className="helpforum">
        <div className="row">
          <div className="col-12 security">
            <h3>Admin Panel</h3>
            <hr />
          </div>
          <div className="row">
            <div className="col-12">
              <h4>Welcome to admin panel.</h4>
              <div className="request">
                <p>If you are seeing this it means you have access to the admin panel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Access;