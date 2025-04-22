import { ethers } from "ethers";
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
var CryptoJS = require("crypto-js");

const Proposals = ({
  proposalData,
  totalSuply,
  dataCreation,
  decryptedData,
  ProposalStateColor,
  ProposalStateLabel,
  executeLoad,
  ProgressBar,
  daoLink,
  execute,
  getExecutionData,
  submitview
}) => {

  // Convert Big Number
  const ConvertBignumber = (data) => {
    return ethers.utils.formatEther(data);
  };

  //Hex to Decimal
  const hexToDecimal = hex => parseInt(hex, 10);

  const shortenAddressProposer = (str) => {
    return str.substring(0, 9,) + "..." + str.substring(str.length - 7);
  };

  function reEncrypt(data) {
    return encodeURIComponent(
      CryptoJS.AES.encrypt(
        JSON.stringify(data),
        process.env.REACT_APP_SECRET_KEY
      ).toString()
    );
  }

  return (
    <div className="posts-section">
      {proposalData.map((proposal, idx) => {
        //const quorumCal = (parseFloat(dataCreation[0]?.token_amount) / 100) * parseFloat(dataCreation[0]?.vote_quorum);
        const quorumCal = (parseFloat(totalSuply?.displayValue) / 100) * parseFloat(dataCreation[0]?.vote_quorum);
        const aproveCount = Number(ConvertBignumber(proposal.proposal.votes[1].count));
        const percentCal = (parseInt(aproveCount) * 100) / quorumCal;
        const reEncryptData = reEncrypt(decryptedData + "," + proposal.proposal.proposalId._hex.toLocaleString());
        return (
          <div key={idx} className="post-bar">
            <div className="post_topbar">
              <div className="usy-dt">
                <img style={{ backgroundColor: 'gainsboro', width: '50px', height: '50px' }} src={proposal.profile?.avatar ? proposal.profile?.avatar : "/uploads/unknown.PNG"} alt="" />
                <div className="usy-name">
                  <h3>{proposal.profile?.name ? proposal.profile?.name : shortenAddressProposer(proposal.proposal.proposer)}</h3>
                  <span>
                    <img src="/assets/images/clock.png" alt="" />
                    {hexToDecimal(proposal.proposal.endBlock)}
                  </span>
                </div>
              </div>
              <div className="ed-opts">
                <ul className="job-dt">
                  <li className={ProposalStateColor[proposal.proposal.state]}>
                    <Tooltip placement="top" title="Current proposal state" arrow>
                      <a>{ProposalStateLabel[proposal.proposal.state]}</a>
                    </Tooltip>
                  </li>
                </ul>
              </div>
            </div>
            <div className="epi-sec">
              <ul className="descp">
                <li>
                  <img style={{ width: '17px', height: "100%" }} src="/assets/images/icon8.png" alt="" />
                  <span>{proposal.votes}</span>
                </li>
                <li>
                  <img style={{ width: '17px', height: "100%" }} src="/assets/images/icon9.png" alt="" />
                  <span>{proposal.views}</span>
                </li>
              </ul>
              <ul className="bk-execute">
                {proposal.proposal.state === 7 ? (<></>) : proposal.proposal.state === 4 && proposal.proposal.executions[0].transactionData !== "0x" ? (
                  <li>
                    <button onClick={() => { execute(proposal.proposal.proposalId._hex.toLocaleString(), idx); }} className="execute_button">
                      <i className={executeLoad.has(idx) ? "fas fa-sync fa-spin" : "fas fa-sync"}></i> {executeLoad.has(idx) ? "Executing..." : "Execute"}
                    </button>
                  </li>
                ) : (<></>)}
              </ul>
            </div>
            <div className="job_descp">
              <p style={{ whiteSpace: 'pre-wrap' }} id="gio_font">
                {proposal.proposal.description}
              </p>
              <p>
                <b
                  style={{ fontSize: '13px', /*color: '#1da1f2'*/ }}
                  className={getExecutionData(proposal.proposal.executions[0].transactionData) ? "data-display code-display" : ""}>
                  {getExecutionData(proposal.proposal.executions[0].transactionData)}
                </b>
              </p>
            </div>
            <div className="job-status-bar">
              {proposal.proposal.state === 1 ? <ProgressBar variant={Math.round(percentCal) <= 50 ? "danger" : Math.round(percentCal) <= 99 ? "info" : "success"} now={isNaN(percentCal) ? 0 : percentCal === Infinity ? 100 : percentCal} label={`${Number(ConvertBignumber(proposal.proposal.votes[1].count)).toLocaleString(undefined, { maximumFractionDigits: 2 })} / ${Number(quorumCal).toLocaleString(undefined, { maximumFractionDigits: 2 })} (${percentCal > 100 ? (100) : (isNaN(percentCal) ? (0) : Math.round(percentCal))}%) Quorum`} /> : <></>}
              <ul className="like-com">
                <li>
                  <a href="#">
                    <i className="la la-thumbs-up"></i>{Number(ConvertBignumber(proposal.proposal.votes[1].count)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    <i className="la la-thumbs-down"></i>{Number(ConvertBignumber(proposal.proposal.votes[0].count)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </a>
                </li>
                <li>
                  <a href="#" title="">
                    <i className="la la-adn"></i>{Number(ConvertBignumber(proposal.proposal.votes[2].count)).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </a>
                </li>
              </ul>
              <Link
                to={`/proposal?link=${daoLink}&data=${reEncryptData}`}
                onClick={() => { submitview(proposal.proposal.proposalId._hex.toLocaleString()); }}>View proposal</Link>
              <a>
              </a>
            </div>
          </div>

        );
      })}
    </div>
  );
};
export default Proposals;