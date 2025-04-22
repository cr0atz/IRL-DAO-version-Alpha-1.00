const Rules = ({
  address,
  selectedTab,
  dataCreation,
}) => {
  return (
    <div className={selectedTab === "rules" ? "tab-pane fade show active" : selectedTab?.length === 0 || selectedTab === null || !address ? "tab-pane fade show active" : "tab-pane fade"} id="nav-rules" role="tabpanel" aria-labelledby="nav-rules-tab">
      <div className="acc-setting">
        <h3>DAO Rules</h3>
        {dataCreation?.map((rules, idx) => {
          return (
            <div key={idx} className="profile-bx-details">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="profile-bx-info">
                    <div className="pro-bx">
                      <img style={{ height: '30px', with: "100%" }} src="/assets/images/pro-icon1.png" alt="" />
                      <div className="bx-info">
                        <h3 style={{ fontSize: '17px' }}><i className="fab fa-hive"></i> {rules.vote_delay}</h3>
                        <h5>Voting Delay</h5>
                      </div>
                    </div>
                    <p>Delay when can members start voting after the proposal is created.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="profile-bx-info">
                    <div className="pro-bx">
                      <img style={{ height: '30px', with: "100%" }} src="/assets/images/pro-icon2.png" alt="" />
                      <div className="bx-info">
                        <h3 style={{ fontSize: '17px' }}><i className="fab fa-hive"></i> {rules.vote_period}</h3>
                        <h5>Vote Period</h5>
                      </div>
                    </div>
                    <p>How long a proposal is available for voting before the proposal will be closed.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="profile-bx-info">
                    <div className="pro-bx">
                      <img style={{ height: '30px', with: "100%" }} src="/assets/images/pro-icon3.png" alt="" />
                      <div className="bx-info">
                        <h3 style={{ fontSize: '17px' }}><i className="fab fa-hive"></i> {rules.vote_quorum}%</h3>
                        <h5>Vote Quorum</h5>
                      </div>
                    </div>
                    <p>The minimum % of the total supply that need for the proposal to be valid.</p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="profile-bx-info">
                    <div className="pro-bx">
                      <img style={{ height: '30px', with: "100%" }} src="/assets/images/pro-icon4.png" alt="" />
                      <div className="bx-info">
                        <h3 style={{ fontSize: '17px' }}>🟡 {Number(rules.token_threshhold).toLocaleString(undefined, { maximumFractionDigits: 2 })}</h3>
                        <h5>Token Threshold</h5>
                      </div>
                    </div>
                    <p>The minimum amount of tokens a user needs to be allowed to create a proposal.</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="pro-work-status">
          <h4><p>Some of these requirements are specified in the number of blocks. 1 block is around 1-2 seconds.</p></h4>
        </div>
      </div>
    </div>
  );
};
export default Rules;