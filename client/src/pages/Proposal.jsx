import { useLocation } from "react-router";
import { ProposalState, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useAddress, useContract, } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import { AddressZero } from "@ethersproject/constants";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import toast from 'react-hot-toast';
import StickyBox from "react-sticky-box";
import Axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import io from "socket.io-client";
import LoadEffect from "../LoadEffect";
import { Tooltip } from "@mui/material";
import ProposalData from "../components/Proposal/Proposal";
import Comments from "../components/Proposal/Comments";
import CommentBox from "../components/Proposal/CommentBox";
import RightSide from "../components/Proposal/RightSide";
import Footer from "../components/Proposal/Footer";
var CryptoJS = require("crypto-js");

const Proposal = () => {

  moment.locale('en');

  const navigate = useNavigate();
  const address = useAddress();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const daoLink = params.get("link");
  const theDATA = params.get("data");

  const [DATOS, setDATOS] = useState([]);

  useEffect(() => {
    const getDATOS = () => {
      try {
        var bytes = CryptoJS.AES.decrypt(theDATA, process.env.REACT_APP_SECRET_KEY);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        const DATOS = decryptedData.split(",");
        setDATOS(DATOS);
      } catch (error) {
        window.location.href = "../err=notexist";
        process.exit?.(1);
      }
    };
    getDATOS();
  }, [theDATA]);

  const vote = useContract(DATOS[2], "vote").contract;
  const token = useContract(DATOS[1], "token").contract;
  const editionDrop = useContract(DATOS[0], "edition-drop").contract;

  const [socket, setSocket] = useState(null);

  const [isVoteLoading, setIsVoteLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [submitComment, setsubmitComment] = useState(false);
  const [emptyBoxErr, setEmptyBoxErr] = useState("");
  const [button_for, setbuttonfor] = useState("");
  const [button_against, setbuttonagainst] = useState("");
  const [button_abstain, setbuttonabstain] = useState("");
  const [the_votetype, setvoteType] = useState();

  //useState Data 
  const [daoDATA, setDaoDATA] = useState([]);
  const [proposalData, setProposalData] = useState([]);
  const [viewCount, setViewCount] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [VotesDetails, setVotesDetails] = useState([]);
  const [checkVote, setCheckVote] = useState([]);
  const [checkBalance, setCheckBalance] = useState([]);
  const [checkNFTHolder, setCheckNFTHolder] = useState(false);
  const [profile, setProfile] = useState([]);
  const [commenterProfile, setCommenterProfile] = useState([]);

  //useState isLoding
  const [proposalLoading, setProposalLoading] = useState(true);
  const [viewLoading, setViewLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [voteLoading, setVoteLoading] = useState(true);
  const [checkVoteLoading, setCheckVoteLoading] = useState(true);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [nftLoading, setNftLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [commenterProfileLoading, setCommenterProfileLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  //useState reFetch
  const [proposalRefresh, setProposalRefresh] = useState(0);
  const [refreshCount, setRefreshCount] = useState(0);
  const [refreshComments, setRefreshComments] = useState(0);
  const [refreshVoteCount, setRefreshVoteCount] = useState(0);
  const [refreshcheckVote, setRefreshcheckVote] = useState(0);
  const [refreshBalance, setRefreshBalance] = useState(0);
  const [refreshNftHolder, setRefreshNftHolder] = useState(0);
  const [countRefresh, setCountRefresh] = useState(0);

  var btnSubmit = (<><b>Post Comment</b></>);
  var btnSubmitting = (<><i className="fas fa-spinner fa-spin"></i><b> Submitting...</b></>);

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
      toastEffect("error", "Code: 101965");
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
      } catch (error) {
        toastEffect("error", "Code: 101966");
      }
    };
    getAllAddresses();
  }, [address]);

  //checkNFTHolder----------------
  useEffect(() => {
    if (!address) {
      return;
    }

    const checkNFTHolder = async () => {
      try {
        if (DATOS.length !== 0) {
          const editionDrop = await getSDK().getContract(DATOS[0], "edition-drop");
          const balance = await editionDrop.balanceOf(address, 0);
          if (balance.gt(0)) {
            setCheckNFTHolder(true);
          } else {
            setCheckNFTHolder(false);
          }
          setNftLoading(false);
        }
        setCountRefresh(oldCount => oldCount + 1);
      } catch (error) {
        toastEffect("error", "Code: 101967");
      }
    };
    checkNFTHolder();
  }, [daoDATA, refreshNftHolder]);

  //checkBalance----------------
  useEffect(() => {
    if (!address) {
      return;
    }

    const checkBalance = async () => {
      try {
        if (DATOS.length !== 0) {
          const token = await getSDK().getContract(DATOS[1], "token");
          const token_balance = await token.balanceOf(address);
          setCheckBalance(token_balance);
          setBalanceLoading(false);
          setCountRefresh(oldCount => oldCount + 1);
        }
      } catch (error) {
        toastEffect("error", "Code: 101968");
      }
    };
    checkBalance();
  }, [daoDATA, refreshBalance]);

  //checkIfVoted----------------
  useEffect(() => {
    if (!address) {
      return;
    }

    const checkIfVoted = async () => {
      try {
        if (DATOS.length !== 0) {
          const vote = await getSDK().getContract(DATOS[2], "vote");
          const hasVoted = await vote.hasVoted(DATOS[3], address);
          setCheckVote(hasVoted);
          setCheckVoteLoading(false);
          setCountRefresh(oldCount => oldCount + 1);
        }
      } catch (err) {
        toastEffect("error", "Code: 101969");
      }
    };
    checkIfVoted();
  }, [daoDATA, refreshcheckVote]);

  //getvotes----------------
  useEffect(() => {
    const countVotes = async () => {
      try {
        if (daoDATA.length !== 0) {
          const vote = await getSDK().getContract(DATOS[2], "vote");
          const getVotes = await vote.getProposalVotes(DATOS[3]);
          setVotesDetails(getVotes);
          setVoteLoading(false);
          setCountRefresh(oldCount => oldCount + 1);
        }
      } catch (err) {
        toastEffect("error", "Code: 101970");
      }
    };
    countVotes();
  }, [daoDATA, refreshVoteCount]);

  //getComments----------------
  useEffect(() => {

    const getComments = async () => {
      try {
        if (DATOS.length !== 0) {
          await Axios.post(`${process.env.REACT_APP_API_HTTP}getComments`, {
            pid: DATOS[3]
          }).then(async (response) => {
            await Axios.post(`${process.env.REACT_APP_API_HTTP}getAllProfile`, {
              vote: DATOS[2]
            }).then((response2) => {
              function combinedData() {
                return response.data?.map((comments) => {
                  const profile = response2.data?.find(({ wallet }) => wallet === comments.user_wallet_address);
                  return {
                    comments,
                    profile
                  };
                });
              }
              let comenters = Object.values(response.data.reduce((wallet, datetime) => {
                if (!wallet[datetime.user_wallet_address]) wallet[datetime.user_wallet_address] = {
                  wallet: datetime.user_wallet_address,
                  datetime: datetime.datetime
                };
                return wallet;
              }, {}));
              function newComenters() {
                return comenters?.map((comenters) => {
                  const profile = response2.data?.find(({ wallet }) => wallet === comenters.wallet);
                  return {
                    comenters,
                    profile
                  };
                });
              }
              setFilteredData(newComenters());
              setCommentList(combinedData());
              setCommentsLoading(false);
              setCountRefresh(oldCount => oldCount + 1);
            });
          });
        }
      } catch (error) {
        toastEffect("error", "Code: 101971");
      }
    };
    getComments();
  }, [daoDATA, refreshComments]);

  //getViewCount----------------
  useEffect(() => {

    const getViewCount = async () => {
      try {
        if (DATOS.length !== 0) {
          await Axios.post(`${process.env.REACT_APP_API_HTTP}count_view`, {
            proposalID: DATOS[3]
          }).then((response) => {
            setViewCount(response.data);
            setViewLoading(false);
            setCountRefresh(oldCount => oldCount + 1);
          });
        }
      } catch (error) {
        toastEffect("error", "Code: 101972");
      }
    };
    getViewCount();
  }, [daoDATA, refreshCount]);

  //getProposals----------------
  useEffect(() => {

    const getProposals = async () => {
      try {
        if (DATOS.length !== 0) {
          const vote = await getSDK().getContract(DATOS[2], "vote");
          const proposal = await vote.get(DATOS[3]);
          setProposalData(proposal);
          setProposalLoading(false);
          setCountRefresh(oldCount => oldCount + 1);
        }
      } catch (error) {
        toastEffect("error", "Code: 101973");
      }
    };
    getProposals();
  }, [daoDATA, proposalRefresh]);

  //Get proposer profile----------------
  useEffect(() => {
    const getAvatarsAndProfiles = async () => {
      try {
        if (proposalData.length !== 0) {
          await Axios.post(`${process.env.REACT_APP_API_HTTP}getProfile`, {
            wallet: proposalData?.proposer,
            vote: daoDATA[0]?.vote
          }).then((response) => {
            setProfile(response.data);
            setProfileLoading(false);
          });
          await Axios.post(`${process.env.REACT_APP_API_HTTP}getProfile`, {
            wallet: address,
            vote: DATOS[2]
          }).then((response) => {
            setCommenterProfile(response.data);
            setCommenterProfileLoading(false);
          });
        }
      } catch (error) {
        toastEffect("error", "Code: 101974");
      }
    };
    getAvatarsAndProfiles();
  }, [daoDATA, proposalData, address]);

  //Updating comment function..............
  const updateComment = async (id, comment) => {
    refetchData();
    if (!address) {
      return;
    }
    if (!checkNFTHolder) {
      return;
    }
    if (checkBalance?.displayValue === 0) {
      return;
    }
    Swal.fire({
      title: "Update Content",
      input: "textarea",
      inputValue: comment,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: "Update ",
      showLoaderOnConfirm: true,
      preConfirm: function (value) {
        return new Promise(async function (resolve, reject) {
          if (value === comment) {
            setTimeout(function () {
              sweetalert_effect('success', 'Updated successfully');
            }, 1000);
          } else if (value !== '' && value !== null) {
            await Axios.post(`${process.env.REACT_APP_API_HTTP}back`, {
              coment_id: id
            }).then(async () => {
              await Axios.post(`${process.env.REACT_APP_API_HTTP}update`, {
                coment_id: id,
                comment: value
              }).then(() => {
                refetchData();
                sweetalert_effect('success', 'Updated successfully');
              });
            });
          } else {
            setTimeout(function () {
              resolve();
            }, 1000);
          }
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        sweetalert_effect('error', "Error! Can't do that...");
      }
    });
  };

  //Deleting comment function..............
  const deleteComment = async (comment_id, wallet) => {
    refetchData();
    if (!address) {
      return;
    }
    if (!checkNFTHolder) {
      return;
    }
    if (checkBalance?.displayValue === 0) {
      return;
    }
    Swal.fire({
      title: 'Delete Content?',
      text: "You won't be able to revert this!",
      width: '300',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await Axios.delete(`${process.env.REACT_APP_API_HTTP}delete/${comment_id}`).then((res) => {
          refetchData();
        });
      }
    });
  };

  //Hex to Decimal
  const hexToDecimal = hex => parseInt(hex, 10);

  // Vote button is clicked
  const voteClicked = (vote_type) => {
    setvoteType(vote_type);
  };

  // address shortner
  const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  // address shortner
  const shortenAddressProposer = (str) => {
    return str.substring(0, 15,) + "..." + str.substring(str.length - 15);
  };

  // Convert Big Number
  const ConvertBignumber = (data) => {
    return ethers.utils.formatEther(data);
  };

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

  //Voting function..............
  const submitVote = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVoteLoading(true);
    const this_loading = "fas fa-sync fa-spin";
    const this_for = "la la-thumbs-up";
    const this_against = "la la-thumbs-down";
    const this_abstain = "la la-adn";
    if (the_votetype === 1) {
      setbuttonfor(this_loading);
      setbuttonagainst(this_against);
      setbuttonabstain(this_abstain);
    } else if (the_votetype === 2) {
      setbuttonfor(this_for);
      setbuttonagainst(this_against);
      setbuttonabstain(this_loading);
    } else if (the_votetype === 0) {
      setbuttonfor(this_for);
      setbuttonagainst(this_loading);
      setbuttonabstain(this_abstain);
    } else if (!address) {
      setIsVoteLoading(false);
      return;
    }
    const governance_token_balance = await token.balanceOf(address);
    const NFT_holder_check = await editionDrop.balanceOf(address, 0);
    const hasVoted = await vote.hasVoted(DATOS[3], address);
    const delegation = await token.getDelegationOf(address);
    try {
      if (proposalData?.state !== 1) {
        setIsVoteLoading(false);
        return;
      }
      if (delegation === AddressZero) {
        await token.delegateTo(address).then(() => {
          setIsVoteLoading(false);
        });
        return;
      }
      if (hasVoted) {
        setIsVoteLoading(false);
        return;
      }
      if (!NFT_holder_check.gt(0)) {
        setIsVoteLoading(false);
        return;
      }
      if (parseInt(governance_token_balance.displayValue) === 0) {
        setIsVoteLoading(false);
        return;
      }
      try {
        vote?.vote(DATOS[3], the_votetype)
          .then(async (res) => {
            await socket.emit("submitVote", {
              kind: "vote",
              voter: address,
              daoName: daoDATA[0]?.dao_name,
              daoLink: window.location.href,
              daoIMG: daoDATA[0]?.dao_image,
              editionDrop: daoDATA[0]?.editiondrop
            });
            await Axios.post(`${process.env.REACT_APP_API_HTTP}votes`, {
              pid: DATOS[3],
              wallet: address,
              isMember: NFT_holder_check.gt(0),
              isHolder: governance_token_balance.displayValue
            }).then(() => {
              refetchData();
            });
          });
      } catch (error) {
        toastEffect("error", "Code: 101975");
      }
    } catch (error) {
      setIsVoteLoading(false);
      console.error("failed to vote", error);
      process.exit(1);
    }
  };

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.key === "Enter" && !e.shiftKey) {
      if (comment.trim().length === 0) {
        setComment("");
      } else {
        postComment(e);
      }
    }
  };

  //Posting comment function..............
  const postComment = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setsubmitComment(true);
    if (!address) {
      setsubmitComment(false);
      return;
    } else if (!comment) {
      const error = "Comment box is empty!";
      setEmptyBoxErr(error);
      setsubmitComment(false);
      document.getElementById("comment_area").style.borderColor = "red";
    } else {
      const governance_token_balance = await token.balanceOf(address);
      const NFT_holder_check = await editionDrop.balanceOf(address, 0);
      try {
        if (!NFT_holder_check.gt(0)) {
          setsubmitComment(false);
          return;
        }
        if (parseInt(governance_token_balance.displayValue) === 0) {
          setsubmitComment(false);
          return;
        }
        await Axios.post(`${process.env.REACT_APP_API_HTTP}insert`, {
          pid: DATOS[3],
          comment: comment,
          wallet: address
        }).then(async () => {
          await socket.emit("commented", {
            kind: "comment",
            commenter: address,
            daoName: daoDATA[0]?.dao_name,
            daoLink: window.location.href,
            daoIMG: daoDATA[0]?.dao_image,
            editionDrop: daoDATA[0]?.editiondrop
          });
          refetchData();
          setsubmitComment(false);
          setComment("");
          setEmptyBoxErr("");
          document.getElementById("comment_area").style.borderColor = "";
          document.getElementById("comment_area").value = "";
        });
      } catch (err) {
        console.error("failed to post comment", err);
        process.exit(1);
      }
    }
  };

  function sweetalert_effect(type, message) {
    return (
      <>{Swal.fire({ toast: true, position: 'center', icon: type, text: message, showConfirmButton: false, timer: 1500, width: '300' })}</>
    );
  }

  const emptyFunction = async () => { };

  const refetchData = async () => {
    setProposalRefresh(oldID => oldID + 1);
    setRefreshCount(oldID => oldID + 1);
    setRefreshComments(oldID => oldID + 1);
    setRefreshVoteCount(oldID => oldID + 1);
    setRefreshcheckVote(oldID => oldID + 1);
    setRefreshBalance(oldID => oldID + 1);
    setRefreshNftHolder(oldID => oldID + 1);
    setCountRefresh(0);
    setRefreshing(true);
  };

  useEffect(() => {
    const checkIfDONE = () => {
      if (countRefresh === 7) {
        setRefreshing(false);
        setCountRefresh(0);
      }
    };
    checkIfDONE();
  }, [countRefresh]);

  return (
    <>
      <section className="forum-page">
        <div className="container">
          <div className="company-title">
            <h3 id="gio_alignment">
              <Tooltip placement="top" title="Return back" arrow>
                <b id="gio_left"><i className="fas fa-angle-double-left gio_default_property" onClick={() => navigate(-1)}></i></b>
              </Tooltip>
              <b>Proposal Details</b>
              <Tooltip placement="top" title="Reload" arrow>
                <b className="dao-links"><i className={refreshing ? "fas fa-sync fa-spin" : "fas fa-sync gio_default_property"} onClick={refreshing ? emptyFunction : refetchData}></i></b>
              </Tooltip>
            </h3>
          </div>
          <div className="forum-questions-sec">
            <div className="row">
              {address && balanceLoading || proposalLoading || commentsLoading ? (
                <div className="col-lg-8">
                  <div className="forum-post-view">
                    <div className="usr-question">
                      <LoadEffect />
                    </div>
                  </div>
                  <div className="post-comment-box"></div>
                </div>
              ) : (
                <div className="col-lg-8">
                  <div className="forum-post-view">
                    <div className="usr-question">
                      <span id="gio_display" className={ProposalStateColor[proposalData?.state]}>
                        <Tooltip placement="top" title="Current proposal state" arrow>
                          <a>{ProposalStateLabel[proposalData?.state]}</a>
                        </Tooltip>
                      </span>
                      <div className="usr_img">
                        <img style={{ backgroundColor: 'gainsboro', with: '60px', height: '60px' }} src={profile[0]?.avatar ? profile[0]?.avatar : "/uploads/unknown.PNG"} alt="" />
                      </div>
                      <div className="usr_quest">
                        <h3>{profile[0]?.name ? profile[0]?.name : shortenAddressProposer(proposalData?.proposer)}</h3>
                        <span><i className="fa fa-clock-o"></i>{hexToDecimal(proposalData?.endBlock)}</span>
                        <p style={{ whiteSpace: 'pre-wrap' }} id="gio_font">{proposalData?.description}</p>
                        <div className="comment-section">
                          <ProposalData
                            address={address}
                            checkVoteLoading={checkVoteLoading}
                            proposalLoading={proposalLoading}
                            checkVote={checkVote}
                            checkBalance={checkBalance}
                            proposalData={proposalData}
                            checkNFTHolder={checkNFTHolder}
                            isVoteLoading={isVoteLoading}
                            button_for={button_for}
                            button_against={button_against}
                            button_abstain={button_abstain}
                            submitVote={submitVote}
                            voteClicked={voteClicked}
                          />
                          <h3>{commentList?.length} {commentList.length > 1 ? "Comments" : "Comment"}</h3>
                          {!!address && checkNFTHolder && (
                            <Comments
                              address={address}
                              commentList={commentList}
                              moment={moment}
                              deleteComment={deleteComment}
                              updateComment={updateComment}
                              shortenAddress={shortenAddress}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {address && !isNaN(checkBalance?.displayValue) && parseInt(checkBalance?.displayValue) !== 0.0 ? (
                    <CommentBox
                      commenterProfile={commenterProfile}
                      comment={comment}
                      submitComment={submitComment}
                      btnSubmitting={btnSubmitting}
                      btnSubmit={btnSubmit}
                      emptyBoxErr={emptyBoxErr}
                      setComment={setComment}
                      postComment={postComment}
                      handleKeypress={handleKeypress}
                    />
                  ) : (<div className="post-comment-box"></div>)}
                </div>
              )}
              <RightSide
                StickyBox={StickyBox}
                voteLoading={voteLoading}
                VotesDetails={VotesDetails}
                viewCount={viewCount}
                commentsLoading={commentsLoading}
                filteredData={filteredData}
                commentList={commentList}
                moment={moment}
                shortenAddress={shortenAddress}
                ConvertBignumber={ConvertBignumber}
              />
            </div>
          </div>
        </div>
      </section>
      {/*<Footer />*/}
    </>
  );
};
export default Proposal;