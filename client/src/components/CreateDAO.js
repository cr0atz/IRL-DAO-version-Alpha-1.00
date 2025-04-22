import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useAddress } from "@thirdweb-dev/react";
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import Tooltip from '@mui/material/Tooltip';
import 'nprogress/nprogress.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DAO from "../components/getDAO";

export const CreateDAO = () => {

  const captchaRef = useRef(null);
  const address = useAddress();
  const [progress, setProgress] = useState(0);
  const [tokenVal, setTokenVal] = useState(0);
  const [transferred, setTransferred] = useState(0);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [DAOName, setDAOName] = useState('');
  const [RPCURL, setRPCURL] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [SDKaddress, setSDKaddress] = useState('');
  const [createdID, setCreatedID] = useState('');
  const [DAOCreation, setDAOCreation] = useState([]);
  const [ImREALConfig, setImREALConfig] = useState([]);
  const [siteKey, setSiteKey] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [status, setStatus] = useState("");
  const [_copyDAOAddress, setCopyDAOAddress] = useState(false);
  const [adminAccount, setAdminAccount] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  //const [newOwner, setNewOwner] = useState("");

  const { data: DAOData, loading: daoLoading, error: daoError, refetch: daoRefresh } = DAO(address, DAOCreation[0]?.privatekey);


  var save = (<><i className="fas fa-sync"></i><b> Create DAO</b></>);
  var load = (<><i className="fas fa-sync fa-spin"></i><b> Creating...</b></>);

  const toastEffect = (kind, message, toastHandler = toast) => {
    if (kind === "error") {
      toastHandler.error(message, { style: { background: '#3a62e4', color: '#fff' } });
    } else {
      toastHandler.success(message, { style: { background: '#3a62e4', color: '#fff' } });
    }
  };

  const _number = parseInt(transferred) / parseInt(tokenVal) * 100;

  useEffect(() => {
    try {
      const axiosFunctions = async () => {
        await axios.post(`${process.env.REACT_APP_API_HTTP}get_config`, {
        }).then((response) => {
          setSiteKey(response.data[0].recaptcha_site_key);
          setRPCURL(response.data[0].ImREAL_RPC);
          setImREALConfig(response.data);
        });

        await axios.post(`${process.env.REACT_APP_API_HTTP}get_creation`, {
          wallet: address
        }).then((response) => {
          setTokenVal(response.data[0].token_amount);
          setTransferred(response.data[0].token_transfer);
          setTokenName(response.data[0].token_name);
          setTokenSymbol(response.data[0].token_symbol);
          setDAOName(response.data[0].vote_name);
          setPrivateKey(response.data[0].privatekey);
          setSDKaddress(response.data[0].sdk_wallet);
          setCreatedID(response.data[0].id);
          setDAOCreation(response.data);
        });
      };
      axiosFunctions();
    } catch (err) {
      toastEffect("error", "Code: 101996");
    }
  }, [siteKey, tokenVal, address, createdID]);

  useEffect(() => {
    try {
      const getAdminAccounts = async () => {
        await axios.post(`${process.env.REACT_APP_API_HTTP}checkAdmin`, {
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
      toastEffect("error", "Code: 101997");
    }
  }, [address]);

  /*const axiosGetCreatedDAO = async () => {
    await axios.post(`${process.env.REACT_APP_API_HTTP}get_created_dao`, {
      createdID: createdID
    });
  };*/

  async function continueExecution(progress) {
    const creationID = DAOCreation[0].id;
    const _DAOName = DAOCreation[0].vote_name;
    const _ImREALWallet = ImREALConfig[0].ImREAL_wallet;
    const _ImREALToken = ImREALConfig[0].ImREAL_token;
    const _ImREALClaimVal = ImREALConfig[0].ImREAL_claimVal;
    const nftName = DAOCreation[0].nft_name;
    const nftDesc = DAOCreation[0].nft_description;
    const nftIMG = DAOCreation[0].nft_img;
    const tokenName = DAOCreation[0].token_name;
    const tokenSymbol = DAOCreation[0].token_symbol;
    const tokenIMG = DAOCreation[0].token_img;
    const mintAmount = DAOCreation[0].token_amount;
    const voteIMG = DAOCreation[0].vote_img;
    const voteDelay = DAOCreation[0].vote_delay;
    const votePeriod = DAOCreation[0].vote_period;
    const voteQuorum = DAOCreation[0].vote_quorum;
    const tokenThreshhold = DAOCreation[0].token_threshhold;
    const tokenTransfer = DAOCreation[0].token_transfer;

    if (progress === 1) {
      await axios.post(`${process.env.REACT_APP_API_HTTP}creatingNFT`, {
        wallet: address,
        ImREALToken: _ImREALToken,
        ImREALClaimVal: _ImREALClaimVal,
        privateKey: privateKey,
        RPCURL: RPCURL,
        nftName: nftName,
        nftDesc: nftDesc,
        nftIMG: nftIMG,
      }).then((response) => {
        setProgress(40);
        setStatus("Deploying Token");
        daoRefresh();
        continueExecution(2);
      });
    } else if (progress === 2) {
      await axios.post(`${process.env.REACT_APP_API_HTTP}deployingToken`, {
        wallet: address,
        ImREALWallet: _ImREALWallet,
        privateKey: privateKey,
        RPCURL: RPCURL,
        tokenName: tokenName,
        tokenSymbol: tokenSymbol,
        tokenIMG: tokenIMG,
      }).then((response) => {
        setProgress(60);
        setStatus("Minting Token");
        daoRefresh();
        continueExecution(3);
      });
    } else if (progress === 3) {
      await axios.post(`${process.env.REACT_APP_API_HTTP}mintingToken`, {
        wallet: address,
        ImREALWallet: _ImREALWallet,
        privateKey: privateKey,
        RPCURL: RPCURL,
        tokenName: tokenName,
        tokenSymbol: tokenSymbol,
        tokenIMG: tokenIMG,
        mintAmount: mintAmount,
      }).then((response) => {
        setProgress(80);
        setStatus("Creating DAO");
        daoRefresh();
        continueExecution(4);
      });
    } else if (progress === 4) {
      await axios.post(`${process.env.REACT_APP_API_HTTP}deployingVote`, {
        wallet: address,
        privateKey: privateKey,
        RPCURL: RPCURL,
        DAOName: _DAOName,
        voteIMG: voteIMG,
        voteDelay: voteDelay,
        votePeriod: votePeriod,
        voteQuorum: voteQuorum,
        tokenThreshhold: tokenThreshhold,
      }).then((response) => {
        setProgress(90);
        setStatus("Finalizing DAO");
        daoRefresh();
        continueExecution(5);
      });
    } else if (progress === 5) {
      await axios.post(`${process.env.REACT_APP_API_HTTP}setupDAO`, {
        wallet: address,
        privateKey: privateKey,
        RPCURL: RPCURL,
        tokenTransfer: tokenTransfer,
        ImREALWallet: _ImREALWallet,
      }).then((response) => {
        axios.post(`${process.env.REACT_APP_API_HTTP}done_creation`, {
          creationID: creationID
        }).then((response) => {
          setProgress(100);
          daoRefresh();
          //axiosGetCreatedDAO();
          setStatus("Done..!!!");
          setTimeout(() => window.location.href = "/dashboard", 3000);
        });
      });
    }
  }

  function response(type, msg) {
    setIsClicked(false);
    setProgress(0);
    setStatus("");
    sweetAlertEffect(type, msg);
  }

  const onSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    setIsClicked(true);
    const token = await captchaRef.current.getValue();
    //captchaRef.current.reset();
    const dropName = DAOCreation[0].drop_name;
    const dropDesc = DAOCreation[0].drop_description;
    const dropIMG = DAOCreation[0].drop_img;
    const creationID = DAOCreation[0].id;
    const _DAOName = DAOCreation[0].vote_name;
    const _ImREALWallet = ImREALConfig[0].ImREAL_wallet;
    const _ImREALToken = ImREALConfig[0].ImREAL_token;
    const _ImREALClaimVal = ImREALConfig[0].ImREAL_claimVal;
    const nftName = DAOCreation[0].nft_name;
    const nftDesc = DAOCreation[0].nft_description;
    const nftIMG = DAOCreation[0].nft_img;
    const tokenName = DAOCreation[0].token_name;
    const tokenSymbol = DAOCreation[0].token_symbol;
    const tokenIMG = DAOCreation[0].token_img;
    const mintAmount = DAOCreation[0].token_amount;
    const voteIMG = DAOCreation[0].vote_img;
    const voteDelay = DAOCreation[0].vote_delay;
    const votePeriod = DAOCreation[0].vote_period;
    const voteQuorum = DAOCreation[0].vote_quorum;
    const tokenThreshhold = DAOCreation[0].token_threshhold;
    const SDKWallet = DAOCreation[0].sdk_wallet;
    const tokenTransfer = DAOCreation[0].token_transfer;

    if (DAOData[0]?.progress === 1) {
      setProgress(20);
      setStatus("Creating NFT");
    } else if (DAOData[0]?.progress === 2) {
      setProgress(40);
      setStatus("Deploying Token");
    } else if (DAOData[0]?.progress === 3) {
      setProgress(60);
      setStatus("Minting Token");
    } else if (DAOData[0]?.progress === 4) {
      setProgress(80);
      setStatus("Creating DAO");
    } else if (DAOData[0]?.progress === 5) {
      setProgress(90);
      setStatus("Finalizing DAO");
    } else {
      setProgress(0);
      setStatus("Deploying EditionDrop");
    }

    if (!address || !isAdmin) {
      return;
    }
    /*if (newOwner === "") {
      response("error", "DAO Owner wallet address is required!");
      return;
    }
    if (newOwner.length !== 42) {
      response("error", "Wallet address is invalid!");
      return;
    }*/

    await axios.post(`${process.env.REACT_APP_API_HTTP}google_captcha`, {
      token: token
    }).then(async (res) => {

      if (!res.data) {
        captchaRef.current.reset();
        response("error", "Please check captcha first!");
        return;
      }
      try {
        if (DAOData?.length === 0) {
          await axios.post(`${process.env.REACT_APP_API_HTTP}deployingEditiondrop`, {
            wallet: address,
            ImREALWallet: _ImREALWallet,
            dropName: dropName,
            dropDesc: dropDesc,
            dropIMG: dropIMG,
            privateKey: privateKey,
            RPCURL: RPCURL,
            creationID: creationID,
            DAOName: _DAOName,
            voteIMG: voteIMG,
          }).then((response) => {
            setProgress(20);
            daoRefresh();
            setStatus("Creating NFT");
          });
          await axios.post(`${process.env.REACT_APP_API_HTTP}creatingNFT`, {
            wallet: address,
            ImREALToken: _ImREALToken,
            ImREALClaimVal: _ImREALClaimVal,
            privateKey: privateKey,
            RPCURL: RPCURL,
            nftName: nftName,
            nftDesc: nftDesc,
            nftIMG: nftIMG,
          }).then((response) => {
            setProgress(40);
            daoRefresh();
            setStatus("Deploying Token");
          });
          await axios.post(`${process.env.REACT_APP_API_HTTP}deployingToken`, {
            wallet: address,
            ImREALWallet: _ImREALWallet,
            privateKey: privateKey,
            RPCURL: RPCURL,
            tokenName: tokenName,
            tokenSymbol: tokenSymbol,
            tokenIMG: tokenIMG,
          }).then((response) => {
            setProgress(60);
            daoRefresh();
            setStatus("Minting Token");
          });
          await axios.post(`${process.env.REACT_APP_API_HTTP}mintingToken`, {
            wallet: address,
            ImREALWallet: _ImREALWallet,
            privateKey: privateKey,
            RPCURL: RPCURL,
            tokenName: tokenName,
            tokenSymbol: tokenSymbol,
            tokenIMG: tokenIMG,
            mintAmount: mintAmount,
          }).then((response) => {
            setProgress(80);
            daoRefresh();
            setStatus("Creating DAO");
          });
          await axios.post(`${process.env.REACT_APP_API_HTTP}deployingVote`, {
            wallet: address,
            privateKey: privateKey,
            RPCURL: RPCURL,
            DAOName: _DAOName,
            voteIMG: voteIMG,
            voteDelay: voteDelay,
            votePeriod: votePeriod,
            voteQuorum: voteQuorum,
            tokenThreshhold: tokenThreshhold,
          }).then((response) => {
            setProgress(90);
            daoRefresh();
            setStatus("Finalizing DAO");
          });
          await axios.post(`${process.env.REACT_APP_API_HTTP}setupDAO`, {
            wallet: address,
            privateKey: privateKey,
            RPCURL: RPCURL,
            tokenTransfer: tokenTransfer,
            ImREALWallet: _ImREALWallet,
          }).then((response) => {
            axios.post(`${process.env.REACT_APP_API_HTTP}done_creation`, {
              creationID: creationID
            }).then((response) => {
              setProgress(100);
              daoRefresh();
              //axiosGetCreatedDAO();
              setStatus("Done..!!!");
              setTimeout(() => window.location.href = "/dashboard", 3000);
            });
          });
        } else {
          continueExecution(DAOData[0]?.progress);
        }
      } catch (err) {
        if (err.response.status === 500) {
          response("error", "Cannot estimate gas limit");
        } else {
          response("error", err.response.data.msg);
        }
      }
    });

  };

  const copyDAOAddress = async () => {
    setCopyDAOAddress(true);
    try {
      navigator.clipboard.writeText(SDKaddress);
      setTimeout(() => setCopyDAOAddress(false), 2000);
    } catch (err) {
    }
  };

  function sweetAlertEffect(type, message) {
    return (
      <>{Swal.fire({ toast: true, position: 'center', icon: type, text: message, showConfirmButton: false, timer: 5000, width: '320' })}</>
    );
  }

  const shortenAddress = (str) => {
    return str.substring(0, 10,) + "..." + str.substring(str.length - 10);
  };

  return (
    <Fragment>

      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="signup-tab">
            <i className="fa fa-long-arrow-left"></i>
            <h2>Your DAO name</h2>
            <div className="col-lg-12 no-pdd">
              {DAOName}
            </div>
          </div>
          <div className="signup-tab">
            <i className="fa fa-long-arrow-left"></i>
            <h2>Governance Token Name</h2>
            <div className="col-lg-12 no-pdd">
              {tokenName} ({tokenSymbol})
            </div>
          </div>
          <div className="signup-tab">
            <i className="fa fa-long-arrow-left"></i>
            <h2>Governance Token Minted Amount</h2>
            <div className="col-lg-12 no-pdd">
              🟡{parseInt(tokenVal).toLocaleString() + ' (Total Supply)'}
            </div>
          </div>
          <div className="signup-tab">
            <i className="fa fa-long-arrow-left"></i>
            <h2>Governance Token Transferred Amount</h2>
            <div className="col-lg-12 no-pdd">
              🟡{parseInt(transferred).toLocaleString() + ' (' + _number.toFixed(2) + '%)'}
            </div>
          </div>
          <div className="signup-tab">
            <i className="fa fa-long-arrow-left"></i>
            <h2>DAO Creator Address</h2>
            <div className="col-lg-12 no-pdd">
              <Tooltip placement="bottom" title="Copy DAO Address" arrow>
                <p onClick={copyDAOAddress} className="gio_link">
                  <a>{shortenAddress(SDKaddress) + " "}</a>
                  <i className={_copyDAOAddress ? "fas fa-check-circle" : "fas fa-clone"}></i>
                </p>
              </Tooltip>
            </div>
          </div>
          {/*<div className="col-lg-12 no-pdd">
            <div className="sn-field">
              <input onChange={handleOwner} type="text" placeholder="DAO Owner Wallet Address" required />
              <i className="fas fa-wallet"></i>
            </div>
          </div>*/}
          <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} className="g-recaptcha" />
          <div className="login-resources">
            <ProgressBar animated now={progress} label={`${progress}%`} />
            <p>{status}</p>
            <ul>
              <li><button className="fb" style={isClicked ? { backgroundColor: 'gray' } : { cursor: 'pointer' }} disabled={isClicked}>{isClicked ? load : save}</button></li>
            </ul>
          </div>
        </div>
      </form>
    </Fragment >
  );
};
