import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

//const editionDrop = sdk.getEditionDrop("0xc73F94442103a90b77B9708e4eA3f688c502EbA8");
const editionDrop = await sdk.getContract("0x60B0Cf1DE87E67402D16263935662de61CADa433", "edition-drop");

(async () => {
  try {
    // We define our claim conditions, this is an array of objects because
    // we can have multiple phases starting at different times if we want to
    const claimConditions = [{
      // When people are gonna be able to start claiming the NFTs (now)
      startTime: new Date(),
      // The maximum number of NFTs that can be claimed.
      maxQuantity: 50_000,
      // The price of our NFT (free)
      price: 1,
      //custome token contract address
      currencyAddress: "0x9D68821cFF8A9f44B43B59a3F6F8ed60459f25d2",
      // The amount of NFTs people can claim in one transaction.
      quantityLimitPerTransaction: 1,
      // We set the wait between transactions to MaxUint256, which means
      // people are only allowed to claim once.
      waitInSeconds: MaxUint256,
    }];

    await editionDrop.claimConditions.set("0", claimConditions);
    console.log("✅ Successfully set claim condition!");
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})();