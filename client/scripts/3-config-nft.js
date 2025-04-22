import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

//const editionDrop = sdk.getEditionDrop("0xc73F94442103a90b77B9708e4eA3f688c502EbA8");
const editionDrop = await sdk.getContract("0x60B0Cf1DE87E67402D16263935662de61CADa433", "edition-drop");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "TestEditionDop",
        description: "This nft will give you access to the DAO",
        image: readFileSync("scripts/assets/entranceTicket.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();