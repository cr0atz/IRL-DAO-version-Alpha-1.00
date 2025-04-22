export const NFTCreateGuide = () => {
  return (
    <>
      <div className="sign_in_sec current" id="tab-1">
        <h3>NFT Creation</h3>
      </div>

      <p style={{ fontSize: '18px', fontFamily: "Trebuchet MS" }}>
        NFT means non-fungible tokens (NFTs), and NFTs are minted once they are created.
        After the process, the digital item becomes tamper-proof, more secure, and difficult to manipulate.
      </p>
      <div className="timelines">
        <div className="timeline education">
          <div className="timeline-items">
            <div className="timeline-item">
              <h3>NFT Name</h3>
              <div className="description">
                The NFT name.
              </div>
            </div>
            <div className="timeline-item">
              <h3>NFT Description</h3>
              <div className="description">
                The description of your NFT.
              </div>
            </div>
            <div className="timeline-item">
              <h3>NFT Logo</h3>
              <div className="description">
                The image design of your NFT and it is recommended.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NFTCreateGuide;