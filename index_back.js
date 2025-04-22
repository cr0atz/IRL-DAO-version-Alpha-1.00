const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const axios = require('axios');
const { ethers } = require('ethers');
const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { MaxUint256 } = require('@ethersproject/constants');
const path = require("path");
const https = require('https');
const dotenv = require('dotenv').config();
const { Server } = require("socket.io");

const options = {
  key: fs.readFileSync('certbotkey.pem'),
  cert: fs.readFileSync('certbotcert.pem')
};

const db = mysql.createPool({
  host: "103.72.77.246",
  port: 3306,
  user: "Gii0",
  password: "youknownothing",
  database: "dao_db_fortest"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/", router);

app.use(
  express.static(path.join(__dirname, "client/build"))
);

function rename(fileName) {
  const newName = toTimestamp(Date().toLocaleString());
  const arr = fileName.split(".");
  const extension = arr.pop();
  return newName + '.' + extension;
}

function daoLink() {
  var text = "";
  const dateNow = toTimestamp(Date().toLocaleString());
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + dateNow;

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function cheeckFile(fileName) {
  const arr = fileName.split(".");
  const extension = arr.pop();
  const img_ext = ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"];
  return img_ext.indexOf(extension) > -1;
}

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

//EditionDrop Deploy Execute---------------------------------------------------Start
app.post("/IMREAL/api/deployingEditiondrop", (req, res) => {
  const _wallet = req.body.wallet;
  const ImREALWallet = req.body.ImREALWallet;
  const dropName = req.body.dropName;
  const dropDesc = req.body.dropDesc;
  const dropIMG = req.body.dropIMG;
  const privateKey = req.body.privateKey;
  const RPCURL = req.body.RPCURL;
  const creationID = req.body.creationID;
  const DAOName = req.body.DAOName;
  const voteIMG = req.body.voteIMG;
  const DAOLink = daoLink();
  (async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPCURL);
      const wallet = new ethers.Wallet(privateKey, provider);
      const sdk = new ThirdwebSDK(wallet);

      const balance = await sdk.wallet.balance();

      if (balance.displayValue < 1) {
        return res.status(400).json({ msg: 'Deposit atleast 1 MATIC' });
      }

      const editionDropAddress = await sdk.deployer.deployEditionDrop({
        name: dropName,
        description: dropDesc,
        image: fs.readFileSync("/client/public/uploads/" + dropIMG),
        primary_sale_recipient: ImREALWallet,
      });

      const sql_insert = "INSERT INTO dao (wallet,privatekey,editiondrop,dao_name,dao_image,dao_link,link_created,creation_id,progress,datetime) VALUES (?,?,?,?,?,?,Now(),?,1,Now())";
      db.query(sql_insert, [_wallet, privateKey, editionDropAddress, DAOName, voteIMG, DAOLink, creationID], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });

    } catch (error) {
      return res.status(500).send(error),
        console.log("failed to create DAO", error);
    }
  })();
});
//EditionDrop Deploy Execute---------------------------------------------------END

//NFT Create Execute---------------------------------------------------Start
app.post("/IMREAL/api/creatingNFT", (req, res) => {
  const _wallet = req.body.wallet;
  const ImREALToken = req.body.ImREALToken;
  const ImREALClaimVal = req.body.ImREALClaimVal;
  const privateKey = req.body.privateKey;
  const RPCURL = req.body.RPCURL;
  const nftName = req.body.nftName;
  const nftDesc = req.body.nftDesc;
  const nftIMG = req.body.nftIMG;
  (async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPCURL);
      const wallet = new ethers.Wallet(privateKey, provider);
      const sdk = new ThirdwebSDK(wallet);

      const sql_select = "SELECT * FROM dao WHERE wallet =? AND privatekey =?";
      db.query(sql_select, [_wallet, privateKey], async (err, result) => {

        const editionDrop = await sdk.getContract(result[0].editiondrop, "edition-drop");

        await editionDrop.createBatch([
          {
            name: nftName,
            description: nftDesc,
            image: fs.readFileSync("/client/public/uploads/" + nftIMG),
          },
        ]);

        const claimConditions = [{
          startTime: new Date(),
          maxQuantity: 100_000,
          price: ImREALClaimVal,
          currencyAddress: ImREALToken,
          quantityLimitPerTransaction: 1,
          waitInSeconds: MaxUint256,
        }];
        await editionDrop.claimConditions.set("0", claimConditions);

        const sql_update = "UPDATE dao SET progress =2 WHERE wallet =? AND privatekey =?";
        db.query(sql_update, [_wallet, privateKey], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
        console.log(err);
      });

    } catch (error) {
      return res.status(500).send(error),
        console.log("failed to create DAO", error);
    }
  })();
});
//NFT Create Execute---------------------------------------------------END

//Token Deploy Execute---------------------------------------------------Start
app.post("/IMREAL/api/deployingToken", (req, res) => {
  const _wallet = req.body.wallet;
  const ImREALWallet = req.body.ImREALWallet;
  const privateKey = req.body.privateKey;
  const RPCURL = req.body.RPCURL;
  const tokenName = req.body.tokenName;
  const tokenSymbol = req.body.tokenSymbol;
  const tokenIMG = req.body.tokenIMG;
  (async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPCURL);
      const wallet = new ethers.Wallet(privateKey, provider);
      const sdk = new ThirdwebSDK(wallet);

      const tokenAddress = await sdk.deployer.deployToken({
        name: tokenName,
        symbol: tokenSymbol,
        image: fs.readFileSync("/client/public/uploads/" + tokenIMG),
        primary_sale_recipient: ImREALWallet,
      });

      const sql_update = "UPDATE dao SET progress =3, token =? WHERE wallet =? AND privatekey =?";
      db.query(sql_update, [tokenAddress, _wallet, privateKey], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });

    } catch (error) {
      return res.status(500).send(error),
        console.log("failed to create DAO", error);
    }
  })();
});
//Token Deploy Execute---------------------------------------------------END

//Token Mint Execute---------------------------------------------------Start
app.post("/IMREAL/api/mintingToken", (req, res) => {
  const _wallet = req.body.wallet;
  const mintAmount = req.body.mintAmount;
  const privateKey = req.body.privateKey;
  const RPCURL = req.body.RPCURL;
  const ImREALWallet = req.body.ImREALWallet;
  (async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPCURL);
      const wallet = new ethers.Wallet(privateKey, provider);
      const sdk = new ThirdwebSDK(wallet);
      //const _address = await sdk.getSigner().getAddress();

      const sql_select = "SELECT * FROM dao WHERE wallet =? AND privatekey =?";
      db.query(sql_select, [_wallet, privateKey], async (err, result) => {

        const token = await sdk.getContract(result[0].token, "token");
        const amount = mintAmount;
        await token.mintTo(ImREALWallet, amount);
        //const totalSupply = await token.totalSupply();

        const sql_update = "UPDATE dao SET progress =4 WHERE wallet =? AND privatekey =?";
        db.query(sql_update, [_wallet, privateKey], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
        console.log(err);
      });

    } catch (error) {
      return res.status(500).send(error),
        console.log("failed to create DAO", error);
    }
  })();
});
//Token Mint Execute---------------------------------------------------END

//Vote Deploy Execute---------------------------------------------------Start
app.post("/IMREAL/api/deployingVote", (req, res) => {
  const _wallet = req.body.wallet;
  const privateKey = req.body.privateKey;
  const RPCURL = req.body.RPCURL;
  const DAOName = req.body.DAOName;
  const voteIMG = req.body.voteIMG;
  const voteDelay = req.body.voteDelay;
  const votePeriod = req.body.votePeriod;
  const voteQuorum = req.body.voteQuorum;
  const tokenThreshhold = req.body.tokenThreshhold;
  (async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPCURL);
      const wallet = new ethers.Wallet(privateKey, provider);
      const sdk = new ThirdwebSDK(wallet);

      const sql_select = "SELECT * FROM dao WHERE wallet =? AND privatekey =?";
      db.query(sql_select, [_wallet, privateKey], async (err, result) => {

        const voteContractAddress = await sdk.deployer.deployVote({
          name: DAOName,
          image: fs.readFileSync("/client/public/uploads/" + voteIMG),
          voting_token_address: result[0].token,
          voting_delay_in_blocks: parseInt(voteDelay),
          voting_period_in_blocks: parseInt(votePeriod),
          voting_quorum_fraction: parseInt(voteQuorum),
          proposal_token_threshold: parseInt(tokenThreshhold),
        });

        const sql_update = "UPDATE dao SET vote =?, progress =5 WHERE wallet =? AND privatekey =?";
        db.query(sql_update, [voteContractAddress, _wallet, privateKey], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
        console.log(err);
      });

    } catch (error) {
      return res.status(500).send(error),
        console.log("failed to create DAO", error);
    }
  })();
});
//Vote Deploy Execute---------------------------------------------------END

//Setup DAO Execute---------------------------------------------------Start
app.post("/IMREAL/api/setupDAO", (req, res) => {
  const _wallet = req.body.wallet;
  const privateKey = req.body.privateKey;
  const RPCURL = req.body.RPCURL;
  //const tokenTransfer = req.body.tokenTransfer;
  const ImREALWallet = req.body.ImREALWallet;
  (async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPCURL);
      const wallet = new ethers.Wallet(privateKey, provider);
      const sdk = new ThirdwebSDK(wallet);
      const _address = await sdk.getSigner().getAddress();

      const sql_select = "SELECT * FROM dao WHERE wallet =? AND privatekey =?";
      db.query(sql_select, [_wallet, privateKey], async (err, result) => {

        const vote = await sdk.getContract(result[0].vote, "vote");
        const token = await sdk.getContract(result[0].token, "token");
        const editionDrop = await sdk.getContract(result[0].editiondrop, "edition-drop");

        const voteContract = vote.getAddress();

        //Make NFT none transferable
        await editionDrop.roles.setAll({ transfer: [] });

        //granting vote contract a permision to administrate
        await token.roles.grant("admin", voteContract);
        await token.roles.grant("minter", voteContract);
        await editionDrop.roles.grant("admin", voteContract);
        await editionDrop.roles.grant("minter", voteContract);
        await editionDrop.roles.grant("transfer", voteContract);

        //revoke all role for this creator
        await token.roles.revoke("admin", _address);
        await token.roles.revoke("minter", _address);
        await editionDrop.roles.revoke("admin", _address);
        await editionDrop.roles.revoke("minter", _address);

        //final action. transfer some of the minted coin to the vote contract
        //await token.transfer(voteContract, parseInt(tokenTransfer));

        const sql_update = "UPDATE dao SET progress =6, datetime =Now() WHERE wallet =? AND privatekey =?";
        db.query(sql_update, [_wallet, privateKey], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
        console.log(err);
      });

    } catch (error) {
      return res.status(500).send(error),
        console.log("failed to create DAO", error);
    }
  })();
});
//Setup DAO Execute---------------------------------------------------END

//Edition Drop Creation Function---------------------------------------------------START
app.post('/IMREAL/api/upload', (req, res) => {

  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  } else if (!cheeckFile(req.files.file.name)) {
    return res.status(400).json({ msg: 'Only jpeg,jpg & png are allowed' });
  } else if (req.files.file.size >= 5242880) {
    return res.status(400).json({ msg: 'File should be lower than 5MB' });
  } else if (req.body.privatekey === '') {
    return res.status(400).json({ msg: 'Private key is empty!' });
  } else if (Object.keys(req.body.privatekey).length !== 64) {
    return res.status(400).json({ msg: 'Private key is invalid!' });
  }
  const file = req.files.file;
  const wallet = req.body.wallet;
  const privatekey = req.body.privatekey;
  const dropname = req.body.dropname;
  const dropdesc = req.body.dropdesc;
  const sdk_wallet = req.body.sdk_wallet;
  const validation = req.body.validation;

  //if (validation === 'true') {
  file.mv(`${__dirname}/client/public/uploads/${rename(file.name)}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: rename(file.name), filePath: `/uploads/${rename(file.name)}` });
    const sql_insert = "INSERT INTO dao_creation (sdk_wallet,wallet,privatekey,drop_name,drop_description,drop_img,status,datetime) VALUES (?,?,?,?,?,?,0,Now());";
    db.query(sql_insert, [sdk_wallet, wallet, privatekey, dropname, dropdesc, rename(file.name)], (err, result) => {
      console.log(err);
    });
  });
  /*} else {
    return res.status(400).json({ msg: 'This is not possible!' + validation });
  }*/
});
//Edition Drop Creation Function---------------------------------------------------END

//NFT Creation Function---------------------------------------------------START
app.post('/IMREAL/api/NFT', (req, res) => {

  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  } else if (!cheeckFile(req.files.file.name)) {
    return res.status(400).json({ msg: 'Only jpeg,jpg & png are allowed' });
  } else if (req.files.file.size >= 5242880) {
    return res.status(400).json({ msg: 'File should be lower than 5MB' });
  }

  const file = req.files.file;
  const nftname = req.body.nftName;
  const nftdesc = req.body.nftDesc;
  const wallet = req.body.wallet;
  const validation = req.body.validation;

  file.mv(`${__dirname}/client/public/uploads/${rename(file.name)}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: rename(file.name), filePath: `/uploads/${rename(file.name)}` });
    const sql_update = "UPDATE dao_creation SET nft_name =?, nft_description=?, nft_img=? ,status=1 WHERE wallet =? AND status =0";
    db.query(sql_update, [nftname, nftdesc, rename(file.name), wallet], (err, result) => {
      console.log(err);
    });
  });
});
//NFT Creation Function---------------------------------------------------END

//Token Creation Function---------------------------------------------------START
app.post('/IMREAL/api/token', (req, res) => {

  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  } else if (!cheeckFile(req.files.file.name)) {
    return res.status(400).json({ msg: 'Only jpeg,jpg & png are allowed' });
  } else if (req.files.file.size >= 5242880) {
    return res.status(400).json({ msg: 'File should be lower than 5MB' });
  }

  const file = req.files.file;
  const tokenName = req.body.tokenName;
  const tokenSymbol = req.body.tokenSymbol;
  const wallet = req.body.wallet;
  const TokenAmount = req.body.TokenAmount;

  file.mv(`${__dirname}/client/public/uploads/${rename(file.name)}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: rename(file.name), filePath: `/uploads/${rename(file.name)}` });
    const sql_update = "UPDATE dao_creation SET token_name =?,token_symbol =?,token_img =?,token_amount =?,status =2 WHERE wallet =? AND status =1";
    db.query(sql_update, [tokenName, tokenSymbol, rename(file.name), TokenAmount, wallet], (err, result) => {
      console.log(err);
    });
  });
});
//Token Creation Function---------------------------------------------------END

//Vote Creation Function---------------------------------------------------START
app.post('/IMREAL/api/vote', (req, res) => {

  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  } else if (!cheeckFile(req.files.file.name)) {
    return res.status(400).json({ msg: 'Only jpeg,jpg & png are allowed' });
  } else if (req.files.file.size >= 5242880) {
    return res.status(400).json({ msg: 'File should be lower than 5MB' });
  }

  const file = req.files.file;
  const wallet = req.body.wallet;
  const voteName = req.body.voteName;
  const voteDelay = req.body.voteDelay;
  const votePeriod = req.body.votePeriod;
  const voteQuorum = req.body.voteQuorum;
  const tokenThreshhold = req.body.tokenThreshhold;
  const tokenTransfer = req.body.tokenTransfer;

  file.mv(`${__dirname}/client/public/uploads/${rename(file.name)}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: rename(file.name), filePath: `/uploads/${rename(file.name)}` });
    const sql_update = "UPDATE dao_creation SET vote_name =?,vote_img =?,vote_delay =?,vote_period =?,vote_quorum =?,token_threshhold =?,token_transfer =?,status =3 WHERE wallet =? AND status =2";
    db.query(sql_update, [voteName, rename(file.name), voteDelay, votePeriod, voteQuorum, tokenThreshhold, tokenTransfer, wallet], (err, result) => {
      console.log(err);
    });
  });
});
//Vote Creation Function---------------------------------------------------END

//DAO creation status---------------------------------------------------START
app.post("/IMREAL/api/get_status", (req, res) => {
  const wallet = req.body.wallet;
  const sql_get = "SELECT * FROM dao_creation WHERE wallet =? ORDER BY ID DESC LIMIT 1";
  db.query(sql_get, wallet, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//DAO creation status---------------------------------------------------END

//DAO creation Value---------------------------------------------------START
app.post("/IMREAL/api/get_creation", (req, res) => {
  const wallet = req.body.wallet;
  const sql_get = "SELECT * FROM dao_creation WHERE wallet =? ORDER BY ID DESC LIMIT 1";
  db.query(sql_get, wallet, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//DAO creation Value---------------------------------------------------END

//DAO creation by creation ID Value---------------------------------------------------START
app.post("/IMREAL/api/get_creation_value", (req, res) => {
  const creationID = req.body.creationID;
  const sql_get = "SELECT * FROM dao_creation WHERE id =?";
  db.query(sql_get, creationID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//DAO creation by creation ID Value---------------------------------------------------END

//ALL DAO creation Value---------------------------------------------------START
app.post("/IMREAL/api/get_all_creation", (req, res) => {
  const sql_get = "SELECT * FROM dao_creation";
  db.query(sql_get, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//All DAO creation Value---------------------------------------------------END

//GOOGLE Captcha status---------------------------------------------------START
app.post("/IMREAL/api/google_captcha", async (req, res) => {
  const token = req.body.token;
  const gio_res = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=6LcMdYkiAAAAAHLHPf6VXtcncW0J-zoyp1hvKLf-&response=${token}`);
  res.send(gio_res.data.success);
  //console.log(gio_res.data);
});
//GOOGLE Captcha status---------------------------------------------------END

app.post("/IMREAL/api/getComments", (req, res) => {
  const pid = req.body.pid;
  const sql_get = "SELECT * FROM comments WHERE status = 0 AND proposal_id =?";
  db.query(sql_get, pid, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/get_config", (req, res) => {
  const sql_get = "SELECT * FROM config";
  db.query(sql_get, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/get_dao", (req, res) => {
  const wallet = req.body.wallet;
  const sql_get = "SELECT *,1 AS owned FROM dao WHERE progress =6 AND wallet =?";
  db.query(sql_get, wallet, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/daoData", (req, res) => {
  const daoLink = req.body.daoLink;
  const sql_get = "SELECT * FROM dao WHERE dao_link =? AND progress =6";
  db.query(sql_get, daoLink, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/getAvatars", (req, res) => {
  const wallet = req.body.wallet;
  const vote = req.body.vote;
  //const sql_get = "SELECT * FROM avatars WHERE wallet ='ImREAL' OR wallet =? AND vote ='default' OR vote =?";
  const sql_get = "SELECT * FROM avatars WHERE wallet =? AND vote =?";
  db.query(sql_get, [wallet, vote], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/getProfile", (req, res) => {
  const wallet = req.body.wallet;
  const vote = req.body.vote;
  const sql_get = "SELECT * FROM profiles WHERE wallet =? AND vote =?";
  db.query(sql_get, [wallet, vote], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/getAllProfile", (req, res) => {
  const vote = req.body.vote;
  const sql_get = "SELECT * FROM profiles WHERE vote =?";
  db.query(sql_get, vote, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/setAvatar", (req, res) => {
  const wallet = req.body.wallet;
  const vote = req.body.vote;
  const img = req.body.img;

  try {
    const sql_select = "SELECT * FROM profiles WHERE wallet =? AND vote =?";
    const sql_insert = "INSERT INTO profiles (wallet,vote,avatar,avatar_change_log) VALUES (?,?,?,DATE_ADD(Now(), INTERVAL 1 DAY))";
    const sql_update = "UPDATE profiles SET avatar =?, avatar_change_log =DATE_ADD(Now(), INTERVAL 1 DAY) WHERE wallet =? AND vote =?";

    db.query(sql_select, [wallet, vote], async (err, result) => {
      if (!result[0]) {
        db.query(sql_insert, [wallet, vote, img], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      } else {
        if (result[0]?.avatar_change_log === null) {
          db.query(sql_update, [img, wallet, vote], (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          });
        } else {
          const dateDB = toTimestamp(result[0]?.avatar_change_log.toLocaleString());
          const dateNow = toTimestamp(Date().toLocaleString());
          if (dateDB > dateNow) {
            return res.status(400).json({ msg: 'sorry can only change once a day.' });
          } else {
            db.query(sql_update, [img, wallet, vote], (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send(result);
              }
            });
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).send(error),
      console.log("failed to insert avatar.", error);
  }
});

app.post("/IMREAL/api/setName", (req, res) => {
  const wallet = req.body.wallet;
  const name = req.body.name;
  const vote = req.body.vote;

  try {
    const sql_select = "SELECT * FROM profiles WHERE wallet =? AND vote =?";
    const sql_insert = "INSERT INTO profiles (wallet,vote,name,name_change_log) VALUES (?,?,?,DATE_ADD(Now(), INTERVAL 1 DAY))";
    const sql_update = "UPDATE profiles SET name =?, name_change_log =DATE_ADD(Now(), INTERVAL 1 DAY) WHERE wallet =? AND vote =?";

    db.query(sql_select, [wallet, vote], async (err, result) => {
      if (!result[0]) {
        db.query(sql_insert, [wallet, vote, name], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      } else {
        if (result[0]?.name_change_log === null) {
          db.query(sql_update, [name, wallet, vote], (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          });
        } else {
          const dateDB = toTimestamp(result[0]?.name_change_log.toLocaleString());
          const dateNow = toTimestamp(Date().toLocaleString());
          if (dateDB > dateNow) {
            return res.status(400).json({ msg: 'sorry can only change once a day.' });
          } else {
            db.query(sql_update, [name, wallet, vote], (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send(result);
              }
            });
          }
        }
      }
    });
  } catch (error) {
    return res.status(500).send(error),
      console.log("failed to insert avatar.", error);
  }
});

app.post("/IMREAL/api/sendRequest", (req, res) => {
  const requester = req.body.requester;
  const daoID = req.body.daoID;
  const creationID = req.body.creationID;
  const email = req.body.email;
  const message = req.body.message;

  const mysql_select = "SELECT * FROM request WHERE request_wallet =? AND request_dao_id =? AND request_creation_id =? ORDER BY id DESC LIMIT 1";
  const mysql_insert = "INSERT INTO request (request_wallet,request_dao_id,request_creation_id,request_email,request_message,request_status,request_expiration,request_created) VALUES (?,?,?,?,?,0,DATE_ADD(Now(), INTERVAL 1 DAY),Now())";
  db.query(mysql_select, [requester, daoID, creationID], (err, result) => {
    if (!result[0]) {
      db.query(mysql_insert, [requester, daoID, creationID, email, message], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    } else {
      const dateDB = toTimestamp(result[0]?.request_expiration.toLocaleString());
      const dateNow = toTimestamp(Date().toLocaleString());
      if (dateDB > dateNow) {
        return res.status(400).json({ msg: 'sorry can only send request once a day.' });
      } else {
        db.query(mysql_insert, [requester, daoID, creationID, email, message], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      }
    }
  });
});

app.post("/IMREAL/api/addAvatar", (req, res) => {
  const wallet = req.body.wallet;
  const vote = req.body.vote;
  const image = req.body.image;
  const id = req.body.id;
  const name = req.body.name;
  const uri = req.body.uri;
  const description = req.body.description;
  const contract = req.body.contract;
  console.log("DATA ", contract);

  if (!contract) {
    return res.status(400).json({ msg: 'Not allowed reload page first.' });
  }

  try {
    const sql_select = "SELECT * FROM avatars WHERE wallet =? AND contract =? AND vote =? AND nft_id =?";
    const sql_insert = "INSERT INTO avatars (wallet,contract,vote,nft_id,nft_name,avatar,nft_uri,nft_description,datetime) VALUES (?,?,?,?,?,?,?,?,Now())";

    db.query(sql_select, [wallet, contract, vote, id], async (err, result) => {
      if (!result[0]) {
        db.query(sql_insert, [wallet, contract, vote, id, name, image, uri, description], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      } else {
        return res.status(400).json({ msg: 'This NFT is already in your AVATAR list.' });
      }
    });
  } catch (error) {
    return res.status(500).send(error),
      console.log("failed to insert avatar.", error);
  }
});

app.post("/IMREAL/api/joined", (req, res) => {
  const wallet = req.body.wallet;
  const sql_get = "SELECT * FROM claimers WHERE wallet != owner AND wallet =? AND status =1";
  db.query(sql_get, wallet, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/members", (req, res) => {
  const sql_get = "SELECT * FROM members";
  db.query(sql_get, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/DAOs", (req, res) => {
  const daoLink = req.body.daoLink;
  const sql_get = "SELECT * FROM dao WHERE progress =6 AND dao_link =?";
  db.query(sql_get, daoLink, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/get_real_daos", (req, res) => {
  const sql_get = "SELECT * FROM dao WHERE progress =6";
  db.query(sql_get, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/get_deactivated_dao", (req, res) => {
  const sql_get = "SELECT * FROM dao_deactivated WHERE progress =6";
  db.query(sql_get, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/get_deactivated_daos", (req, res) => {
  const sql_get = "SELECT * FROM dao_deactivated WHERE progress =6";
  db.query(sql_get, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/checkAdmin", (req, res) => {
  const sql_get = "SELECT * FROM admin WHERE isActive =1";
  db.query(sql_get, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/getAdminAccounts", (req, res) => {
  const sql_get = "SELECT * FROM admin ORDER BY id DESC";
  db.query(sql_get, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/getRequests", (req, res) => {
  const sql_get = "SELECT * FROM request ORDER BY request_status,id DESC";
  db.query(sql_get, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/getDAO", (req, res) => {
  const wallet = req.body.wallet;
  const privateKey = req.body.privateKey;
  const sql_get = "SELECT * FROM dao WHERE wallet =? AND privatekey =?";
  db.query(sql_get, [wallet, privateKey], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/get_created_dao", (req, res) => {
  const createdID = req.body.createdID;
  const sql_get = "SELECT * FROM dao WHERE creation_id =?";
  db.query(sql_get, createdID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/IMREAL/api/delete/:comment", (req, res) => {
  const comment = req.params.comment;
  const sql_update = "UPDATE comments SET status =1 WHERE id =?";
  db.query(sql_update, comment, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/IMREAL/api/removeAdmin/:account", (req, res) => {
  const adminID = req.params.account;
  const sql_update = "DELETE FROM admin WHERE id =?";
  db.query(sql_update, adminID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/cancel_creation", (req, res) => {
  const creationID = req.body.creationID;
  const sql_update = "UPDATE dao_creation SET status =5 WHERE id =?";
  db.query(sql_update, creationID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/update_link", (req, res) => {
  const newLink = req.body.newLink;
  const daoID = req.body.daoID;
  const sql_update = "UPDATE dao SET dao_link =?, link_created =DATE_ADD(Now(), INTERVAL 7 DAY) WHERE id =?";
  db.query(sql_update, [newLink, daoID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(newLink);
    }
  });
});

app.post("/IMREAL/api/done_creation", (req, res) => {
  const creationID = req.body.creationID;
  const sql_update = "UPDATE dao_creation SET status =4 WHERE id =?";
  db.query(sql_update, creationID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/count_view", (req, res) => {
  const proposalID = req.body.proposalID;
  const sql_get = "SELECT count(*) as view_count FROM views WHERE proposal_id =?";
  db.query(sql_get, proposalID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/all_view", (req, res) => {
  const sql_get = "SELECT * FROM views";
  db.query(sql_get, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/all_vote", (req, res) => {
  const sql_get = "SELECT * FROM votes";
  db.query(sql_get, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/back", (req, res) => {
  const id = req.body.coment_id;
  const mysql_query = "INSERT INTO comments_updated SELECT * FROM comments WHERE id=?";
  db.query(mysql_query, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/claimers", (req, res) => {
  const wallet = req.body.wallet;
  const editionDrop_address = req.body.editionDrop_address;
  const creation_id = req.body.creation_id;
  const owner = req.body.owner;

  const mysql_insert = "INSERT INTO claimers (wallet,owner,editionDrop_address,daoCreation_id,status,datetime) VALUES (?,?,?,?,1,Now())";
  const mysql_update = "UPDATE claimers SET status =1 WHERE wallet =? AND editionDrop_address =?";

  if (wallet === owner) {
    db.query(mysql_insert, [wallet, owner, editionDrop_address, creation_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    db.query(mysql_update, [wallet, editionDrop_address], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }
});

/*app.post("/IMREAL/api/member_add", (req, res) => {
    const daoID = req.body.daoID;
    const mysql_update = "UPDATE dao SET members = members+1 WHERE id =?";
    db.query(mysql_update, daoID, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
    });
});*/

app.post("/IMREAL/api/get_claimers", (req, res) => {
  const creationID = req.body.creationID;
  const sql_get = "SELECT * FROM claimers WHERE daoCreation_id =? AND status =1";
  db.query(sql_get, creationID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/update", (req, res) => {
  const id = req.body.coment_id;
  const comment = req.body.comment;
  const mysql_query = "UPDATE comments SET comment =?,isEdited =1,datetime_edited = Now() WHERE status =0 AND id =?";
  db.query(mysql_query, [comment, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/insert", (req, res) => {
  const pid = req.body.pid;
  const comment = req.body.comment;
  const wallet = req.body.wallet;
  const sql_insert = "INSERT INTO comments (proposal_id,comment,user_wallet_address,status,isEdited,datetime) VALUES (?,?,?,0,0,Now());";
  db.query(sql_insert, [pid, comment, wallet], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });

});

app.post("/IMREAL/api/view", (req, res) => {
  const pid = req.body.pid;
  const wallet = req.body.wallet;
  const isMember = req.body.isMember;
  const isHolder = req.body.isHolder;
  const sql_insert = "INSERT INTO views (proposal_id,wallet_address,view,isMember,isHolder,datetime) VALUES (?,?,?,?,?,Now());";
  db.query(sql_insert, [pid, wallet, 1, isMember, isHolder], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });

});

app.post("/IMREAL/api/votes", (req, res) => {
  const pid = req.body.pid;
  const wallet = req.body.wallet;
  const isMember = req.body.isMember;
  const isHolder = req.body.isHolder;
  const sql_insert = "INSERT INTO votes (proposal_id,wallet_address,vote,isMember,isHolder,datetime) VALUES (?,?,?,?,?,Now());";
  db.query(sql_insert, [pid, wallet, 1, isMember, isHolder], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });

});

app.post("/IMREAL/api/hasVoted", (req, res) => {
  const pid = req.body.pid;
  const wallet = req.body.wallet;
  const isMember = req.body.isMember;
  const isHolder = req.body.isHolder;

  const sql_insert = "INSERT INTO votes (proposal_id,wallet_address,vote,isMember,isHolder,datetime) VALUES (?,?,?,?,?,Now());";
  const sql_select = "SELECT * FROM votes WHERE proposal_id =? AND wallet_address =?";

  db.query(sql_select, [pid, wallet], async (err, result) => {
    if (!result[0]) {
      db.query(sql_insert, [pid, wallet, 1, isMember, isHolder], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    }
  });


});

app.post("/IMREAL/api/claimer", async (req, res) => {
  const wallet = req.body.wallet;
  const owner = req.body.owner;
  const editionDrop = req.body.editionDrop;
  const creationID = req.body.creationID;

  const sql_insert = "INSERT INTO claimers (wallet,owner,editionDrop_address,daoCreation_id,status,datetime) VALUES (?,?,?,?,1,Now())";
  const sql_select = "SELECT * FROM claimers WHERE wallet =? AND owner =? AND editionDrop_address =? AND daoCreation_id =?";
  const sql_update = "UPDATE claimers SET status = 1 WHERE wallet =? AND owner =? AND editionDrop_address =? AND daoCreation_id =? AND status = 0";
  const sql_checkStatus = "SELECT * FROM claimers WHERE wallet =? AND owner =? AND editionDrop_address =? AND daoCreation_id =? AND status = 0";

  db.query(sql_select, [wallet, owner, editionDrop, creationID], async (err, result) => {
    if (!result[0]) {
      db.query(sql_insert, [wallet, owner, editionDrop, creationID], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    } else {
      db.query(sql_checkStatus, [wallet, owner, editionDrop, creationID], async (err, result) => {
        if (result[0]) {
          db.query(sql_update, [wallet, owner, editionDrop, creationID], (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          });
        }
      });
    }
  });

});

app.post("/IMREAL/api/addMember", (req, res) => {
  const inviteeAddress = req.body.inviteeAddress;
  const inviter = req.body.inviter;
  const owner = req.body.owner;
  const creationID = req.body.creationID;
  const editiondrop = req.body.editiondrop;
  try {
    const sql_insert = "INSERT INTO claimers (wallet,inviter,owner,editionDrop_address,daoCreation_id,status,datetime) VALUES (?,?,?,?,?,0,Now());";
    const sql_select = "SELECT * FROM claimers WHERE wallet =? AND inviter =? AND owner =? AND editionDrop_address =? AND daoCreation_id =?";
    db.query(sql_select, [inviteeAddress, inviter, owner, editiondrop, creationID], async (err, result) => {

      if (result[0]) {
        return res.status(400).json({ msg: 'This address is already on the invited list.' });
      }
      if (owner === inviteeAddress) {
        return res.status(400).json({ msg: 'This address is already on the invited list.' });
      }

      db.query(sql_insert, [inviteeAddress, inviter, owner, editiondrop, creationID], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });
  } catch (error) {
    return res.status(500).send(error),
      console.log("failed to insert invitee.", error);
  }

});

app.post("/IMREAL/api/checkInvitee", (req, res) => {
  const editiondrop = req.body.editiondrop;
  const wallet = req.body.wallet;
  const sql_get = "SELECT * FROM claimers WHERE wallet =? AND editionDrop_address =? AND status =0";
  db.query(sql_get, [wallet, editiondrop], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/transferDAO", (req, res) => {
  const newOwner = req.body.newOwner;
  const daoID = req.body.daoID;
  const creationID = req.body.creationID;
  const mysql_updateDAO = "UPDATE dao SET wallet =? WHERE id =?";
  const mysql_updateCreation = "UPDATE dao_creation SET wallet =? WHERE id =?";
  db.query(mysql_updateDAO, [newOwner, daoID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(mysql_updateCreation, [newOwner, creationID], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    }
  });
});

app.post("/IMREAL/api/deactivate", (req, res) => {
  const daoID = req.body.daoID;
  const creationID = req.body.creationID;
  const mysql_DAOInsert = "INSERT INTO dao_deactivated SELECT * FROM dao WHERE id =?";
  const mysql_DAODelete = "DELETE FROM dao WHERE id =?";
  const mysql_creationInsert = "INSERT INTO dao_creation_deactivated SELECT * FROM dao_creation WHERE id =?";
  const mysql_creationDelete = "DELETE FROM dao_creation WHERE id =?";
  db.query(mysql_DAOInsert, daoID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(mysql_creationInsert, creationID, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          db.query(mysql_DAODelete, daoID, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              db.query(mysql_creationDelete, creationID, (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send(result);
                }
              });
            }
          });
        }
      });
    }
  });
});

app.post("/IMREAL/api/restore", (req, res) => {
  const daoID = req.body.daoID;
  const creationID = req.body.creationID;
  const mysql_DAOInsert = "INSERT INTO dao SELECT * FROM dao_deactivated WHERE id =?";
  const mysql_DAODelete = "DELETE FROM dao_deactivated WHERE id =?";
  const mysql_creationInsert = "INSERT INTO dao_creation SELECT * FROM dao_creation_deactivated WHERE id =?";
  const mysql_creationDelete = "DELETE FROM dao_creation_deactivated WHERE id =?";
  db.query(mysql_DAOInsert, daoID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(mysql_creationInsert, creationID, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          db.query(mysql_DAODelete, daoID, (err, result) => {
            if (err) {
              console.log(err);
            } else {
              db.query(mysql_creationDelete, creationID, (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send(result);
                }
              });
            }
          });
        }
      });
    }
  });
});

app.post("/IMREAL/api/updateExecVal", (req, res) => {
  const execVal = req.body.execVal;
  const mysql_query = "UPDATE config SET ImREAL_execVal =?";
  db.query(mysql_query, execVal, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/updateAlias", (req, res) => {
  const alis = req.body.alis;
  const adminID = req.body.adminID;
  const mysql_query = "UPDATE admin SET alias =? WHERE id =?";
  db.query(mysql_query, [alis, adminID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/updateBlocks", (req, res) => {
  const blocks = req.body.blocks;
  const mysql_query = "UPDATE config SET ImREAL_blocks =?";
  db.query(mysql_query, blocks, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/updateClaimVal", (req, res) => {
  const execVal = req.body.execVal;
  const mysql_query = "UPDATE config SET ImREAL_claimVal =?";
  db.query(mysql_query, execVal, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/updateExecSwitch", (req, res) => {
  const execValStatus = req.body.execValStatus;
  const mysql_query = "UPDATE config SET execVal_status =?";
  db.query(mysql_query, execValStatus, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/updateAdminSwitch", (req, res) => {
  const adminID = req.body.adminID;
  const adminStatus = req.body.adminStatus;
  const mysql_query = "UPDATE admin SET isActive =? WHERE id =?";
  db.query(mysql_query, [adminStatus, adminID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/updateOptions", (req, res) => {
  const adminID = req.body.adminID;
  const adminStatus = req.body.adminStatus;
  const table = req.body.table;
  const mysql_query = `UPDATE admin SET ${table} =? WHERE id =?`;
  db.query(mysql_query, [adminStatus, adminID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.post("/IMREAL/api/updateWebWallet", (req, res) => {
  const newWebWallet = req.body.newWebWallet;
  const mysql_query = "UPDATE config SET ImREAL_wallet =?";
  db.query(mysql_query, newWebWallet, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/addAdminWallet", (req, res) => {
  const adminWallet = req.body.adminWallet;
  const mysql_query = "INSERT INTO admin (wallet,isActive,controls,creates,accounts,requests,DAOs,datetime) VALUES (?,0,0,0,0,0,0,Now())";
  const mysql_select = "SELECT * FROM admin WHERE wallet =?";
  db.query(mysql_select, adminWallet, (err, result) => {
    if (!result[0]) {
      db.query(mysql_query, adminWallet, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    } else {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  });
});

app.post("/IMREAL/api/updateTokenContract", (req, res) => {
  const newTokenContract = req.body.newTokenContract;
  const mysql_query = "UPDATE config SET ImREAL_token =?";
  db.query(mysql_query, newTokenContract, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/updatRPCURL", (req, res) => {
  const RPCURL = req.body.RPCURL;
  const mysql_query = "UPDATE config SET ImREAL_RPC =?";
  db.query(mysql_query, RPCURL, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/IMREAL/api/updateRequestStatus", (req, res) => {
  const requestID = req.body.requestID;
  const mysql_query = "UPDATE request SET request_status =1 WHERE id =?";
  db.query(mysql_query, requestID, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

const portNum = 3001;

https.createServer(options, app).listen(portNum, () => {
  console.log("running on port ", portNum);
});