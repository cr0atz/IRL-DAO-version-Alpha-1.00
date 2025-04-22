import { useAddress } from "@thirdweb-dev/react";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import toast from 'react-hot-toast';
import Axios from 'axios';
import moment from 'moment';
import LoadEffect from "../LoadEffect";
import Swal from 'sweetalert2';
import DAOLists from "../components/REALs/DAOs";


const REALs = () => {

  moment.locale('en');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tabLink = params.get("tab");

  const address = useAddress();

  const [isLoading, setIsLoading] = useState(true);
  const [adminAccount, setAdminAccount] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [daoList, setDaoList] = useState([]);
  const [members, setMembers] = useState([]);
  const [RPCURL, setRPCURL] = useState("");
  const [inputText, setInputText] = useState("");

  const toastEffect = (kind, message, toastHandler = toast) => {
    if (kind === "error") {
      toastHandler.error(message, { style: { background: '#3a62e4', color: '#fff' } });
    } else {
      toastHandler.success(message, { style: { background: '#3a62e4', color: '#fff' } });
    }
  };

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const finalMerge = daoList.map(daoList => {
    let _members = members.filter(membersCount => {
      return membersCount.editionDrop_address === daoList.editiondrop;
    });
    return { ...daoList, ..._members[0] };
  });

  const filteredData = finalMerge.filter((el) => {
    if (inputText === '') {
      return el;
    }
    else {
      return el.dao_name.toLowerCase().includes(inputText);
    }
  });

  useEffect(() => {
    const DAOLists = async () => {
      if (tabLink === "deactivated") {
        await Axios.post(`${process.env.REACT_APP_API_HTTP}get_deactivated_daos`, {
        }).then((response) => {
          setDaoList(response.data);
          setIsLoading(false);
        });
      } else {
        await Axios.post(`${process.env.REACT_APP_API_HTTP}get_real_daos`, {
        }).then((response) => {
          setDaoList(response.data);
          setIsLoading(false);
        });
      }

      await Axios.post(`${process.env.REACT_APP_API_HTTP}members`, {
      }).then((response) => {
        setMembers(response.data);
      });

      await Axios.post(`${process.env.REACT_APP_API_HTTP}get_config`, {
      }).then((response) => {
        setRPCURL(response.data[0].ImREAL_RPC);
      });

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
    DAOLists();
  }, [address]);

  function daoLinkGen() {
    var text = "";
    const dateNow = toTimestamp(Date().toLocaleString());
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + dateNow;

    for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }

  function updateLink(daoID, ciphertext) {
    const newLink = daoLinkGen();
    Axios.post(`${process.env.REACT_APP_API_HTTP}update_link`, {
      newLink: newLink,
      daoID: daoID
    }).then((response) => {
      window.location.href = `/DAO?link=${response.data}&data=${ciphertext}`;
    });
  };

  function handleGenerate(daoID, Created, Link, ciphertext) {
    const datenow = toTimestamp(Date().toLocaleString());
    const dateDB = toTimestamp(Created.toLocaleString());

    if (dateDB > datenow) {
      window.location.href = `/DAO?link=${Link}&data=${ciphertext}`;
      return;
    } else {
      updateLink(daoID, ciphertext);
    }
  };

  const handleDAOs = () => {
    window.location.href = '?tab=reals';
  };

  const handleDeactivated = () => {
    window.location.href = '?tab=deactivated';
  };

  const handleDeactivate = (daoID, creationID, daoName) => {

    if (!address || !adminAccount) {
      return;
    }
    try {
      Swal.fire({
        title: 'Deactivate DAO?',
        text: daoName + ' will be transfered to the "Deactivated" Tab.',
        width: '300',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: 'tomato',
        confirmButtonText: 'Deactivate'
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (!address || !adminAccount) {
            return;
          } else {
            Axios.post(`${process.env.REACT_APP_API_HTTP}deactivate`, {
              daoID: daoID,
              creationID: creationID
            }).then((response) => {
              window.location.reload();
            });
          }
        }
      });
    } catch (err) {
      toastEffect("error", "Code: 101976");
    }
  };

  const handleRestore = (daoID, creationID, daoName) => {
    if (!address || !adminAccount) {
      return;
    }
    try {
      Swal.fire({
        title: 'Restore DAO?',
        text: daoName + ' will be restored to the original owner.',
        width: '300',
        showCancelButton: true,
        confirmButtonColor: '#5dbb63',
        cancelButtonColor: 'tomato',
        confirmButtonText: 'Restore'
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (!address || !adminAccount) {
            return;
          } else {
            await Axios.post(`${process.env.REACT_APP_API_HTTP}restore`, {
              daoID: daoID,
              creationID: creationID
            }).then((response) => {
              window.location.reload();
            });
          }
        }
      });
    } catch (err) {
      toastEffect("error", "Code: 101977");
    }
  };

  if (isLoading || !isAdmin || !adminAccount.DAOs) {
    return (
      <div className="wrapper">
        <section className="companies-info">
          <div className="container">
            <div className="company-title">
              <h3>REALs</h3>
            </div>
            <div className="companies-list">
            </div>
            <div className="process-comm">
              <LoadEffect />
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return (
      <>
        <div className="wrapper">
          <section className="companies-info">
            <div className="container">
              <div className="company-title">
                <h3><button onClick={handleDAOs} className="gio_button_dashboard">REALs</button> <button onClick={handleDeactivated} className="gio_button_dashboard">Deactivated</button> <b className="dao-links">{daoList?.length}</b></h3>
                <div className="gsearch-bar">
                  <form>
                    <input onChange={inputHandler} type="text" name="search" placeholder="Search DAO here...." />
                    <button type="submit" disabled><i className="la la-search"></i></button>
                  </form>
                </div>

              </div>
              <DAOLists
                filteredData={filteredData}
                adminAccount={adminAccount}
                tabLink={tabLink}
                moment={moment}
                handleRestore={handleRestore}
                handleGenerate={handleGenerate}
                handleDeactivate={handleDeactivate}
              />
            </div>
          </section>
        </div>
      </>
    );
  };

};
export default REALs;