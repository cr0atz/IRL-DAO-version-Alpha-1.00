import StickyBox from "react-sticky-box";

const LeftMenu = ({ selectedTab }) => {
  return (
    <div className="col-lg-3">
      <StickyBox offsetTop={20} offsetBottom={20}>
        <div className="acc-leftbar">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a
              onClick={(() => { window.history.pushState("object or string", "Title", "?tab=notifications"); })}
              className={selectedTab === "notifications" ? "nav-item nav-link active" : "nav-item nav-link"}
              id="nav-notification-tab"
              data-toggle="tab"
              href="#notif"
              role="tab"
              aria-controls="privacy"
              aria-selected="false">
              <i className="fas fa-bell"></i>
              Notifications
            </a>
          </div>
        </div>
      </StickyBox>
    </div>
  );
};
export default LeftMenu;