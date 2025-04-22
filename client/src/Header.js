import { useAddress, useMetamask, useWalletConnect, useDisconnect, useNetwork, useContract } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import moment from 'moment';
import { ChainId } from "@thirdweb-dev/sdk";
import toast, { Toaster } from 'react-hot-toast';
import Axios from 'axios';
import InvalidNetwork from "./InvalidNetwork";
import InvalidNetwork2 from "./InvalidNetwork2";
import Menu from "./components/Header/Menu";
import Wallet from "./components/Header/Wallet";

const Header = () => {

  moment.locale('en');

  const address = useAddress();
  const network = useNetwork();

  // Wallet Connection
  const usingMetamaskWallet = useMetamask();
  const usingWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();

  const ImREAL = useContract(process.env.REACT_APP_TOKEN_ImREAL, "token").contract;

  const [refreshNotification, setRefreshNotification] = useState(0);
  const [ImREAL_token, setREALBalance] = useState([]);
  const [adminAccount, setAdminAccount] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [_copyAddress, setCopyAddress] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [socket, setSocket] = useState(null);

  const toastEffect = (kind, message, toastHandler = toast) => {
    if (kind === "error") {
      toastHandler.error(message, { style: { background: '#3a62e4', color: '#fff' } });
    } else {
      toastHandler.success(message, { style: { background: '#3a62e4', color: '#fff' } });
    }
  };


  useEffect(() => {
    const getAdminAccounts = async () => {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}checkAdmin`, {
      }).then(async (response) => {
        const isAdmin = await response.data.find(({ wallet }) => wallet === address);
        const isFound = await response.data.some(element => {
          if (element.wallet === address) {
            return element;
          }
          return false;
        });
        setIsAdmin(isFound);
        setAdminAccount(isAdmin);
      });
    };
    getAdminAccounts();
  }, [address]);

  //Web Socket
  useEffect(() => {
    const webSocket = () => {
      setSocket(io.connect(process.env.REACT_APP_API_SERVER));
    };
    webSocket();
  }, []);

  //Emits online users to the server realtime
  useEffect(() => {
    const setUser = () => {
      socket?.emit("newUser", address);
    };
    setUser();
  }, [socket, address]);

  //Notification push realtime
  useEffect(() => {
    const getNotifData = () => {
      socket?.on("getInviteMember", data => {
        if (data) {
          setRefreshNotification(oldCount => oldCount + 1);
        }
      });
      socket?.on("proposalNotif", data => {
        if (data) {
          setRefreshNotification(oldCount => oldCount + 1);
        }
      });
    };
    getNotifData();
  }, [socket]);

  //get notification data.
  useEffect(() => {
    const getNotifications = async () => {
      try {
        if (address) {
          console.log('[DEBUG] Fetching notifications for address:', address);
          await Axios.post(`${process.env.REACT_APP_API_HTTP}getNotifications`, {
            wallet: address
          }).then((response) => {
            console.log('[DEBUG] Notification fetch response:', response.data);
            setNotifications(response.data);
          }).catch((axiosErr) => {
            console.error('[DEBUG] Axios error fetching notifications:', axiosErr);
            toastEffect("error", "Code: 101919");
          });
        }
      } catch (err) {
        console.error('[DEBUG] General error in getNotifications:', err);
        toastEffect("error", "Code: 101919");
      }
    };
    getNotifications();
  }, [address, refreshNotification]);

  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  useEffect(() => {
    if (!address) {
      return;
    }
    const checkREALBalance = async () => {
      try {
        const ImREAL_balance = await ImREAL.balanceOf(address);
        setREALBalance(ImREAL_balance);
      } catch (error) {
      }
    };
    checkREALBalance();
  }, [address, ImREAL]);

  const copyAddress = async () => {
    setCopyAddress(true);
    try {
      navigator.clipboard.writeText(address);
      setTimeout(() => setCopyAddress(false), 2000);
    } catch (err) {
      toastEffect("error", "Code: 101920");
    }
  };

  function checkIsWholeNumber(number) {
    if (Number.isInteger(number)) {
      return 2;
    } else {
      return 4;
    }
  }

  async function handleNotif(id) {
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}notifClicked`, {
        notifID: id
      });
    } catch (err) {
      toastEffect("error", "Code: 101921");
    }
  }

  async function handleNotifClear() {
    if (!notifications?.length) {
      return;
    }
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}notifClear`, {
        wallet: address
      }).then((result) => {
        if (result) {
          setRefreshNotification(oldCount => oldCount + 1);
        }
      });
    } catch (err) {
      toastEffect("error", "Code: 101922");
    }
  }

  const ImREALToken = (parseFloat(ImREAL_token?.displayValue * 100) / 100).toFixed(checkIsWholeNumber(parseFloat(ImREAL_token?.displayValue)));
  const isWholeNumIMREAL = checkIsWholeNumber(parseFloat(ImREAL_token?.displayValue));

  if (address && network?.[0].data?.chain?.id !== ChainId.Polygon) {
    var connected = sessionStorage.getItem("connection");
    return (<>{connected === "Metamask" ? (<InvalidNetwork />) : (<InvalidNetwork2 />)}</>);
  } else {
    return (
      <>
        <Toaster position="buttom-left" reverseOrder={false} />
        <header className="">
          <div className="container">
            <div className="header-data">
              <div className="logo">
                <a href="/" title=""><img style={{ width: '100px', height: "100%" }} src="/assets/images/ImREAL_white.png" alt="" /></a>
              </div>
              <div className="search-bar">
              </div>
              <nav>
                <Menu
                  isAdmin={isAdmin}
                  adminAccount={adminAccount}
                  address={address}
                  notifications={notifications}
                  moment={moment}
                  handleNotif={handleNotif}
                  handleNotifClear={handleNotifClear}
                />
              </nav>
              <div className="menu-btn">
                <a href="#" title="">
                  <i className="fa fa-bars"></i>
                </a>
              </div>
              <Wallet
                address={address}
                _copyAddress={_copyAddress}
                ImREAL_token={ImREAL_token}
                ImREALToken={ImREALToken}
                isWholeNumIMREAL={isWholeNumIMREAL}
                copyAddress={copyAddress}
                shortenAddress={shortenAddress}
                disconnectWallet={disconnectWallet}
                usingMetamaskWallet={usingMetamaskWallet}
                usingWalletConnect={usingWalletConnect}
              />
            </div>
          </div>
        </header>
      </>
    );
  }
};

export default Header;
