export const DeployVoteGuide = () => {
  return (
    <>
      <div className="sign_in_sec current" id="tab-1">
        <h3>Vote Contract Creation</h3>
      </div>

      <p style={{ fontSize: '18px', fontFamily: "Trebuchet MS" }}>
        The Vote contract is designed for groups such as DAOs to vote on proposals.
        <br></br><br></br>
        <b style={{ fontSize: '15px' }}>Uses of Vote contract:</b>
        <li style={{ fontSize: '13px' }}>Vote to decide on organizational changes</li>
        <li style={{ fontSize: '13px' }}>Vote on managing and distributing funds in a treasury</li>
      </p>

      <div className="timelines">
        <div className="timeline education">
          <h2 className="timeline-title">{/*Education*/}</h2>
          <div className="timeline-items">
            <div className="timeline-item">
              <h3>DAO Name</h3>
              {/*<time dateTime="2017/2019">2017 &ndash; 2019</time>*/}
              <div className="description">
                The DAO name.
              </div>
            </div>
            <div className="timeline-item">
              <h3>Voting Delay</h3>
              <div className="description">
                Delay when can members start voting after the proposal is created.
              </div>
            </div>
            <div className="timeline-item">
              <h3>Voting Period</h3>
              <div className="description">
                How long a proposal is available for voting before the proposal will be closed.
              </div>
            </div>
            <div className="timeline-item">
              <h3>Token Threshold</h3>
              <div className="description">
                The minimum amount of tokens a user needs to be allowed to create a proposal.
                Note that the "Token Threshold" should not be greater than the Token "Quorum".
              </div>
            </div>
            <div className="timeline-item">
              <h3>Voting Quorum</h3>
              <div className="description">
                The minimum % of the total supply that need for the proposal to be valid.
              </div>
            </div>
            <div className="timeline-item">
              <h3>Amount to be transferred</h3>
              <div className="description">
                The amount of token to be transfered into the treasury.
              </div>
            </div>
            <div className="timeline-item">
              <h3>DAO Logo</h3>
              <div className="description">
                The image design of your DAO Logo and it is recommended.
              </div>
            </div>
          </div>
        </div>
        <div>Some of these requirements are specified in the number of blocks. 1 block is around 1-2 seconds.</div>
      </div>
    </>
  );
};
export default DeployVoteGuide;