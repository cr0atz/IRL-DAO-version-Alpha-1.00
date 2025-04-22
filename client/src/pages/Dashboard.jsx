import { useAddress, useContract } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Axios from 'axios';
import moment from 'moment';
import LoadEffect from "../LoadEffect";
import DAOs from "../components/getDAOs";
import DAOLists from "../components/Dashboard/DAOs";
import Empty from "../components/Dashboard/Empty";
import Transfer from "../components/Dashboard/Transfer";


const Dashboard = () => {

  moment.locale('en');
  const address = useAddress();

  //const sdk = new ThirdwebSDK(process.env.REACT_APP_RPC_URL);

  const [isLoading, setIsLoading] = useState(true);
  const [adminAccount, setAdminAccount] = useState(false);
  const [isTransfering, setIsTransfering] = useState(false);
  const [checkNewOwnerWallet, setCheckNewOwnerWallet] = useState(false);
  const [tokenBalanceLoading, setTokenBalanceLoading] = useState(false);
  const [joined, setJoined] = useState([]);
  const [members, setMembers] = useState([]);
  const [daoList, setDaoList] = useState([]);
  const [daoCreation, setDAOCreation] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [ImREALConfig, setImREALConfig] = useState([]);
  const [tokenBalance, setTokenBalance] = useState([]);
  const [tokenShare, setTokenShare] = useState(0);
  const [tokenTransfer, setTokenTransfer] = useState(0);
  const [tokenIMG, setTokenIMG] = useState("");
  const [RPCURL, setRPCURL] = useState("");
  const [currentOwner, setCurrentOwner] = useState("");
  const [daoID, setDAOID] = useState("");
  const [creationID, setCreationID] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertKind, setAlertKind] = useState("");
  const [alertMSG, setAlertMSG] = useState("");
  const [daoTokenContract, setDAOTokenContract] = useState("");
  const [daoVoteContract, setDAOVoteContract] = useState("");

  const daoToken = useContract(daoTokenContract, "token").contract;

  const MergeData = [...daoList, ...filtered];
  const { data: DAOsData, loading: daoLoading, error: daoError } = DAOs();

  const [inputText, setInputText] = useState("");
  const [inputTextJoined, setInputTextJoined] = useState("");

  //Modal Elements
  const openEls = document.querySelectorAll("[data-open]");
  const closeEls = document.querySelectorAll("[data-close]");
  const isVisible = "is-visible";

  const toastEffect = (kind, message, toastHandler = toast) => {
    if (kind === "error") {
      toastHandler.error(message, { style: { background: '#3a62e4', color: '#fff' } });
    } else {
      toastHandler.success(message, { style: { background: '#3a62e4', color: '#fff' } });
    }
  };

  function getSDK() {
    try {
      const _sdk = new ThirdwebSDK(process.env.REACT_APP_RPC_URL);
      return _sdk;
    } catch (error) {
      toastEffect("error", "Code: 101945");
    }
  }

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const finalMerge = MergeData.map(daoList => {
    let _members = members.filter(membersCount => {
      return membersCount.editionDrop_address === daoList.editiondrop;
    });
    const creationData = daoCreation.find(({ id }) => id === parseInt(daoList.creation_id));
    return {
      creationData,
      ...daoList,
      ..._members[0]
    };
  });

  const filteredData = finalMerge.filter((el) => {
    if (inputText === '') {
      return el;
    }
    else {
      return el.dao_name.toLowerCase().includes(inputText);
    }
  });

  const filteredDataJoined = filtered.filter((el) => {
    if (inputTextJoined === '') {
      return el;
    }
    else {
      return el.dao_name.toLowerCase().includes(inputTextJoined);
    }
  });

  useEffect(() => {
    if (!address) {
      return;
    }
    const DAOLists = async () => {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}get_dao`, {
        wallet: address
      }).then((response) => {
        setDaoList(response.data);
      });

      await Axios.post(`${process.env.REACT_APP_API_HTTP}joined`, {
        wallet: address
      }).then((response) => {
        setJoined(response.data);
      });

      await Axios.post(`${process.env.REACT_APP_API_HTTP}members`, {
      }).then((response) => {
        setMembers(response.data);
      });

      await Axios.post(`${process.env.REACT_APP_API_HTTP}get_config`, {
      }).then((response) => {
        setRPCURL(response.data[0].ImREAL_RPC);
        setImREALConfig(response.data);
        setIsLoading(false);
      });

      await Axios.post(`${process.env.REACT_APP_API_HTTP}get_all_creation`, {
      }).then((response) => {
        setDAOCreation(response.data);
      });

      await Axios.post(`${process.env.REACT_APP_API_HTTP}checkAdmin`, {
      }).then((response) => {
        const isAdmin = response.data.find(({ wallet }) => wallet === address);
        setAdminAccount(isAdmin);
      });
    };
    DAOLists();
  }, [address]);

  useEffect(() => {
    const filteredData = async () => {
      const filter = DAOsData.filter(function (DAOsData_el) {
        return joined.filter(function (joined_el) {
          return joined_el.daoCreation_id === DAOsData_el.creation_id;
        }).length === 1;
      });
      setFiltered(filter);
    };
    filteredData();
  }, [joined]);

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

  const recordIfClaimer = async (owner, _editionDrop, creationID, privateKey) => {
    await Axios.post(`${process.env.REACT_APP_API_HTTP}claimer`, {
      wallet: address,
      owner: owner,
      editionDrop: _editionDrop,
      creationID: creationID,
      privateKey: privateKey,
      RPCURL: RPCURL
    });
  };

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

  const shortenAddress = (str) => {
    return str.substring(0, 8,) + "..." + str.substring(str.length - 8);
  };

  const handleModal = async (modalID, owner, daoID, creationID, tokenIMG, tokenContract, transferAmount, voteContract) => {
    document.getElementById(modalID).classList.add(isVisible);
    setDAOTokenContract(tokenContract);
    setDAOVoteContract(voteContract);
    setTokenBalanceLoading(true);
    setCurrentOwner(owner);
    setDAOID(daoID);
    setCreationID(creationID);
    const _token = await getSDK().getContract(tokenContract, "token");
    const token_balance = await _token.balanceOf(address);
    const calculateShare = parseInt(token_balance.displayValue) - parseInt(transferAmount);
    setTokenBalanceLoading(false);
    setTokenIMG(tokenIMG);
    setTokenBalance(token_balance);
    setTokenTransfer(parseInt(transferAmount));
    setTokenShare(calculateShare);
  };

  const handleNewOwner = (e) => {
    setNewOwner(e.target.value);
  };

  //Modal Elements
  for (const el of openEls) {
    el.addEventListener("click", function () {
      const modalId = this.dataset.open;
      document.getElementById(modalId).classList.add(isVisible);
    });
  }

  for (const el of closeEls) {
    el.addEventListener("click", function () {
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
  }

  document.addEventListener("click", e => {
    if (e.target === document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
  });

  document.addEventListener("keyup", e => {
    if (e.key === "Escape" && document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
  });

  function alertResponse(kind, type, msg) {
    setAlertMSG(msg);
    setAlertKind(kind);
    setAlertType(type);
    setTimeout(() => {
      setAlertType("info");
      setAlertKind("Note!");
      setAlertMSG("Make sure that the wallet address is valid.");
    }, 10000);
  }

  async function checkIfValid(tokencontract, address, kind) {
    try {
      switch (kind) {
        case 1: setCheckNewOwnerWallet(true);
      }
      const _token = await getSDK().getContract(tokencontract, "token");
      await _token.balanceOf(address);
      setCheckNewOwnerWallet(false);
      return (true);
    } catch (err) {
      setCheckNewOwnerWallet(false);
      return (false);
    }
  }

  const transferDAO = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsTransfering(true);

    if (!address || !adminAccount) {
      return;
    }
    if (newOwner.length !== 42) {
      setIsTransfering(false);
      alertResponse("Error!", "danger", "Wallet address is empty or invalid!");
      return;
    }
    const chekIfValid = await checkIfValid(ImREALConfig[0]?.ImREAL_token, newOwner.trim(), 1);
    if (!chekIfValid) {
      setIsTransfering(false);
      alertResponse("Error!", "danger", "Wallet address is empty or invalid!");
      return;
    }
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}transferDAO`, {
        newOwner: newOwner,
        daoID: daoID,
        creationID: creationID
      }).then(async () => {
        if (tokenShare > 0) {
          await daoToken.transfer(newOwner, tokenShare)
            .then(async () => {
              await daoToken.transfer(daoVoteContract, tokenTransfer)
                .then(() => {
                  setIsTransfering(false);
                  alertResponse("Success!", "success", "DAO and tokens are successfully transferred to the new owner.");
                  setTimeout(() => { window.location.reload(); }, 5000);
                });
            });
        } else {
          setIsTransfering(false);
          alertResponse("Success!", "success", "DAO and tokens are successfully transferred to the new owner.");
          setTimeout(() => { window.location.reload(); }, 5000);
        }
      });
    } catch (err) {
      toastEffect("error", "Code: 101946");
    }
  };

  if (!address && isLoading) {
  } else if (isLoading && address) {
    return (
      <>
        <div className="wrapper">
          <section className="companies-info">
            <div className="container">
              <div className="company-title">
                <h3>MyDAOs</h3>
              </div>
              <div className="process-comm">
                <LoadEffect />
              </div>
            </div>
          </section>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="wrapper">
          {!finalMerge?.length ? (
            <Empty />
          ) : (
            <>
              <section className="companies-info">
                <div className="container">
                  <div className="company-title">
                    <h3>MyDAOs <b className="dao-links">{daoList?.length}</b></h3>
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
                    moment={moment}
                    handleModal={handleModal}
                    handleGenerate={handleGenerate}
                  />
                </div>
              </section>
              <Transfer
                alertType={alertType}
                alertKind={alertKind}
                alertMSG={alertMSG}
                tokenIMG={tokenIMG}
                tokenBalance={tokenBalance}
                tokenShare={tokenShare}
                isTransfering={isTransfering}
                tokenBalanceLoading={tokenBalanceLoading}
                transferDAO={transferDAO}
                handleNewOwner={handleNewOwner}
              />
            </>
          )}
        </div>
      </>
    );
  };

};
export default Dashboard;