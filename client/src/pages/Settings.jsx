import React, { useState, useEffect } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useLocation } from "react-router";
import { useAddress, useOwnedNFTs, useContract } from '@thirdweb-dev/react';
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { Tooltip } from "@mui/material";
import toast from 'react-hot-toast';
import Axios from 'axios';
import io from "socket.io-client";
import LoadEffect from "../LoadEffect";
import Leftside from "../components/Settings/Leftside";
import Rules from "../components/Settings/Rules";
import Profile from "../components/Settings/Profile";
import Deactivate from "../components/Settings/Deactivate";
import SetAvatar from "../components/Settings/SetAvatar";
import AddAvatar from "../components/Settings/AddAvatar";

const Settings = () => {

  const navigate = useNavigate();
  const address = useAddress();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const daoLink = params.get("link");
  const tab = params.get("tab");

  const [socket, setSocket] = useState(null);

  //useStates
  const [avatarcontractAddress, setAvatarcontractAddress] = useState("");
  const [avatarImg, setAvatarImg] = useState("");
  const [avatarWallet, setAvatarWallet] = useState("");
  const [avatarVote, setAvatarVote] = useState("");
  const [resultMsg, setResultMsg] = useState("");
  const [resultKind, setResultKind] = useState("");
  const [resultType, setResultType] = useState("");
  const [inputName, setInputName] = useState("");
  const [nameResult, setNameResult] = useState("");
  const [avatarData, setAvatarData] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertKind, setAlertKind] = useState("");
  const [alertMSG, setAlertMSG] = useState("");
  const [_requestAlert, setRequestAlert] = useState("");
  const [requestKind, setRequestKind] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [message, setMessage] = useState("");

  //useState Data 
  const [daoDATA, setDaoDATA] = useState([]);
  const [selectedTab, setSelectedTab] = useState([]);
  const [dataCreation, setDataCreation] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [profile, setProfile] = useState([]);

  //useState isLoding
  const [dataLoading, setDataLoading] = useState(true);
  const [avatarsLoading, setAvatarsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [daoDataLoading, setDaoDataLoading] = useState(true);
  const [isHolderLoading, setIsHolderLoading] = useState(true);
  const [isSettingAvatar, setIsSettingAvatar] = useState(false);
  const [nameIsLoading, setNameIsLoading] = useState(false);
  const [fetchingNFT, setFetchingNFT] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isHolder, setIsHolder] = useState(false);
  const [sending, setSending] = useState(false);

  //refresh data useState
  const [recheckNFTHolder, setRecheckNFTHolder] = useState(0);
  const [refreshAvatarsAndProfiles, setRefreshAvatarsAndProfiles] = useState(0);
  const [countRefresh, setCountRefresh] = useState(0);

  //Modal Elements
  const openEls = document.querySelectorAll("[data-open]");
  const closeEls = document.querySelectorAll("[data-close]");
  const isVisible = "is-visible";

  //React Hooks
  const { contract, error: _error } = useContract(avatarData);
  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(contract, address);

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

  //SDK function----------------
  function getSDK() {
    try {
      if (daoDATA.length !== 0) {
        const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
        const wallet = new ethers.Wallet(daoDATA[0]?.privatekey, provider);
        const _sdk = new ThirdwebSDK(wallet);
        return _sdk;
      }
    } catch (error) {
      toastEffect("error", "Code: 101978");
    }
  }

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

  ///DAO DATA----------------
  useEffect(() => {
    const getAllAddresses = async () => {
      try {
        await Axios.post(`${process.env.REACT_APP_API_HTTP}daoData`, {
          daoLink: daoLink
        }).then((response) => {
          setDaoDATA(response.data);
          setDaoDataLoading(false);
        });
      } catch (error) {
        toastEffect("error", "Code: 101979");
      }
    };
    getAllAddresses();
  }, [address, daoLink]);

  //Tab Orginazing----------------
  useEffect(() => {
    const setTab = () => {
      switch (tab) {
        case 'rules':
          return setSelectedTab(tab);
        case 'profile':
          return setSelectedTab(tab);
        case 'deactivate':
          return setSelectedTab(tab);
        default:
          return setSelectedTab([]);
      }
    };
    setTab();
  }, [daoDATA, address]);

  ///check NFT Holder----------------
  useEffect(() => {
    if (!address) {
      return;
    }
    const checkNFTHolder = async () => {
      try {
        if (daoDATA.length !== 0) {
          const _editionDrop = await getSDK().getContract(daoDATA[0]?.editiondrop, "edition-drop");
          const balance = await _editionDrop.balanceOf(address, 0);
          if (balance.gt(0)) {
            setIsHolder(true);
            setIsHolderLoading(false);
          } else {
            setIsHolder(false);
            setIsHolderLoading(false);
          }
          setCountRefresh(oldVal => oldVal + 1);
        }
      } catch (error) {
        toastEffect("error", "Code: 101980");
      }
    };
    checkNFTHolder();
  }, [daoDATA, address, recheckNFTHolder]);


  //getAvatars & profiles----------------
  useEffect(() => {
    if (!address) {
      return;
    }
    const getAvatarsAndProfiles = async () => {
      try {
        if (daoDATA.length !== 0 && address !== undefined) {
          await Axios.post(`${process.env.REACT_APP_API_HTTP}getAvatars`, {
            wallet: address,
            vote: daoDATA[0]?.vote
          }).then((response) => {
            setAvatarsLoading(false);
            setAvatars(response.data);
          });
          await Axios.post(`${process.env.REACT_APP_API_HTTP}getProfile`, {
            wallet: address,
            vote: daoDATA[0]?.vote
          }).then((response) => {
            setProfileLoading(false);
            setProfile(response.data);
          });
          setCountRefresh(oldVal => oldVal + 1);
        }
      } catch (error) {
        toastEffect("error", "Code: 101981");
      }
    };
    getAvatarsAndProfiles();
  }, [daoDATA, address, refreshAvatarsAndProfiles]);

  //getCreationData----------------
  useEffect(() => {
    const getCreation = async () => {
      try {
        if (daoDATA.length !== 0) {
          await Axios.post(`${process.env.REACT_APP_API_HTTP}get_creation_value`, {
            creationID: daoDATA[0]?.creation_id
          }).then((response) => {
            setDataCreation(response.data);
            setDataLoading(false);
          });
        }
      } catch (error) {
        toastEffect("error", "Code: 101982");
      }
    };
    getCreation();
  }, [daoDATA]);

  function handleOpenedModal(img, wallet, vote) {
    setAvatarImg(img);
    setAvatarWallet(wallet);
    setAvatarVote(vote);
  };
  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  function resShow(kind, stype, msg) {
    setResultMsg(msg);
    setResultKind(kind);
    setResultType(stype);
    setTimeout(() => {
      setResultType("info");
      setResultKind("Note!");
      setResultMsg("you can only change your avatar and name once a day only.");
    }, 10000);
  }

  async function setAvatar(img, wallet, vote) {
    setIsSettingAvatar(true);
    if (!address) {
      return;
    }
    if (wallet !== address) {
      resShow("Error!", "danger", "This is not allowed!");
      return;
    }
    const _editionDrop = await getSDK().getContract(daoDATA[0]?.editiondrop, "edition-drop");
    const balance = await _editionDrop.balanceOf(address, 0);
    if (!balance.gt(0)) {
      resShow("Error!", "danger", "Members only!");
      setTimeout(() => window.location.reload(), 2000);
      return;
    }
    try {
      if (address !== undefined) {
        await Axios.post(`${process.env.REACT_APP_API_HTTP}setAvatar`, {
          vote: vote,
          img: img,
          wallet: wallet
        }).then((response) => {
          resShow("Success!", "success", "Saved successfully!");
          setIsSettingAvatar(false);
          refetchData();
        });
      }
    } catch (error) {
      if (error.response.status === 500) {
        resShow("Error!", "danger", "There was a problem with the server");
      } else {
        resShow("Error!", "danger", error.response.data.msg);
      }
    }
  }

  const handleName = event => {
    setInputName(event.target.value);
  };

  function changeNameRes(id, response) {
    document.getElementById(id).style.borderColor = response;
    setTimeout(() => {
      document.getElementById(id).style.borderColor = "";
    }, 5000);
  }

  async function setName() {
    setNameIsLoading(true);
    if (!address) {
      return;
    }
    if (inputName === "") {
      setNameIsLoading(false);
      changeNameRes("setname", "red");
      return;
    }
    if (inputName.length > 20) {
      setNameIsLoading(false);
      changeNameRes("setname", "red");
      return;
    }
    const _editionDrop = await getSDK().getContract(daoDATA[0]?.editiondrop, "edition-drop");
    const balance = await _editionDrop.balanceOf(address, 0);
    if (!balance.gt(0)) {
      setTimeout(() => window.location.reload(), 2000);
      return;
    }
    try {
      if (address !== undefined) {
        await Axios.post(`${process.env.REACT_APP_API_HTTP}setName`, {
          wallet: address,
          name: inputName,
          vote: daoDATA[0]?.vote
        }).then((response) => {
          setNameResult("success");
          changeNameRes("setname", "green");
          refetchData();
        });
      }
    } catch (error) {
      if (error.response.status === 500) {
        toastEffect("error", "Code: 101983");
      } else {
        changeNameRes("setname", "red");
      }
    }
  }

  const handleAvatars = e => {
    setAvatarcontractAddress(e.target.value);
    setFetchingNFT(false);
  };

  async function handleAdd(image, id, name, uri, description) {
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}addAvatar`, {
        wallet: address,
        contract: avatarData,
        vote: daoDATA[0]?.vote,
        image: image,
        id: id,
        name: name,
        uri: uri,
        description: description
      }).then((response) => {
        refetchData();
        alertResponse("Success!", "success", "Successfully added to your avatar list.");
      });
    } catch (error) {
      if (error.response.status === 500) {
        alertResponse("Error!", "danger", "There was a problem with the server");
      } else {
        alertResponse("Error!", "danger", error.response.data.msg);
      }
    }
  };

  function alertResponse(kind, type, msg) {
    setAlertMSG(msg);
    setAlertKind(kind);
    setAlertType(type);
    setTimeout(() => {
      setAlertType("info");
      setAlertKind("Note!");
      setAlertMSG("when adding a new avatar be sure that you own the NFT and provide only contract address.");
    }, 10000);
  }

  useEffect(() => {
    const checkIfHasData = () => {
      if (!isLoading) {
        setFetchingNFT(false);
        return;
      }
      if (_error) {
        setAvatarData("");
        setFetchingNFT(false);
        setAvatarcontractAddress("");
        alertResponse("Error!", "danger", "there is an error! it seems like the contract address you provided is invalid");
        return;
      }
    };
    checkIfHasData();
  }, [isLoading, _error]);

  const addAvatar = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFetchingNFT(true);

    if (!address) {
      return;
    }
    if (avatarcontractAddress.length !== 42) {
      setAvatarData("");
      setFetchingNFT(false);
      setAvatarcontractAddress("");
      alertResponse("Error!", "danger", "there is an error! it seems like the contract address you provided is invalid");
      return;
    }
    try {
      await getSDK().getContract(avatarcontractAddress).then(() => {
        setAvatarData(avatarcontractAddress);
      });
    } catch (err) {
      toastEffect("error", "Code: 101984");
      setFetchingNFT(false);
      alertResponse("Error!", "danger", "there is an error! it seems like the contract address you provided is invalid");
    }
  };

  const handleEmail = (e) => {
    setRequestEmail(e.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  function requestAlert(msg, kind) {
    setRequestAlert(msg);
    setRequestKind(kind);
    setSending(false);
    setTimeout(() => {
      setRequestAlert("");
    }, 5000);
  };

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.key === "Enter" && !e.shiftKey) {
      if (message.trim().length === 0) {
        setMessage("");
      } else {
        sendRequest(e);
      }
    }
  };

  const sendRequest = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSending(true);

    if (!address) {
      return;
    }
    if (requestEmail === "") {
      requestAlert("Error! email address is required", "tomato");
      return;
    }
    if (message === "") {
      requestAlert("Error! at least a short explaination.", "tomato");
      return;
    }
    if (address !== daoDATA[0]?.wallet) {
      requestAlert("Error! this is not possible.", "tomato");
      return;
    }

    try {
      const _editionDrop = await getSDK().getContract(daoDATA[0]?.editiondrop, "edition-drop");
      const balance = await _editionDrop.balanceOf(address, 0);
      if (!balance.gt(0)) {
        requestAlert("Error! members only!", "tomato");
        return;
      }

      await Axios.post(`${process.env.REACT_APP_API_HTTP}sendRequest`, {
        requester: address,
        daoID: daoDATA[0]?.id,
        creationID: daoDATA[0]?.creation_id,
        email: requestEmail,
        message: message,
      }).then(async (response) => {
        await socket.emit("request", {
          kind: "request",
          requester: address,
          daoName: daoDATA[0]?.dao_name,
          daoIMG: daoDATA[0]?.dao_image
        });
        requestAlert("Sent successfully", "green");
      });
    } catch (err) {
      if (err.response.status === 500) {
        requestAlert("Error! There was a problem with the server.", "tomato");
      } else {
        requestAlert("Error! " + err.response.data.msg, "tomato");
      }
    }
  };

  const emptyFunction = async () => { };

  const refetchData = async () => {
    setRecheckNFTHolder(oldID => oldID + 1);
    setRefreshAvatarsAndProfiles(oldID => oldID + 1);
    setCountRefresh(0);
    setRefreshing(true);
  };

  useEffect(() => {
    const checkIfDONE = () => {
      if (countRefresh === 2) {
        setRefreshing(false);
        setCountRefresh(0);
      }
    };
    checkIfDONE();
  }, [countRefresh]);

  if (address && isHolderLoading || daoDataLoading) {
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
                  <b>Dao Settings</b>
                  <Tooltip placement="top" title="Reload" arrow>
                    <b className="dao-links"><i className="fas fa-sync gio_default_property"></i></b>
                  </Tooltip>
                </h3>
              </div>
            </div>
            <LoadEffect />
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <>
        <section className="profile-account-setting">
          <div className="container">
            <div className="account-tabs-setting">
              <div className="row">
                <div className="company-title">
                  <h3 id="gio_alignment">
                    <Tooltip placement="top" title="Return back" arrow>
                      <b id="gio_left"><i className="fas fa-angle-double-left gio_default_property" onClick={() => navigate(-1)}></i></b>
                    </Tooltip>
                    <b>Dao Settings</b>
                    <Tooltip placement="top" title="Reload" arrow>
                      <b className="dao-links"><i className={refreshing ? "fas fa-sync fa-spin" : "fas fa-sync gio_default_property"} onClick={refreshing ? emptyFunction : refetchData}></i></b>
                    </Tooltip>
                  </h3>
                </div>
                <Leftside
                  address={address}
                  selectedTab={selectedTab}
                  isHolder={isHolder}
                  daoDATA={daoDATA}
                />
                <div className="col-lg-9">
                  <div className="tab-content" id="nav-tabContent">
                    <Rules
                      address={address}
                      selectedTab={selectedTab}
                      dataCreation={dataCreation}
                    />
                    {address && isHolder && (
                      <Profile
                        address={address}
                        selectedTab={selectedTab}
                        avatarsLoading={avatarsLoading}
                        daoDATA={daoDATA}
                        avatars={avatars}
                        profile={profile}
                        inputName={inputName}
                        nameIsLoading={nameIsLoading}
                        nameResult={nameResult}
                        setName={setName}
                        handleName={handleName}
                        shortenAddress={shortenAddress}
                        handleOpenedModal={handleOpenedModal}
                      />
                    )}
                    {address === daoDATA[0]?.wallet && (
                      <Deactivate
                        selectedTab={selectedTab}
                        requestKind={requestKind}
                        _requestAlert={_requestAlert}
                        sending={sending}
                        message={message}
                        setMessage={setMessage}
                        sendRequest={sendRequest}
                        handleEmail={handleEmail}
                        handleMessage={handleMessage}
                        handleKeypress={handleKeypress}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >

        <SetAvatar
          resultType={resultType}
          resultKind={resultKind}
          resultMsg={resultMsg}
          avatarImg={avatarImg}
          avatarWallet={avatarWallet}
          avatarVote={avatarVote}
          isSettingAvatar={isSettingAvatar}
          setAvatar={setAvatar}
        />

        <AddAvatar
          alertType={alertType}
          alertKind={alertKind}
          alertMSG={alertMSG}
          avatarcontractAddress={avatarcontractAddress}
          fetchingNFT={fetchingNFT}
          ownedNFTs={ownedNFTs}
          handleAdd={handleAdd}
          addAvatar={addAvatar}
          handleAvatars={handleAvatars}
        />
      </>
    );
  }
};

export default Settings;
