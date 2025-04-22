import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import LoadEffect from "../../LoadEffect";

const Ownership = ({
  nft,
  isHolderLoading,
  _isLoading,
  isClaiming,
  isError,
  mintNft

}) => {
  return (
    <div className="widget widget-about">
      <div>
        {!isHolderLoading || !_isLoading ? (
          <>
            <ThirdwebNftMedia metadata={nft?.metadata} width="150" height="150" />
            <div>
              <h3>{nft?.metadata.name}</h3>
              <p style={{ marginLeft: '1px' }}>{nft?.metadata.description}</p>
            </div>
            <div className="sign_link">
              <button style={isClaiming ? {} : { cursor: 'pointer' }} id="NFTclaim" disabled={isClaiming} onClick={mintNft}>
                {isClaiming ? "Claiming..." : isError ? "Not enough REAL token!" : "Manage DAO for 1 REAL"}
              </button>
            </div>
          </>
        ) : (
          <LoadEffect />
        )}
      </div>
    </div>
  );
};

export default Ownership;