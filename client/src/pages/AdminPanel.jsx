import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { ethers } from "ethers";
import toast from 'react-hot-toast';
import Axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import LoadEffect from "../LoadEffect";
import LeftMenu from "../components/Admin/LeftMenu";
import Controls from "../components/Admin/Controls";
import Accounts from "../components/Admin/Accounts";
import Requests from "../components/Admin/Requests";
import Histories from "../components/Admin/Histories";
import Access from "../components/Admin/Access";

const Admin_Panel = () => {

  moment.locale("en");

  const address = useAddress();
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tabLink = params.get("tab");
  const _requestID = params.get("request_id");
  const histories = params.get("history");

  const [refreshBalanceAndSupply, setRefreshBalanceAndSupply] = useState(0);
  const [refreshConfig, setRefreshConfig] = useState(0);
  const [panelReload, setPanelReload] = useState(0);
  const [selectedTab, setSelectedTab] = useState([]);
  const [ImREALConfig, setImREALConfig] = useState([]);
  const [tokenBalance, setTokenBalance] = useState([]);
  const [totalSupply, setTotalSupply] = useState([]);
  const [tokenEvents, setTokenEvents] = useState([]);
  const [transactionOptions, setTransactionOptions] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [requests, setRequests] = useState([]);
  const [DAOData, setDAOData] = useState([]);
  const [DAODeactivateData, setDAODeactivateData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [balanceAndSupplyLoading, setBalanceAndSupplyLoading] = useState(true);
  const [adminAccount, setAdminAccount] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [checkingIfValidWallet, setCheckingIfValidWallet] = useState(false);
  const [checkingIfValidContract, setCheckingIfValidContract] = useState(false);
  const [checkingIfValidAdminWallet, setCheckingIfValidAdminWallet] = useState(false);
  const [_copyAddress, setCopyAddress] = useState(new Set());
  const [webWalletVal, setWebWalletVal] = useState("");
  const [adminWallet, setAdminWallet] = useState("");
  const [contractAddressVal, setContractAddressVal] = useState("");
  const [RPCURLVal, setRPCURLVal] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchTransaction, setSearchTransaction] = useState("");
  const [selectedOption, setSelectedOption] = useState("0");
  const [selectedTransactionOption, setSelectedTransactionOption] = useState("all");

  const toastEffect = (kind, message, toastHandler = toast) => {
    if (kind === "error") {
      toastHandler.error(message, { style: { background: '#3a62e4', color: '#fff' } });
    } else {
      toastHandler.success(message, { style: { background: '#3a62e4', color: '#fff' } });
    }
  };

  const messageClicked = async (requestID, requestStatus) => {
    document.getElementById("requested").classList.add("active");
    document.getElementById("requested").classList.add("show");
    document.getElementById("request").classList.remove("active");
    document.getElementById("request").classList.remove("show");
    window.history.pushState("object or string", "Title", `?tab=request&request_id=${requestID}`);
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}updateRequestStatus`, {
        requestID: requestID,
        requestStatus: requestStatus
      }).then(() => {
        const _requestData = requests.find(({ id }) => id === requestID);
        setRequestData(_requestData);
      });
    } catch (err) {
      toastEffect("error", "Code: 101929");
    }
  };

  const historyClicked = async (e) => {
    document.getElementById("hitories").classList.add("active");
    document.getElementById("hitories").classList.add("show");
    document.getElementById("nav-control").classList.remove("active");
    document.getElementById("nav-control").classList.remove("show");
    window.history.pushState("object or string", "Title", "?tab=control&history=true");
  };

  useEffect(() => {
    const shiftRequestData = () => {
      if (!requestData || !address) {
        return;
      }
      const _requestData = requests.find(({ id }) => id === parseInt(_requestID));
      setRequestData(_requestData);
    };
    shiftRequestData();
  }, [requests]);

  const handleBackRequest = (idAdd, idRemove) => {
    document.getElementById(idAdd).classList.add("active");
    document.getElementById(idAdd).classList.add("show");
    document.getElementById(idRemove).classList.remove("active");
    document.getElementById(idRemove).classList.remove("show");
    handleReload();
  };

  function getSDK() {
    try {
      const _sdk = new ThirdwebSDK(process.env.REACT_APP_RPC_URL);
      return _sdk;
    } catch (error) {
      toastEffect("error", "Code: 101930");
    }
  }

  useEffect(() => {
    const getAdminAccounts = async () => {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}checkAdmin`, {
      }).then(async (response) => {
        const isAdmin = await response.data.find(({ wallet }) => wallet === address);
        const isFound = await response.data.some(element => {
          if (element.wallet === address) {
            return true;
          }
          return false;
        });
        setPanelReload(oldCount => oldCount + 1);
        setIsAdmin(isFound);
        setAdminAccount(isAdmin);
      });
      await Axios.post(`${process.env.REACT_APP_API_HTTP}getAdminAccounts`, {
      }).then((response) => {
        setAdmins(response.data);
      });
      await Axios.post(`${process.env.REACT_APP_API_HTTP}getRequests`, {
      }).then((response) => {
        setRequests(response.data);
      });
      await Axios.post(`${process.env.REACT_APP_API_HTTP}get_real_daos`, {
      }).then((response) => {
        setDAOData(response.data);
      });
      await Axios.post(`${process.env.REACT_APP_API_HTTP}get_deactivated_dao`, {
      }).then((response) => {
        setDAODeactivateData(response.data);
      });
    };
    getAdminAccounts();
  }, [address, refreshConfig]);

  const mergeRequests = requests.map(request => {
    const daoData = DAOData.find(({ id }) => id === request.request_dao_id);
    const daoDataDeactivated = DAODeactivateData.find(({ id }) => id === request.request_dao_id);
    return {
      daoData: daoData || daoDataDeactivated,
      request
    };
  });

  useEffect(() => {
    if (!address || !isAdmin) {
      return;
    }
    const getconfig = async () => {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}get_config`, {
      }).then((response) => {
        setImREALConfig(response.data);
        setPanelReload(oldCount => oldCount + 1);
      });
    };
    getconfig();
  }, [adminAccount, address, refreshConfig]);

  useEffect(() => {
    const getTokenBalance = async () => {
      try {
        if (ImREALConfig.length !== 0) {
          const filters = {
            fromBlock: 0,
            toBlock: parseInt(ImREALConfig[0]?.ImREAL_blocks),
          };
          const uniqueIds = [];
          const _token = await getSDK().getContract(ImREALConfig[0]?.ImREAL_token, "token");
          const token_balance = await _token.balanceOf(ImREALConfig[0]?.ImREAL_wallet);
          const total_supply = await _token.totalSupply();
          const tokenEvents = await _token.events.getAllEvents(filters);
          const filteredOption = tokenEvents.filter(element => {
            const isDuplicate = uniqueIds.includes(element.eventName);
            if (!isDuplicate) {
              uniqueIds.push(element.eventName);
              return true;
            }
            return false;
          });
          setTokenBalance(token_balance);
          setTotalSupply(total_supply);
          setTokenEvents(tokenEvents.reverse());
          setTransactionOptions(filteredOption);
          setPanelReload(oldCount => oldCount + 1);
          setBalanceAndSupplyLoading(false);
        }
      } catch (err) {
        toastEffect("error", "Code: 101931");
      }
    };
    getTokenBalance();
  }, [ImREALConfig, refreshBalanceAndSupply]);

  useEffect(() => {
    const setTab = () => {
      switch (tabLink) {
        case "control":
          return setSelectedTab(tabLink);
        case "accounts":
          return setSelectedTab(tabLink);
        case "request":
          return setSelectedTab(tabLink);
        default:
          return setSelectedTab([]);
      }
    };
    setTab();
  }, [adminAccount, address]);

  const emptyFunction = async () => { };

  const handleReload = () => {
    setRefreshBalanceAndSupply(oldVal => oldVal + 1);
    setRefreshConfig(oldVal => oldVal + 1);
    setPanelReload(0);
    setRefreshing(true);
  };

  useEffect(() => {
    const checkIfDONE = () => {
      if (panelReload === 3) {
        setPanelReload(0);
        setRefreshing(false);
      }
    };
    checkIfDONE();
  }, [panelReload]);

  const shortenDisplay = (str) => {
    return str.substring(0, 10,) + "..." + str.substring(str.length - 10);
  };

  const ConvertBignumber = (data) => {
    return ethers.utils.formatEther(data);
  };

  function responseAlert(id, color) {
    document.getElementById(id).style.color = color;
    setTimeout(() => document.getElementById(id).style.color = "", 5000);
  }

  const handleExecVal = async (e) => {
    const checkIsEmpty = e.currentTarget.textContent.trim().length;
    const checkIsString = !isNaN(+e.currentTarget.textContent);

    if (!address || !isAdmin) {
      return;
    }
    if (checkIsEmpty === 0) {
      responseAlert("exec_val", "red");
      return;
    }
    if (!checkIsString) {
      responseAlert("exec_val", "red");
      return;
    }
    try {
      responseAlert("exec_val", "green");
      await Axios.post(`${process.env.REACT_APP_API_HTTP}updateExecVal`, {
        execVal: e.currentTarget.textContent.trim()
      });
    } catch (err) {
      toastEffect("error", "Code: 101932");
    }
  };

  const handleBlocks = async (e) => {
    const checkIsEmpty = e.currentTarget.textContent.trim().length;
    const checkIsString = !isNaN(+e.currentTarget.textContent);
    if (!address || !isAdmin) {
      return;
    }
    if (checkIsEmpty === 0) {
      responseAlert("options", "red");
      return;
    }
    if (!checkIsString) {
      responseAlert("options", "red");
      return;
    }
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}updateBlocks`, {
        blocks: e.currentTarget.textContent.trim()
      }).then((response) => {
        handleReload();
      });
    } catch (err) {
      toastEffect("error", "Code: 101933");
    }
  };

  const copyAddress = async (wallet, idx) => {
    setCopyAddress((prev) => new Set([...prev, idx]));
    try {
      navigator.clipboard.writeText(wallet);
      setTimeout(() => setCopyAddress(new Set()), 2000);
    } catch (err) {
      toastEffect("error", "Code: 101934");
    }
  };

  const handleAdminAlias = async (e) => {
    const checkIsEmpty = e.currentTarget.textContent.trim().length;
    const getData = e.target.attributes.getNamedItem("data-id").value;
    if (!address || !isAdmin) {
      return;
    }
    if (checkIsEmpty === 0) {
      responseAlert("alias", "red");
      return;
    }
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}updateAlias`, {
        adminID: getData,
        alis: e.currentTarget.textContent.trim()
      });
    } catch (err) {
      toastEffect("error", "Code: 101935");
    }
  };

  const handleClaimVal = async (e) => {
    const checkIsEmpty = e.currentTarget.textContent.trim().length;
    const checkIsString = !isNaN(+e.currentTarget.textContent);

    if (!address || !isAdmin) {
      return;
    }
    if (checkIsEmpty === 0) {
      responseAlert("claim_val", "red");
      return;
    }
    if (!checkIsString) {
      responseAlert("claim_val", "red");
      return;
    }
    try {
      responseAlert("claim_val", "green");
      await Axios.post(`${process.env.REACT_APP_API_HTTP}updateClaimVal`, {
        execVal: e.currentTarget.textContent.trim()
      });
    } catch (err) {
      toastEffect("error", "Code: 101936");
    }
  };

  const handleExecSwitch = async (e) => {
    if (!address || !isAdmin) {
      return;
    }
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}updateExecSwitch`, {
        execValStatus: e.target.checked
      });
    } catch (err) {
      toastEffect("error", "Code: 101937");
    }
  };

  const handleAdminSwitch = async (e) => {
    const getData = e.target.attributes.getNamedItem("data-id").value;
    if (!address || !isAdmin) {
      return;
    }
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}updateAdminSwitch`, {
        adminID: getData,
        adminStatus: e.target.checked
      }).then((response) => {
        handleReload();
      });
    } catch (err) {
      toastEffect("error", "Code: 101938");
    }
  };

  const handleOptions = async (e) => {
    const getData = e.target.attributes.getNamedItem("data-id").value;
    if (!address || !isAdmin) {
      return;
    }
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}updateOptions`, {
        table: e.target.value,
        adminID: getData,
        adminStatus: e.target.checked
      }).then((response) => {
        handleReload();
      });
    } catch (err) {
      toastEffect("error", "Code: 101939");
    }
  };

  function checkKind(kind) {
    switch (kind) {
      case 1: return setCheckingIfValidWallet(true);
      case 2: return setCheckingIfValidContract(true);
      case 3: return setCheckingIfValidAdminWallet(true);
    }
  }

  async function checkIfValid(tokencontract, address, kind) {
    try {
      checkKind(kind);
      const _token = await getSDK().getContract(tokencontract, "token");
      await _token.balanceOf(address);
      setCheckingIfValidWallet(false);
      setCheckingIfValidContract(false);
      setCheckingIfValidAdminWallet(false);
      return (true);
    } catch (err) {
      setCheckingIfValidWallet(false);
      setCheckingIfValidContract(false);
      setCheckingIfValidAdminWallet(false);
      return (false);
    }
  }

  const handleWebWallet = async (e) => {
    const getLength = e.target.value.trim().length;
    setWebWalletVal(e.target.value.trim());
    if (!address || !isAdmin) {
      return;
    }
    if (getLength !== 42) {
      responseAlert("web_wallet", "red");
      return;
    }
    const chekIfValid = await checkIfValid(ImREALConfig[0]?.ImREAL_token, e.target.value.trim(), 1);
    if (!chekIfValid) {
      responseAlert("web_wallet", "red");
      return;
    }

    try {
      responseAlert("web_wallet", "green");
      await Axios.post(`${process.env.REACT_APP_API_HTTP}updateWebWallet`, {
        newWebWallet: e.target.value.trim()
      }).then((response) => {
        setTimeout(() => setWebWalletVal(""), 3000);
        handleReload();
      });
    } catch (err) {
      toastEffect("error", "Code: 101940");
    }
  };

  const handleAdminWallet = async (e) => {
    const getLength = e.target.value.trim().length;
    setAdminWallet(e.target.value.trim());
    if (!address || !isAdmin) {
      return;
    }
    if (getLength !== 42) {
      responseAlert("admin_wallet", "red");
      return;
    }
    const chekIfValid = await checkIfValid(ImREALConfig[0]?.ImREAL_token, e.target.value.trim(), 3);
    if (!chekIfValid) {
      responseAlert("admin_wallet", "red");
      return;
    }
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}addAdminWallet`, {
        adminWallet: e.target.value.trim()
      }).then((response) => {
        responseAlert("admin_wallet", "green");
        setTimeout(() => setAdminWallet(""), 3000);
        handleReload();
      });
    } catch (err) {
      toastEffect("error", "Code: 101941");
    }
  };

  const handleContractAddress = async (e) => {
    const getLength = e.target.value.trim().length;
    setContractAddressVal(e.target.value.trim());
    if (!address || !isAdmin) {
      return;
    }
    if (getLength !== 42) {
      responseAlert("contract_address", "red");
      return;
    }
    const chekIfValid = await checkIfValid(e.target.value.trim(), ImREALConfig[0]?.ImREAL_wallet, 2);
    if (!chekIfValid) {
      responseAlert("contract_address", "red");
      return;
    }
    try {
      responseAlert("contract_address", "green");
      await Axios.post(`${process.env.REACT_APP_API_HTTP}updateTokenContract`, {
        newTokenContract: e.target.value.trim()
      }).then((response) => {
        setTimeout(() => setContractAddressVal(""), 3000);
        handleReload();
      });
    } catch (err) {
      toastEffect("error", "Code: 101942");
    }
  };

  async function checkRPCURL(url) {
    try {
      await fetch(url, { method: 'HEAD' });
      return 1;
    } catch (err) {
      return 0;
    }
  }

  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  let searchNameHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchName(lowerCase);
  };

  let searchTransactions = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchTransaction(lowerCase);
  };

  let filterStatusHandler = (e) => {
    const selected = e.target.value;
    setSelectedOption(selected);
  };

  let filterTransactionOption = (e) => {
    const selected = e.target.value;
    setSelectedTransactionOption(selected);
  };

  const filteredStatus = admins.filter((el) => {
    switch (selectedOption) {
      case "0": return el;
      case "1": return el.isActive === 0;
      case "2": return el.isActive === 1;
      default:
        return el;
    }
  });

  const filteredOption = tokenEvents.filter((el) => {
    switch (selectedTransactionOption) {
      case "all": return el;
      case selectedTransactionOption: return el.eventName === selectedTransactionOption;
      default:
        return el;
    }
  });

  const filteredData = filteredStatus.filter((el) => {
    if (searchName === '') {
      return el;
    }
    else {
      const searchData = el.wallet + el.alias;
      return searchData.toLowerCase().includes(searchName);
    }
  });

  const filteredTransaction = filteredOption.filter((el) => {
    if (searchTransaction === '') {
      return el;
    }
    else {
      const searchData = JSON.stringify(el.data, null, 2) + JSON.stringify(el.transaction, null, 2) + el.eventName;
      return searchData.toLowerCase().includes(searchTransaction);
    }
  });

  const handleRPCURL = async (e) => {
    const getLength = e.target.value.trim().length;
    setRPCURLVal(e.target.value.trim());
    if (!address || !isAdmin) {
      return;
    }
    if (getLength === 0) {
      responseAlert("rpc_url", "red");
      return;
    }
    if (await checkRPCURL(e.target.value.trim()) === 0) {
      responseAlert("rpc_url", "red");
      return;
    }
    if (!validURL(e.target.value.trim())) {
      responseAlert("rpc_url", "red");
      return;
    }
    try {
      responseAlert("rpc_url", "green");
      await Axios.post(`${process.env.REACT_APP_API_HTTP}updatRPCURL`, {
        RPCURL: e.target.value.trim()
      }).then((response) => {
        setTimeout(() => setRPCURLVal(""), 3000);
        handleReload();
      });
    } catch (err) {
      toastEffect("error", "Code: 101943");
    }
  };

  const handleDelete = async (adminID) => {
    const _adminID = adminID;
    if (!address || !isAdmin) {
      return;
    }
    try {
      Swal.fire({
        title: 'Delete Admin?',
        text: "You won't be able to revert this!",
        width: '300',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await Axios.delete(`${process.env.REACT_APP_API_HTTP}removeAdmin/${_adminID}`)
            .then((res) => {
              handleReload();
            });
        }
      });
    } catch (err) {
      toastEffect("error", "Code: 101944");
    }
  };

  if (!isAdmin || balanceAndSupplyLoading) {
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
                  <b>Admin Panel</b>
                  <Tooltip placement="top" title="Reload" arrow>
                    <b className="dao-links"><i className="fas fa-sync gio_default_property"></i></b>
                  </Tooltip>
                </h3>
              </div>
              <LoadEffect />
            </div>
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
                    <b>Admin Panel</b>
                    <Tooltip placement="top" title="Reload" arrow>
                      <b className="dao-links"><i className={refreshing ? "fas fa-sync fa-spin" : "fas fa-sync gio_default_property"} onClick={refreshing ? emptyFunction : handleReload}></i></b>
                    </Tooltip>
                  </h3>
                </div>
                <LeftMenu
                  adminAccount={adminAccount}
                  selectedTab={selectedTab}
                />
                <div className="col-lg-9">
                  <div className="tab-content" id="nav-tabContent">
                    {!!adminAccount?.controls && (
                      <Controls
                        selectedTab={selectedTab}
                        histories={histories}
                        ImREALConfig={ImREALConfig}
                        tokenBalance={tokenBalance}
                        totalSupply={totalSupply}
                        webWalletVal={webWalletVal}
                        checkingIfValidWallet={checkingIfValidWallet}
                        contractAddressVal={contractAddressVal}
                        checkingIfValidContract={checkingIfValidContract}
                        RPCURLVal={RPCURLVal}
                        handleRPCURL={handleRPCURL}
                        handleExecVal={handleExecVal}
                        handleClaimVal={handleClaimVal}
                        historyClicked={historyClicked}
                        shortenDisplay={shortenDisplay}
                        handleWebWallet={handleWebWallet}
                        handleExecSwitch={handleExecSwitch}
                        handleContractAddress={handleContractAddress}
                      />
                    )}
                    {!!adminAccount?.accounts && (
                      <Accounts
                        address={address}
                        selectedTab={selectedTab}
                        filteredData={filteredData}
                        _copyAddress={_copyAddress}
                        adminWallet={adminWallet}
                        checkingIfValidAdminWallet={checkingIfValidAdminWallet}
                        copyAddress={copyAddress}
                        handleDelete={handleDelete}
                        handleOptions={handleOptions}
                        shortenDisplay={shortenDisplay}
                        handleAdminAlias={handleAdminAlias}
                        searchNameHandler={searchNameHandler}
                        handleAdminWallet={handleAdminWallet}
                        handleAdminSwitch={handleAdminSwitch}
                        filterStatusHandler={filterStatusHandler}
                      />
                    )}
                    {!!adminAccount?.requests && (
                      <Requests
                        moment={moment}
                        selectedTab={selectedTab}
                        _requestID={_requestID}
                        mergeRequests={mergeRequests}
                        messageClicked={messageClicked}
                        handleBackRequest={handleBackRequest}
                        requestData={requestData}
                      />
                    )}
                    {!!adminAccount?.controls && (
                      <Histories
                        histories={histories}
                        ImREALConfig={ImREALConfig}
                        transactionOptions={transactionOptions}
                        filteredTransaction={filteredTransaction}
                        handleBlocks={handleBlocks}
                        shortenDisplay={shortenDisplay}
                        ConvertBignumber={ConvertBignumber}
                        handleBackRequest={handleBackRequest}
                        searchTransactions={searchTransactions}
                        filterTransactionOption={filterTransactionOption}
                      />
                    )}
                    <Access
                      selectedTab={selectedTab}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};
export default Admin_Panel;