export const DeployTokenGuide = () => {
  return (
    <>
      <div className="sign_in_sec current" id="tab-1">
        <h3>Governance Token Creation</h3>
      </div>

      <p style={{ fontSize: '18px', fontFamily: "Trebuchet MS" }}>
        The "token" is suited for creating a digital currency.
        It can be purchased and traded between users on an exchange,
        utilized to buy and sell NFTs in a marketplace, etc.
      </p>
      <div className="timelines">
        <div className="timeline education">
          <h2 className="timeline-title">{/*Education*/}</h2>
          <div className="timeline-items">
            <div className="timeline-item">
              <h3>Token Name</h3>
              {/*<time dateTime="2017/2019">2017 &ndash; 2019</time>*/}
              <div className="description">
                The Token name. (max of 15 characters only).
              </div>
            </div>
            <div className="timeline-item">
              <h3>Token Symbol</h3>
              <div className="description">
                The symbol of your Token. (max of 5 characters only).
              </div>
            </div>
            <div className="timeline-item">
              <h3>Mint Amount</h3>
              <div className="description">
                How much amount you want to mint with your Token.
              </div>
            </div>
            <div className="timeline-item">
              <h3>Token Logo</h3>
              <div className="description">
                The image design of your Token and it is recommended.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeployTokenGuide;