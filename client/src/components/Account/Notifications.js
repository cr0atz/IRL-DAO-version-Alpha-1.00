import { Tooltip } from "@mui/material";

const Notifications = ({
  selectedTab,
  _notifID,
  notifications,
  notifData,
  moment,
  clickLink,
  handleDelete,
  messageClicked,
  handleDeleteAll,
  handleBackRequest,
}) => {
  return (
    <>
      <div
        className={selectedTab === "notifications" && !_notifID ? "tab-pane fade show active" : "tab-pane fade"}
        id="notif"
        role="tabpanel"
        aria-labelledby="nav-notification-tab">
        <div className="acc-setting">
          <h3>Notifications
            <Tooltip placement="top" title="Delete all" arrow>
              <b style={{ float: 'right' }} className="gio-link" onClick={handleDeleteAll}><i className="fas fa-trash-alt"></i></b>
            </Tooltip>
          </h3>
          <div className="requests-list">
            {notifications?.map((notification, idx) => {
              const imgsrc = "/uploads/" + notification.notif_img;
              return (
                <div key={idx} className="request-details" onClick={(() => { messageClicked(notification.id, notification.notif_status); })}>
                  <div className="noty-user-img">
                    <img style={{ width: '35px', height: "auto" }} src={imgsrc} alt="" />
                  </div>
                  <div className="request-info">
                    <h3 style={{ fontSize: '16px' }}>{notification.notif_name} <span>{notification.notif_short_message}</span></h3>
                    <span style={notification.notif_status === 1 ? undefined : { color: '#1769ff' }}>{moment.utc(notification.notif_created).local().startOf('seconds').fromNow()}</span>
                  </div>
                  <div className="accept-feat">
                    <ul>
                      <li>
                        <p style={notification.notif_status === 1 ? { marginLeft: '10px' } : { marginLeft: '10px', color: '#1769ff' }}><i className={notification.notif_status === 1 ? "far fa-circle" : "fas fa-circle"}></i></p>
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
        className={_notifID ? "tab-pane fade show active" : "tab-pane fade"}
        id="notified"
        role="tabpanel"
        aria-labelledby="nav-notified-tab">
        <div className="helpforum">
          <div className="row">
            <div className="col-12 security">
              <h3>
                <b onClick={(() => { handleBackRequest("notif", "notified"); })} className="gio-link-back" title="Return"><i className="fas fa-angle-double-left"></i></b>
                <b onClick={(() => notifData?.id ? handleDelete(notifData.id) : undefined)} style={{ float: 'right' }} className="gio-link" title="Delete"><i className="fas fa-trash-alt"></i></b>
              </h3>
              <hr />
            </div>
            <div className="row">
              <div className="col-12">
                <img style={{ width: '35px', height: "auto" }} src={`/uploads/${notifData?.notif_img}`} alt="" />
                <h4 className="indented">{notifData?.notif_short_message}</h4><br></br>
                <div className="notifications">
                  <p style={{ lineHeight: '2' }} className="indented">
                    <b className="gio-link" onClick={clickLink}>{notifData?.notif_long_message}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Notifications;