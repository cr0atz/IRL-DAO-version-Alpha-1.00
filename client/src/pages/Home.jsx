import { useAddress, useContract, useNFT, useTokenSupply, useTokenDecimals } from "@thirdweb-dev/react";
import { ThirdwebSDK, ProposalState } from "@thirdweb-dev/sdk";
import { NumericFormat } from 'react-number-format';
import React, { useState, useEffect } from "react";
import { AddressZero } from "@ethersproject/constants";
import io from "socket.io-client";
import toast from 'react-hot-toast';
import { ethers } from "ethers";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Swal from 'sweetalert2';
import { useLocation } from "react-router";
import Axios from 'axios';
import moment from 'moment';
import StickyBox from "react-sticky-box";
import LoadEffect from "../LoadEffect";
import Proposals from "../components/Home/Proposals";
import Profile from "../components/Home/Profile";
import ProfileGuest from "../components/Home/ProfileGuest";
import Membership from "../components/Home/Membership";
import Ownership from "../components/Home/Ownership";
import DAORules from "../components/Home/DAORules";
import Governance from "../components/Home/Governance";
import Members from "../components/Home/Members";
import Propose from "../components/Home/Propose";
import Footer from "../components/Home/Footer";
import CreateProposal from "../components/Home/CreateProposal";
import AddMember from "../components/Home/AddMember";
import DepositToken from "../components/Home/DepositToken";
import Loading from "../components/Home/Loading";
const { ethereum } = window;
var CryptoJS = require("crypto-js");

const Home = () => {

  moment.locale('en');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const daoLink = params.get("link");
  const theDATA = params.get("data");

  const [DATOS, setDATOS] = useState([]);
  const [decryptedData, setDecryptedData] = useState("");

  useEffect(() => {
    const getDATOS = () => {
      try {
        var bytes = CryptoJS.AES.decrypt(theDATA, process.env.REACT_APP_SECRET_KEY);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        const DATOS = decryptedData.split(",");
        setDATOS(DATOS);
        setDecryptedData(decryptedData);
      } catch (error) {
        window.location.href = "../err=notexist";
        process.exit?.(1);
      }
    };
    getDATOS();
  }, [theDATA]);

  const address = useAddress();

  const vote = useContract(DATOS[2], "vote").contract;
  const token = useContract(DATOS[1], "token").contract;
  const editionDrop = useContract(DATOS[0], "edition-drop").contract;
  const ImREAL = useContract(process.env.REACT_APP_TOKEN_ImREAL, "token").contract;
  const { contract } = useContract(DATOS[1]);
  const { data: decimals, isLoading: decimalLoading, error: decimalError } = useTokenDecimals(contract);
  const { data: nft, isLoading: _isLoading } = useNFT(editionDrop, 0);
  const { data: totalSuply, isLoading: suplyLoading, error, refetch: refreshtokeSupply } = useTokenSupply(token);
  const [isClaiming, setIsClaiming] = useState(false);

  const [message, setMessage] = useState('');
  const [proposalAddress, setAddress] = useState("");
  const [inviteeAddress, setInviteeAddress] = useState("");
  const [proposalAmount, setAmount] = useState(1);
  const [amountValue, setAmountValue] = useState(1);
  const [depositValue, setDepositValue] = useState("1");
  const [maxValue, setMaxValue] = useState(0);
  const [membersBalances, setMembersBalances] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [proposalErrAlert, setProposalErrAlert] = useState("");
  const [emptyInputErr, setEmptyInputErr] = useState("");
  const [inviteeStatus, setInviteeStatus] = useState(0);
  const [_copyData, setCopyData] = useState(false);
  const [_copyContract, setCopyContract] = useState(false);
  const [_copyWalletAddress, setCopyWalletAddress] = useState(false);
  const [_copymembersAddress, setCopymembersAddress] = useState(new Set());
  const [executeLoad, setExecuteLoad] = useState(new Set());
  const [_copyGovernanceAddress, setCopyGovernanceAddress] = useState(false);
  const [proposedCount, setProposedCount] = useState(0);
  const [selectedValue, setSelectedValue] = useState("0");
  const [isDelegating, setIsDelegating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [creationWallet, setCreationWallet] = useState("");
  const [alertType, setAlertType] = useState("");
  const [alertKind, setAlertKind] = useState("");
  const [alertMSG, setAlertMSG] = useState("");
  const [alertInviteeType, setAlertInviteeType] = useState("");
  const [alertInviteeKind, setAlertInviteeKind] = useState("");
  const [alertInviteeMSG, setAlertInviteeMSG] = useState("");

  //refresh data usestates
  const [refreshProposals, setRefreshProposals] = useState(0);
  const [refreshProposedCount, setRefreshProposedCount] = useState(0);
  const [recheckNFTHolder, setRecheckNFTHolder] = useState(0);
  const [refreshBalance, setRefreshBalance] = useState(0);
  const [refreshMembers, setRefreshMembers] = useState(0);

  //isLoading useStates
  const [isLoadingProposal, setIsLoadingProposal] = useState(true);
  const [isHolderLoading, setIsHolderLoading] = useState(true);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [currentBalanceLoading, setCurrentBalanceLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [memberLoading, setMemberLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isDepositing, setIsDepositing] = useState(false);


  //Data useState
  const [daoDATA, setDaoDATA] = useState([]);
  const [invitee, setInvitee] = useState([]);
  const [proposalData, setProposalData] = useState([]);
  const [isHolder, setIsHolder] = useState(false);
  const [balance, setBalance] = useState([]);
  const [supplyBalance, setSupplyBalance] = useState([]);
  const [dataCreation, setDataCreation] = useState([]);
  const [membersData, setMembersData] = useState([]);
  const [profile, setProfile] = useState([]);
  const [ImREALConfig, setImREALConfig] = useState([]);
  const [socket, setSocket] = useState(null);

  //Modal Elements
  const openEls = document.querySelectorAll("[data-open]");
  const closeEls = document.querySelectorAll("[data-close]");
  const isVisible = "is-visible";

  const ImREALToken = useContract(ImREALConfig[0]?.ImREAL_token, "token").contract;

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
      if (daoDATA?.length !== 0) {
        const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
        const wallet = new ethers.Wallet(daoDATA[0]?.privatekey, provider);
        const _sdk = new ThirdwebSDK(wallet);
        return _sdk;
      }
    } catch (error) {
      toastEffect("error", "Code: 101947");
    }
  }

  ///DAO DATA----------------
  useEffect(() => {
    const getAllAddresses = async () => {
      try {
        await Axios.post(`${process.env.REACT_APP_API_HTTP}daoData`, {
          daoLink: daoLink
        }).then((response) => {
          setDaoDATA(response.data);
        });
        await Axios.post(`${process.env.REACT_APP_API_HTTP}get_config`, {
        }).then((response) => {
          setImREALConfig(response.data);
        });
      } catch (error) {
        toastEffect("error", "Code: 101948");
      }
    };
    getAllAddresses();
  }, [address]);

  //getAvatars & profiles----------------
  useEffect(() => {
    const getProfiles = async () => {
      try {
        if (daoDATA.length !== 0 && address !== undefined) {
          await Axios.post(`${process.env.REACT_APP_API_HTTP}getProfile`, {
            wallet: address,
            vote: DATOS[2]
          }).then((response) => {
            setProfileLoading(false);
            setProfile(response.data);
          });
        }
      } catch (error) {
        toastEffect("error", "Code: 101949");
      }
    };
    getProfiles();
  }, [daoDATA, address]);

  ///getMembers----------------
  useEffect(() => {
    const getMembers = async () => {
      try {
        if (daoDATA.length !== 0) {
          const _token = await getSDK().getContract(daoDATA[0]?.token, "token");
          const _editionDrop = await getSDK().getContract(daoDATA[0]?.editiondrop, "edition-drop");
          const memberAddresses = await _editionDrop.history.getAllClaimerAddresses(0);
          const amounts = await _token.history.getAllHolderBalances();
          await Axios.post(`${process.env.REACT_APP_API_HTTP}getAllProfile`, {
            vote: DATOS[2]
          }).then((response) => {
            function getmembers() {
              return memberAddresses?.reverse().map((address) => {
                const member = amounts?.find(({ holder }) => holder === address);
                const profile = response.data?.find(({ wallet }) => wallet === address);
                return {
                  address,
                  profile,
                  name: member?.balance.name,
                  tokenAmount: member?.balance.displayValue || "0",
                  symbol: member?.balance.symbol,
                };
              });
            }
            setMembersData(getmembers());
            setMemberLoading(false);
          });
        }
      } catch (error) {
        toastEffect("error", "Code: 101950");
      }
    };
    getMembers();
  }, [daoDATA, refreshMembers]);

  ///DAO Creation----------------
  useEffect(() => {
    const getCreation = async () => {
      try {
        if (daoDATA.length !== 0) {
          await Axios.post(`${process.env.REACT_APP_API_HTTP}get_creation_value`, {
            creationID: daoDATA[0]?.creation_id
          }).then((response) => {
            setDataCreation(response.data);
            setCreationWallet(response.data[0].sdk_wallet);
            setDataLoading(false);
          });
        }
      } catch (error) {
        toastEffect("error", "Code: 101951");
      }
    };
    getCreation();
  }, [daoDATA]);

  ///check Governance Balance----------------
  useEffect(() => {
    if (!isHolder) {
      setCurrentBalanceLoading(false);
      setBalanceLoading(false);
      return;
    }
    const checkBalances = async () => {
      try {
        if (daoDATA.length !== 0) {
          const _token = await getSDK().getContract(daoDATA[0]?.token, "token");
          const supply_balance = await _token.balanceOf(daoDATA[0]?.vote);
          setSupplyBalance(supply_balance);
          setBalanceLoading(false);
          if (address) {
            const token_balance = await _token.balanceOf(address);
            setBalance(token_balance);
            setCurrentBalanceLoading(false);
          }
        }
      } catch (error) {
        toastEffect("error", "Code: 101952");
      }
    };
    checkBalances();
  }, [daoDATA, address, refreshBalance, isHolder]);

  ///check NFT Holder----------------
  useEffect(() => {
    if (!address) {
      return;
    }
    const checkNFTHolder = async () => {
      try {
        if (daoDATA?.length !== 0) {
          const _editionDrop = await getSDK().getContract(daoDATA[0]?.editiondrop, "edition-drop");
          const balance = await _editionDrop.balanceOf(address, 0);
          if (balance.gt(0)) {
            setIsHolder(true);
            setIsHolderLoading(false);
            await Axios.post(`${process.env.REACT_APP_API_HTTP}claimer`, {
              wallet: address,
              owner: daoDATA[0]?.wallet,
              editionDrop: daoDATA[0]?.editiondrop,
              creationID: daoDATA[0]?.creation_id,
            });
          } else {
            setIsHolder(false);
            setIsHolderLoading(false);
          }
        }
      } catch (error) {
        toastEffect("error", "Code: 101953");
      }
    };
    checkNFTHolder();
  }, [daoDATA, address, recheckNFTHolder]);

  ///get Proposals----------------
  useEffect(() => {
    if (!isHolder) {
      setIsLoadingProposal(false);
      return;
    }
    const getProposals = async () => {
      try {
        if (daoDATA.length !== 0) {
          const _vote = await getSDK().getContract(daoDATA[0]?.vote, "vote");
          const proposals = await _vote.getAll();
          await Axios.post(`${process.env.REACT_APP_API_HTTP}all_view`, {
          }).then(async (response1) => {
            await Axios.post(`${process.env.REACT_APP_API_HTTP}all_vote`, {
            }).then(async (response2) => {
              await Axios.post(`${process.env.REACT_APP_API_HTTP}getAllProfile`, {
                vote: DATOS[2]
              }).then((response3) => {
                function getViews() {
                  return proposals?.reverse().map((proposal) => {
                    const views = response1.data?.map((viewID) => viewID.proposal_id === proposal.proposalId._hex.toLocaleString());
                    const votes = response2.data?.map((voteID) => voteID.proposal_id === proposal.proposalId._hex.toLocaleString());
                    const profile = response3.data?.find(({ wallet }) => wallet === proposal.proposer);

                    const countViews = views.filter((v) => v === true).length;
                    const countVotes = votes.filter((v) => v === true).length;

                    return {
                      proposal,
                      profile,
                      views: countViews,
                      votes: countVotes
                    };
                  });
                }
                setProposalData(getViews());
                setIsLoadingProposal(false);
              });
            });
          });
        }
      } catch (error) {
        toastEffect("error", "Code: 101954");
      }
    };
    getProposals();
  }, [daoDATA, refreshProposals, isHolder]);


  ///check Invitee----------------
  useEffect(() => {
    const getInvitee = async () => {
      try {
        await Axios.post(`${process.env.REACT_APP_API_HTTP}checkInvitee`, {
          wallet: address,
          editiondrop: DATOS[0]
        }).then((response) => {
          setInvitee(response.data.length);
        });
      } catch (err) {
        toastEffect("error", "Code: 101955");
      }
    };
    getInvitee();
  }, [address]);

  ///set Max Value----------------
  useEffect(() => {
    if (membersData?.length === 0) {
      return;
    }
    const getTotalValue = async () => {
      const getTotalValue = await membersData?.map(totalVal => totalVal.tokenAmount).reduce((a, b) => a + b);
      const splitValue = getTotalValue?.split(".").map(n => parseInt(n, 10));
      const finalValue = totalSuply?.displayValue - splitValue?.reduce((a, b) => a + b);
      const membersBalances = splitValue?.reduce((a, b) => a + b);
      setMaxValue(finalValue);
      setMembersBalances(membersBalances);
    };
    getTotalValue();
  }, [membersData]);


  ///set Proposed count----------------
  useEffect(() => {
    if (!address) {
      return;
    }
    const getProposedCount = () => {
      const proposedCount = proposalData.filter(count => count.proposal.proposer.includes(address));
      setProposedCount(proposedCount.length);
    };
    getProposedCount();
  }, [address, proposalData, refreshProposedCount]);

  //submitview
  const submitview = async (proposal_id) => {
    await Axios.post(`${process.env.REACT_APP_API_HTTP}view`, {
      pid: proposal_id,
      wallet: address,
      isMember: isHolder,
      isHolder: balance?.displayValue
    }).then(async () => {
      const hasVoted = await vote.hasVoted(proposal_id, address);
      if (hasVoted) {
        await Axios.post(`${process.env.REACT_APP_API_HTTP}hasVoted`, {
          pid: proposal_id,
          wallet: address,
          isMember: isHolder,
          isHolder: balance?.displayValue
        });
      }
    });
  };

  //Modal Elements
  for (const el of openEls) {
    el.addEventListener("click", function () {
      const modalId = this.dataset.open;
      if (modalId) {
        document.getElementById(modalId).classList.add(isVisible);
      }
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

  // function to shorten wallet addresses
  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  const getExecutionData = (str) => {
    const execKind = str.substring(0, 12);
    const execVal = str.substring(str.length - 19);
    if (execKind === "0x") {
      return "";
    } else if (execKind === "0xa9059cbb00") {
      return `Execution: Transfer ${Number(ConvertBignumber(`0x${execVal}`)).toLocaleString(undefined, { maximumFractionDigits: 2 })} Token(s)`;
    } else if (execKind === "0x449a52f800") {
      return `Execution: Mint ${Number(ConvertBignumber(`0x${execVal}`)).toLocaleString(undefined, { maximumFractionDigits: 2 })} Token(s)`;
    } else {
      return "Execution: Unknown Execution";
    }
  };

  // Convert Big Number
  const ConvertBignumber = (data) => {
    return ethers.utils.formatEther(data);
  };

  const handleMessageChange = event => {
    // 👇️ access textarea value
    setMessage(event.target.value);
  };

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.key === "Enter" && !e.shiftKey) {
      if (message.trim().length === 0) {
        setMessage('');
      } else {
        propose(e);
      }
    }
  };

  const handleAddress = event => {
    setAddress(event.target.value);
  };

  const handleInviteeAddress = event => {
    setInviteeAddress(event.target.value);
  };

  const handleAmount = event => {
    const value = Math.max(1, Math.min(maxValue, Number(event.target.value)));
    setAmountValue(value);
    setAmount(event.target.value);
  };

  const handleDepositAmount = e => {
    setDepositValue(e.target.value);
  };

  var btnCreate = (<><b> Create</b></>);
  var btnLoading = (<><i className="fas fa-spinner fa-spin"></i><b>{isDelegating ? " Delegating..." : " Proposing..."}</b></>);

  function mintEffect() {
    setIsError(true);
    document.getElementById("NFTclaim").style.color = "red";
    setIsClaiming(false);
  }

  const mintNft = async () => {
    setIsClaiming(true);
    const ImREAL_balance = await ImREAL.balanceOf(address);

    if (ImREAL_balance.displayValue < ImREALConfig[0]?.ImREAL_claimVal) {
      mintEffect();
      return;
    }
    if (invitee !== 1 && address != daoDATA[0]?.wallet) {
      return;
    }

    try {
      await editionDrop.claim("0", 1).then(async () => {
        await socket.emit("newMember", {
          kind: "joined",
          wallet: address,
          editionDrop: daoDATA[0]?.editiondrop,
          owner: daoDATA[0]?.wallet,
          daoName: daoDATA[0]?.dao_name,
          daoLink: window.location.href,
          daoIMG: daoDATA[0]?.dao_image
        });
        await Axios.post(`${process.env.REACT_APP_API_HTTP}claimers`, {
          wallet: address,
          editionDrop_address: editionDrop.getAddress(),
          creation_id: daoDATA[0]?.creation_id,
          owner: daoDATA[0]?.wallet
        }).then(async (response) => {
          setRecheckNFTHolder(oldVal => oldVal + 1);
          setRefreshBalance(oldVal => oldVal + 1);
          setRefreshMembers(oldVal => oldVal + 1);
        });
      });
    } catch (error) {
      toastEffect("error", "Code: 101956");
    }
  };

  const copyContract = async () => {
    setCopyContract(true);
    try {
      navigator.clipboard.writeText(DATOS[1]);
      setTimeout(() => setCopyContract(false), 2000);
    } catch (err) {
      toastEffect("error", "Code: 101957");
    }
  };

  const copyWalletAddress = async () => {
    setCopyWalletAddress(true);
    try {
      navigator.clipboard.writeText(address);
      setTimeout(() => setCopyWalletAddress(false), 2000);
    } catch (err) {
      toastEffect("error", "Code: 101958");
    }
  };

  const copyGovernanceAddress = async (governanceAddress) => {
    setCopyGovernanceAddress(true);
    try {
      navigator.clipboard.writeText(governanceAddress);
      setTimeout(() => setCopyGovernanceAddress(false), 2000);
    } catch (err) {
      toastEffect("error", "Code: 101959");
    }
  };

  const copyMembersAddress = async (membersAddress, selectedIdx) => {
    setCopymembersAddress((prev) => new Set([...prev, selectedIdx]));
    try {
      navigator.clipboard.writeText(membersAddress);
      setTimeout(() => setCopymembersAddress(new Set()), 2000);
    } catch (err) {
      toastEffect("error", "Code: 101960");
    }
  };

  const addToken = async (img, symbol) => {
    const imgsrc = 'http://' + window.location.host + '/uploads/' + img;
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: DATOS[1], // The address that the token is at.
            symbol: symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: decimals, // The number of decimals in the token
            image: imgsrc, // A string url of the token logo
          },
        },
      });
    } catch (err) {
      toastEffect("error", "Code: 101961");
    }
  };

  // Proposal Designs
  const ProposalStateLabel = {
    [ProposalState.Active]: 'Active',
    [ProposalState.Canceled]: 'Canceled',
    [ProposalState.Defeated]: 'Defeated',
    [ProposalState.Executed]: 'Executed',
    [ProposalState.Expired]: 'Expired',
    [ProposalState.Pending]: 'Pending',
    [ProposalState.Queued]: 'Queued',
    [ProposalState.Succeeded]: 'Succeeded',
  };

  const ProposalStateColor = {
    [ProposalState.Active]: 'prop_active',
    [ProposalState.Canceled]: 'prop_canceled',
    [ProposalState.Defeated]: 'prop_fail',
    [ProposalState.Executed]: 'prop_executed',
    [ProposalState.Expired]: 'prop_expired',
    [ProposalState.Pending]: 'prop_pending',
    [ProposalState.Queued]: 'prop_queued',
    [ProposalState.Succeeded]: 'prop_pass',
  };

  const Ranking = {
    [1]: 'price3.png',
    [2]: 'price4.png',
    [3]: 'price1.png',
    [4]: 'price2.png'
  };

  function checkRank(wallet, owner) {
    if (wallet === owner) {
      return 1;
    } else {
      return 2;
    }
  }

  function sweetAlertEffect(type, title, text) {
    Swal.fire({
      icon: type,
      title: title,
      text: text,
      width: '400px'
    });
  }

  const handleOption = event => {
    setSelectedValue(event.target.value);
  };

  //---------------------------------------------------------------Execution Function
  const execute = async (proposalId, selectedIdx) => {
    setExecuteLoad((prev) => new Set([...prev, selectedIdx]));
    try {
      await vote.execute(proposalId).then(() => {
        setRefreshProposals(oldVal => oldVal + 1);
        setRefreshBalance(oldVal => oldVal + 1);
        setRefreshMembers(oldVal => oldVal + 1);
        refreshtokeSupply();
      });
    } catch (err) {
      toastEffect("error", "Code: 101962");
    }
  };

  function inviteeEffect(kind, type, msg) {
    setAlertInviteeMSG(msg);
    setAlertInviteeKind(kind);
    setAlertInviteeType(type);
    setIsAdding(false);
    setTimeout(() => {
      setAlertInviteeType("info");
      setAlertInviteeKind("Note!");
      setAlertInviteeMSG("When adding a new member. make sure that the wallet address is valid.");
    }, 5000);
  }

  const addMember = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    if (!address) {
      return;
    }
    if (inviteeAddress === "") {
      inviteeEffect("Error!", "danger", "Address is required!");
      return;
    }
    if (inviteeAddress.trim().length !== 42) {
      inviteeEffect("Error!", "danger", "Invalid Address!");
      return;
    }
    if (!isHolder) {
      inviteeEffect("Error!", "danger", "Members are only allowed to invite.");
      return;
    }
    const chekIfValid = await checkIfValid(ImREALConfig[0]?.ImREAL_token, inviteeAddress.trim(), 1);
    if (!chekIfValid) {
      inviteeEffect("Error!", "danger", "Wallet address is invalid!");
      return;
    }
    const governance_token_balance = await token.balanceOf(address);
    if (parseInt(governance_token_balance.displayValue) < parseInt(dataCreation[0]?.token_threshhold)) {
      inviteeEffect("Error!", "danger", "Not enough Governance Token!");
      return;
    }
    const NFT_holder_check = await editionDrop.balanceOf(inviteeAddress, 0);
    if (NFT_holder_check.gt(0)) {
      inviteeEffect("Error!", "danger", "This address is already on the invited list.");
      return;
    }
    try {
      await Axios.post(`${process.env.REACT_APP_API_HTTP}addMember`, {
        inviteeAddress: inviteeAddress,
        inviter: address,
        owner: daoDATA[0]?.wallet,
        creationID: daoDATA[0]?.creation_id,
        editiondrop: DATOS[0]
      }).then(async (response) => {
        await socket.emit("inviteMember", {
          kind: "invite",
          inviteeAddress: inviteeAddress,
          inviter: address,
          daoName: daoDATA[0]?.dao_name,
          daoLink: window.location.href,
          daoIMG: daoDATA[0]?.dao_image
        });
        setInviteeAddress("");
        inviteeEffect("Success!", "success", "invitation sent successfully!");
      });

    } catch (error) {
      if (error.response.status === 500) {
        sweetAlertEffect("error", "There was a problem with the server");
        setIsAdding(false);
      } else {
        inviteeEffect(error.response.data.msg, "invitee", "red", 1);
        setIsAdding(false);
      }
    }
  };

  function proposalResponse(errorTxt, id, color) {
    setProposalErrAlert(errorTxt);
    document.getElementById(id).style.borderColor = color;
    setIsLoading(false);
    setTimeout(() => {
      setProposalErrAlert("");
      document.getElementById(id).style.borderColor = "";
    }, 5000);
  }

  function proposalFinalAction() {
    setIsLoading(false);
    setMessage("");
    setProposalErrAlert("");
    setAddress("");
    setAmountValue(1);
    document.getElementById("propose").style.borderColor = "";
    setRefreshProposedCount(oldVal => oldVal + 1);
    setRefreshProposals(oldVal => oldVal + 1);
  }

  async function checkIfValid(tokencontract, address, kind) {
    try {
      const _token = await getSDK().getContract(tokencontract, "token");
      await _token.balanceOf(address);
      return (true);
    } catch (err) {
      return (false);
    }
  }

  const propose = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    const description = message;

    if (!address) {
      return;
    }
    if (proposalAmount > maxValue) {
      proposalResponse("Invalid value", "propose", "red");
      return;
    }
    const minToAddress = document.getElementById("transfer").value;
    if (selectedValue === '2' && minToAddress !== address) {
      proposalResponse("Invalid wallet address", "propose", "red");
      return;
    }
    const mintValue = document.getElementById("mint").value;
    if (selectedValue === '2' && mintValue !== '100') {
      proposalResponse("Invalid value", "propose", "red");
      return;
    }
    if (description.trim().length === 0) {
      proposalResponse("Description box is empty!", "propose", "red");
      return;
    }
    const NFT_holder_check = await editionDrop.balanceOf(address, 0);
    if (!NFT_holder_check.gt(0)) {
      sweetAlertEffect('error', 'Membership Error', 'You dont own a membership NFT!');
      setIsLoading(false);
      return;
    }
    const governance_token_balance = await token.balanceOf(address);
    if (parseInt(governance_token_balance.displayValue) < parseInt(dataCreation[0]?.token_threshhold)) {
      sweetAlertEffect('error', 'Token Error', 'You dont have the required amount of Governance Token!');
      setIsLoading(false);
      return;
    }
    const delegation = await token.getDelegationOf(address);
    if (delegation === AddressZero) {
      setIsDelegating(true);
      await token.delegateTo(address).then(() => {
        setIsLoading(false);
        setIsDelegating(false);
        propose(e);
      });
      return;
    }
    if (selectedValue === '1') {
      if (proposalAddress.trim().length !== 42) {
        proposalResponse("Wallet address is empty or invalid!", "transfer", "red");
        return;
      }
      const chekIfValid = await checkIfValid(ImREALConfig[0]?.ImREAL_token, proposalAddress.trim(), 1);
      if (!chekIfValid) {
        proposalResponse("Wallet address is empty or invalid!", "transfer", "red");
        return;
      }
    }

    //Governance Execution Methods...............START
    const transferExecution = [
      {
        toAddress: token?.getAddress(),
        nativeTokenValue: 0,
        transactionData: token?.encoder.encode(
          "transfer", [
          proposalAddress === "" ? AddressZero : proposalAddress,
          //proposalAddress,
          ethers.utils.parseUnits(proposalAmount.toString(), 18),
        ]
        ),
      }
    ];
    const mintTokenExecution = [
      {
        toAddress: token?.getAddress(),
        nativeTokenValue: 0,
        transactionData: token?.encoder.encode(
          "mintTo", [
          address,
          ethers.utils.parseUnits(mintValue.toString(), 18),
        ]
        ),
      }
    ];
    //Governance Execution Methods...............END

    if (ImREALConfig[0]?.execVal_status && selectedValue !== "0") {
      //With payment function.
      await ImREALToken.transfer(ImREALConfig[0]?.ImREAL_wallet, ImREALConfig[0]?.ImREAL_execVal)
        .then((result) => {
          executeProposal();
        });
    } else {
      //No payment function.
      executeProposal();
    }
    async function executeProposal() {
      try {
        await vote.propose(
          description,
          selectedValue === '1' ? transferExecution
            : selectedValue === '2' ? mintTokenExecution : ""
        ).then(async (result) => {
          await socket.emit("proposed", {
            kind: "proposal",
            proposer: address,
            daoName: daoDATA[0]?.dao_name,
            daoLink: window.location.href,
            daoIMG: daoDATA[0]?.dao_image,
            editionDrop: daoDATA[0]?.editiondrop
          });
          proposalFinalAction();
          if (document.querySelector(".modal.is-visible")) {
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
          }
        });
      } catch (error) {
        toastEffect("error", "Code: 101963");
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
      setAlertMSG("when depositing your tokens back to the treasury be sure that you and the members have the exact amounts of the token required from the quorum.");
    }, 10000);
  }

  const handleDeposit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    var cleanAmount = depositValue.replace(/,/g, "");
    setIsDepositing(true);
    try {
      if (!address) {
        return;
      }
      if (parseInt(cleanAmount) === 0) {
        setIsDepositing(false);
        alertResponse("Error!", "danger", "This is not allowed!");
        return;
      }
      if (parseInt(cleanAmount) < 0) {
        alertResponse("Error!", "danger", "This is an error please contact the admin!");
        return;
      }
      const _token = await getSDK().getContract(daoDATA[0]?.token, "token");
      const token_balance = await _token.balanceOf(address);
      if (parseInt(cleanAmount) > parseInt(token_balance.displayValue)) {
        alertResponse("Error!", "danger", "This is an error please contact the admin!");
        return;
      }
      const checkIfAllowed = membersBalances - parseInt(cleanAmount);
      if (checkIfAllowed < currentQuorum().quorumCal) {
        setIsDepositing(false);
        alertResponse("Error!", "warning", "Not allowed because all member's balances including yours are less than the quorum. "/* + checkIfAllowed.toLocaleString() + " less than " + currentQuorum().quorumCal.toLocaleString()*/);
        return;
      }
      await token.transfer(daoDATA[0]?.vote, parseInt(cleanAmount)).then(() => {
        setRefreshBalance(oldVal => oldVal + 1);
        setRefreshMembers(oldVal => oldVal + 1);
        setDepositValue("1");
        setIsDepositing(false);
        alertResponse("Success!", "success", "Token(s) has been deposited successfully to the treasury!");
      });
    } catch (err) {
      toastEffect("error", "Code: 101964");
    }
  };

  function currentQuorum() {
    const quorumCal = (parseFloat(totalSuply?.displayValue) / 100) * parseFloat(dataCreation[0]?.vote_quorum);
    const quorumPercent = dataCreation[0]?.vote_quorum + "%";
    return {
      quorumCal,
      quorumPercent,
    };
  }

  return (
    <>
      <main>
        <div className="main-section">
          <div className="container">
            <div className="main-section-data">
              <div className="row">
                <div style={{ display: "flex", alignItems: "flex-start" }} className="col-lg-3 col-md-4 pd-left-none no-pd">
                  <StickyBox offsetTop={20} offsetBottom={20}>
                    <div className="main-left-sidebar no-margin">

                      {isLoadingProposal ? (
                        <div className="user-data full-width">
                          <div className="user-profile">
                            <LoadEffect />
                          </div>
                        </div>
                      ) : !address || !isHolder ? (
                        <ProfileGuest />
                      ) : (
                        <Profile
                          profile={profile}
                          address={address}
                          _copyWalletAddress={_copyWalletAddress}
                          proposedCount={proposedCount}
                          dataCreation={dataCreation}
                          balance={balance}
                          _copyContract={_copyContract}
                          DATOS={DATOS}
                          daoDATA={daoDATA}
                          copyWalletAddress={copyWalletAddress}
                          copyContract={copyContract}
                          addToken={addToken}
                        />
                      )}
                      {isHolder !== null && !isHolder && address && daoDATA[0]?.wallet !== address && invitee === 1 ? (
                        <Membership
                          nft={nft}
                          isHolderLoading={isHolderLoading}
                          _isLoading={_isLoading}
                          isClaiming={isClaiming}
                          isError={isError}
                          mintNft={mintNft}
                        />
                      ) : address && isHolderLoading || address && _isLoading ? (
                        <div className="widget widget-about">
                          <LoadEffect />
                        </div>
                      ) : daoDATA[0]?.wallet === address && !isHolder && !isHolderLoading && (
                        <Ownership
                          nft={nft}
                          isHolderLoading={isHolderLoading}
                          _isLoading={_isLoading}
                          isClaiming={isClaiming}
                          isError={isError}
                          mintNft={mintNft}
                        />
                      )}
                      <Footer />
                    </div>
                  </StickyBox>
                </div>
                <div className="col-lg-6 col-md-8 no-pd">
                  <div className="main-ws-sec">
                    {/*<div className="post-topbar">
                    <div className="company-title">
                    <h3 id="gio_alignment">
                    <Tooltip placement="top" title="Return back" arrow>
                    <b id="gio_left"><i className="fas fa-angle-double-left gio_default_property" ></i></b>
                    </Tooltip>
                    <b>Proposal Details</b>
                    <Tooltip placement="top" title="Reload" arrow>
                    <b className="dao-links"><i className="fas fa-sync gio_default_property" ></i></b>
                    </Tooltip>
                    </h3>
                    </div>
                    </div>*/}
                    {/*{!address ? (<></>) : balanceLoading || dataLoading || memberLoading || isHolderLoading && address ? (*/}
                    {!address ? (<></>) : address && !isHolder ? (<></>) : currentBalanceLoading || balanceLoading || dataLoading || memberLoading || isHolderLoading && address ? (
                      <div className="post-topbar">
                        <LoadEffect />
                      </div>
                    ) : address && isHolder && (
                      <Propose
                        dataCreation={dataCreation}
                        balance={balance}
                      />
                    )}

                    {!isLoadingProposal && isHolder && proposalData?.length === 0 && address ? (
                      <Loading />
                    ) : !isLoadingProposal && isHolder && address ? (
                      <Proposals
                        proposalData={proposalData}
                        totalSuply={totalSuply}
                        dataCreation={dataCreation}
                        decryptedData={decryptedData}
                        ProposalStateColor={ProposalStateColor}
                        ProposalStateLabel={ProposalStateLabel}
                        executeLoad={executeLoad}
                        ProgressBar={ProgressBar}
                        daoLink={daoLink}
                        execute={execute}
                        getExecutionData={getExecutionData}
                        submitview={submitview}
                      />
                    ) : !isLoadingProposal && !isHolder && address ? (
                      <Loading />
                    ) : !isLoadingProposal && !isHolder && !address ? (
                      <Loading />
                    ) : (
                      <div className="post-bar">
                        <div className="post-bar">
                          <LoadEffect />
                        </div>
                      </div>
                    )}

                    {/*{!isLoadingProposal && proposalData?.length === 0 && isHolder ? (
                      <div className="post-bar">
                        <div className="post-bar">
                          <LoadEffect />
                        </div>
                      </div>
                    ) : proposalData?.length === 0 || !isHolder ? (
                      <New isHolder={isHolder} />
                    ) : (
                      <Proposals
                        proposalData={proposalData}
                        totalSuply={totalSuply}
                        dataCreation={dataCreation}
                        decryptedData={decryptedData}
                        ProposalStateColor={ProposalStateColor}
                        ProposalStateLabel={ProposalStateLabel}
                        executeLoad={executeLoad}
                        ProgressBar={ProgressBar}
                        daoLink={daoLink}
                        execute={execute}
                        getExecutionData={getExecutionData}
                        submitview={submitview}
                      />
                    )}*/}

                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start" }} className="col-lg-3 pd-right-none no-pd">
                  <StickyBox offsetTop={20} offsetBottom={20}>
                    <div className="right-sidebar">

                      {dataLoading ? (
                        <div className="widget widget-about">
                          <LoadEffect />
                        </div>
                      ) : (
                        <DAORules
                          dataCreation={dataCreation}
                          creationWallet={creationWallet}
                          _copyGovernanceAddress={_copyGovernanceAddress}
                          daoDATA={daoDATA}
                          copyGovernanceAddress={copyGovernanceAddress}
                          shortenAddress={shortenAddress}
                        />
                      )}

                      {suplyLoading || balanceLoading ? (
                        <div className="widget filter-secs full-width">
                          <div className="filter-heading sd-title">
                            <LoadEffect />
                          </div>
                          <div className="paddy">
                            <div className="filter-dd">
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          {isHolder && (
                            <Governance
                              totalSuply={totalSuply}
                              supplyBalance={supplyBalance}
                              address={address}
                              balance={balance}
                            />
                          )}
                        </>
                      )}

                      {/*<Assets />*/}

                      {memberLoading ? (
                        <div className="widget widget-jobs">
                          <LoadEffect />
                        </div>
                      ) : membersData?.length === 0 ? (<></>) : (
                        <div className="widget suggestions full-width">
                          <div className="sd-title">
                            <h3>Members</h3>
                            <b>{membersData?.length}</b>
                          </div>
                          {isHolder && (
                            <Members
                              membersData={membersData}
                              Ranking={Ranking}
                              checkRank={checkRank}
                              daoDATA={daoDATA}
                              copyMembersAddress={copyMembersAddress}
                              shortenAddress={shortenAddress}
                              _copymembersAddress={_copymembersAddress}
                              totalSuply={totalSuply}
                              isHolder={isHolder}
                              balance={balance}
                              dataCreation={dataCreation}
                            />
                          )}
                        </div>
                      )}

                    </div>
                  </StickyBox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >

      <CreateProposal
        selectedValue={selectedValue}
        address={address}
        proposalAddress={proposalAddress}
        amountValue={amountValue}
        message={message}
        proposalErrAlert={proposalErrAlert}
        isLoading={isLoading}
        btnLoading={btnLoading}
        btnCreate={btnCreate}
        setMessage={setMessage}
        handleOption={handleOption}
        propose={propose}
        handleAddress={handleAddress}
        handleAmount={handleAmount}
        handleMessageChange={handleMessageChange}
        handleKeypress={handleKeypress}
      />

      <AddMember
        inviteeStatus={inviteeStatus}
        emptyInputErr={emptyInputErr}
        alertInviteeType={alertInviteeType}
        alertInviteeKind={alertInviteeKind}
        alertInviteeMSG={alertInviteeMSG}
        inviteeAddress={inviteeAddress}
        isAdding={isAdding}
        addMember={addMember}
        handleInviteeAddress={handleInviteeAddress}
      />

      <DepositToken
        alertType={alertType}
        alertKind={alertKind}
        alertMSG={alertMSG}
        totalSuply={totalSuply}
        balance={balance}
        depositValue={depositValue}
        isDepositing={isDepositing}
        handleDeposit={handleDeposit}
        currentQuorum={currentQuorum}
        NumericFormat={NumericFormat}
        handleDepositAmount={handleDepositAmount}
      />
    </>
  );
};
export default Home;
