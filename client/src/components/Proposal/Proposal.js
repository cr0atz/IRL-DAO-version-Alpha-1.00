const Proposal = ({
  address,
  checkVoteLoading,
  proposalLoading,
  checkVote,
  checkBalance,
  proposalData,
  checkNFTHolder,
  isVoteLoading,
  button_for,
  button_against,
  button_abstain,
  submitVote,
  voteClicked,
}) => {
  return (
    <form onSubmit={submitVote}>
      {(() => {
        if (!checkVoteLoading || !proposalLoading) {
          if (address && !checkVote && !isNaN(checkBalance?.displayValue) && proposalData.state === 1 && parseInt(checkBalance?.displayValue) !== 0.0 && checkNFTHolder) {
            if (isVoteLoading) {
              return (
                <ul className="gio-links">
                  <li>
                    <button
                      style={{ backgroundColor: 'gray' }}
                      className="vote_approve"
                      disabled>
                      <i className={button_for}></i> Approve
                    </button>
                  </li>
                  <li>
                    <button
                      style={{ backgroundColor: 'gray' }}
                      className="vote_against"
                      disabled>
                      <i className={button_against}></i> Against
                    </button>
                  </li>
                  <li>
                    <button
                      style={{ backgroundColor: 'gray' }}
                      className="vote_abstain"
                      disabled>
                      <i className={button_abstain}></i> Abstain
                    </button>
                  </li>
                </ul>
              );
            } else {
              return (
                <ul className="gio-links">
                  <li>
                    <button
                      style={{ cursor: 'pointer' }}
                      type="submit" onClick={() => voteClicked(1)}
                      className="vote_approve">
                      <i className="la la-thumbs-up"></i> Approve
                    </button>
                  </li>
                  <li>
                    <button
                      style={{ cursor: 'pointer' }}
                      type="submit"
                      onClick={() => voteClicked(0)}
                      className="vote_against">
                      <i className="la la-thumbs-down"></i> Against
                    </button>
                  </li>
                  <li>
                    <button
                      style={{ cursor: 'pointer' }}
                      type="submit" onClick={() => voteClicked(2)}
                      className="vote_abstain">
                      <i className="la la-times-circle-o"></i> Abstain
                    </button>
                  </li>
                </ul>
              );
            }
          }
        }
      })()}
    </form>
  );
};
export default Proposal;