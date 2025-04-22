import { useAddress } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Access from "./components/Creation/Access";
import Tab from "./components/Creation/Tab";
import Descreptions from "./components/Creation/Descriptions";
import Footer from "./components/Creation/Footer";

const Creation = () => {

  const address = useAddress();

  const [dao_status, setStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [adminAccount, setAdminAccount] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const toastEffect = (kind, message, toastHandler = toast) => {
    if (kind === "error") {
      toastHandler.error(message, { style: { background: '#3a62e4', color: '#fff' } });
    } else {
      toastHandler.success(message, { style: { background: '#3a62e4', color: '#fff' } });
    }
  };

  useEffect(() => {
    if (!address) {
      return;
    }
    try {
      const getStatus = async () => {
        await Axios.post(`${process.env.REACT_APP_API_HTTP}get_status`, {
          wallet: address
        }).then((response) => {
          setStatus(response.data);
          setIsLoading(false);
        });
      };
      getStatus();
    } catch (err) {
      toastEffect("error", "Code: 101923");
    }
  }, [address]);

  useEffect(() => {
    try {
      const getAdminAccounts = async () => {
        await Axios.post(`${process.env.REACT_APP_API_HTTP}checkAdmin`, {
        }).then(async (response) => {
          const isFound = await response.data.some(element => {
            if (element.wallet === address) {
              return element;
            }
            return false;
          });
          const isAdmin = await response.data.find(({ wallet }) => wallet === address);
          setIsAdmin(isFound);
          setAdminAccount(isAdmin);
        });
      };
      getAdminAccounts();
    } catch (err) {
      toastEffect("error", "Code: 101924");
    }
  }, [address]);

  const shortenAddress = (str) => {
    return str.substring(0, 10,) + "..." + str.substring(str.length - 10);
  };

  const handleCancel = () => {
    if (!isAdmin) {
      return;
    }
    const creationID = dao_status.map(i => i.id);
    Swal.fire({
      title: 'Cancel creation?',
      text: "You won't be able to revert this!",
      width: '300',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post(`${process.env.REACT_APP_API_HTTP}cancel_creation`, {
          creationID: creationID
        }).then((response) => {
          sweetAlertEffect('success', 'Canceled successfully ');
          setTimeout(() => window.location.reload(), 3000);
        });
      }
    });

  };

  function sweetAlertEffect(type, message) {
    return (
      <>{Swal.fire({ toast: true, position: 'center', icon: type, text: message, showConfirmButton: false, timer: 5000, width: '320' })}</>
    );
  }

  return (
    <>
      <div className="wrapper">
        <div className="sign-in-page">
          <div className="signin-popup">
            <div className="signin-pop">
              <div className="row">
                <div className="col-lg-6">
                  <div className="cmp-info">
                    <Descreptions
                      dao_status={dao_status}
                      address={address}
                      adminAccount={adminAccount}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="login-sec">
                    <ul className="sign-control">
                      <button
                        className="gio_button"
                        onClick={handleCancel}
                        hidden={!address || !isAdmin || !dao_status.map(i => i.status).toString() || dao_status.map(i => i.status).toString() >= '4'}>
                        <i className="fas fa-ban"></i> Cancel
                      </button>
                    </ul>
                    <div className="sign_in_sec current" id="tab-2">
                      <Access
                        address={address}
                        isAdmin={isAdmin}
                        shortenAddress={shortenAddress}
                      />
                      <Tab
                        dao_status={dao_status}
                        address={address}
                        adminAccount={adminAccount}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<Footer />*/}
        </div>
      </div>
    </>
  );
};
export default Creation;;