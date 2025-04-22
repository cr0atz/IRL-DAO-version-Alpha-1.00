import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAddress } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import toast from 'react-hot-toast';
import Axios from "axios";
import moment from "moment";
import Access from "../components/Admin/Access";
import io from "socket.io-client";
import Swal from 'sweetalert2';
import LeftMenu from "../components/Account/LeftMenu";
import Notifications from "../components/Account/Notifications";
import LoadEffect from "../LoadEffect";

const Account = () => {

  moment.locale("en");

  const address = useAddress();
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tabLink = params.get("tab");
  const _notifID = params.get("notif_id");


  const [socket, setSocket] = useState(null);

  const [refreshNotification, setRefreshNotification] = useState(0);
  const [settingsReload, setSettingsReload] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const [selectedTab, setSelectedTab] = useState([]);
  const [notifData, setNotifData] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const toastEffect = (kind, message, toastHandler = toast) => {
    if (kind === "error") {
      toastHandler.error(message, { style: { background: '#3a62e4', color: '#fff' } });
    } else {
      toastHandler.success(message, { style: { background: '#3a62e4', color: '#fff' } });
    }
  };

  //Web Socket
  useEffect(() => {
    const webSocket = () => {
      setSocket(io.connect(process.env.REACT_APP_API_SERVER));
    };
    webSocket();
  }, []);

  const messageClicked = async (notifID, notifStatus) => {
    document.getElementById("notified").classList.add("active");
    document.getElementById("notified").classList.add("show");
    document.getElementById("notif").classList.remove("active");
    document.getElementById("notif").classList.remove("show");
    window.history.pushState("object or string", "Title", `?tab=notifications&notif_id=${notifID}`);
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}notifUpdate`, {
        notifID: notifID,
        notifStatus: notifStatus
      }).then(async () => {
        await socket.emit("openedNotif", {
          wallet: address
        });
        const notificationData = notifications.find(({ id }) => id === notifID);
        setNotifData(notificationData);
      });
    } catch (err) {
      toastEffect("error", "Code: 101925");
    }
  };

  useEffect(() => {
    const shiftRequestData = () => {
      if (!notifData || !address) {
        return;
      }
      const notificationData = notifications.find(({ id }) => id === parseInt(_notifID));
      setNotifData(notificationData);
    };
    shiftRequestData();
  }, [notifications]);

  const handleBackRequest = (idAdd, idRemove) => {
    document.getElementById(idAdd).classList.add("active");
    document.getElementById(idAdd).classList.add("show");
    document.getElementById(idRemove).classList.remove("active");
    document.getElementById(idRemove).classList.remove("show");
    handleReload();
  };

  //get notification data.
  useEffect(() => {
    const getNotifications = async () => {
      try {
        if (address) {
          await Axios.post(`${process.env.REACT_APP_API_HTTP}getAllNotifications`, {
            wallet: address
          }).then((response) => {
            setNotifications(response.data);
            setSettingsReload(oldCount => oldCount + 1);
          });
        }
      } catch (err) {
        toastEffect("error", "Code: 101926");
      }
    };
    getNotifications();
  }, [address, refreshNotification]);

  useEffect(() => {
    const setTab = () => {
      switch (tabLink) {
        case "notifications":
          return setSelectedTab(tabLink);
        default:
          return setSelectedTab([]);
      }
    };
    setTab();
  }, [address]);

  const handleReload = () => {
    setRefreshNotification(oldVal => oldVal + 1);
    setSettingsReload(0);
    setRefreshing(true);
  };

  useEffect(() => {
    const checkIfDONE = () => {
      if (settingsReload === 1) {
        setSettingsReload(0);
        setRefreshing(false);
      }
    };
    checkIfDONE();
  }, [settingsReload]);

  const clickLink = () => {
    window.location.href = notifData?.notif_link;
  };

  function handleDeleteAll() {
    if (!notifications.length) {
      return;
    }
    try {
      Swal.fire({
        title: 'Delete All?',
        text: "You won't be able to revert this!",
        width: '300',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Axios.delete(`${process.env.REACT_APP_API_HTTP}removeAllNotifications/${address}`)
            .then(async () => {
              await socket.emit("openedNotif", {
                wallet: address
              });
              handleReload();
            });
        }
      });
    } catch (err) {
      toastEffect("error", "Code: 101927");
    }
  }

  async function handleDelete(notifID) {
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}removeNotification`, {
        wallet: address,
        notifID: notifID
      }).then(async (response) => {
        await socket.emit("openedNotif", {
          wallet: address,
          notifID: notifID
        });
        handleBackRequest("notif", "notified");
        handleReload();
      });
    } catch (err) {
      toastEffect("error", "Code: 101928");
    }
  }
  if (!address) {
    return (
      <section className="profile-account-setting">
        <div className="container">
          <div className="account-tabs-setting">
            <div className="row">
              <div className="company-title">
                <h3 id="gio_alignment">
                  <b id="gio_left"><i className="fas fa-angle-double-left"></i></b>
                  <b>Account Settings</b>
                  <b className="dao-links"><i className="fas fa-sync"></i></b>
                </h3>
              </div>
              <LoadEffect />
            </div>
          </div>
        </div>
      </section >
    );
  } else {
    return (
      <section className="profile-account-setting">
        <div className="container">
          <div className="account-tabs-setting">
            <div className="row">
              <div className="company-title">
                <h3 id="gio_alignment">
                  <Tooltip placement="top" title="Return back" arrow>
                    <b id="gio_left"><i className="fas fa-angle-double-left gio_default_property" onClick={() => navigate(-1)}></i></b>
                  </Tooltip>
                  <b>Account Settings</b>
                  <Tooltip placement="top" title="Reload" arrow>
                    <b className="dao-links"><i className={refreshing ? "fas fa-sync fa-spin" : "fas fa-sync gio_default_property"} onClick={refreshing ? undefined : handleReload}></i></b>
                  </Tooltip>
                </h3>
              </div>
              <LeftMenu selectedTab={selectedTab} />
              <div className="col-lg-9">
                <div className="tab-content" id="nav-tabContent">
                  <Notifications
                    selectedTab={selectedTab}
                    _notifID={_notifID}
                    notifications={notifications}
                    notifData={notifData}
                    moment={moment}
                    clickLink={clickLink}
                    handleDelete={handleDelete}
                    messageClicked={messageClicked}
                    handleDeleteAll={handleDeleteAll}
                    handleBackRequest={handleBackRequest}
                  />
                  <Access
                    selectedTab={selectedTab}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    );
  }
};
export default Account;