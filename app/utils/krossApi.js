import ApiConfig from "../api";
import axios from "axios";
import { ProviderSeed } from "@waves/provider-seed";
import { Signer } from "@waves/signer";
import { base58Encode, stringToBytes } from "@waves/ts-lib-crypto";

const LoginUser = async (
  callback,
  error_callback,
  loadingFunction,
  seedpassword,
  navigation
) => {
  try {
    const signer = new Signer({ NODE_URL: ApiConfig.krossApi });
    const provider = new ProviderSeed(seedpassword);
    signer.setProvider(provider);
    const user = await signer.login();
    if (!user.publicKey) {
      alert("Not found");
      return;
    }
    const result = await axios.get(
      `${ApiConfig.krossApi}/addresses/publicKey/${user.publicKey}`
    );
    if (!result.status === 200) {
      alert("try again");
      return;
    }
    const { address } = result.data;
    if (callback) {
      callback(address, user.publicKey, seedpassword);
      navigation.navigate("confirm-user");
    }
  } catch (error) {
    alert(error);
  }
};

const getUser_Address = async (
  callback,
  dispatch,
  accountAddressfunc,
  seedpassword
) => {
  try {
    if (seedpassword.length < 60) {
      // alert("Please seed atleast max 90 words space included");
      return;
    }
    const signer = new Signer({ NODE_URL: ApiConfig.krossApi });
    const provider = new ProviderSeed(seedpassword);
    signer.setProvider(provider);
    const user = await signer.login();
    if (!user.publicKey) {
      alert("Please try again");
      return;
    }
    const result = await axios.get(
      `${ApiConfig.krossApi}/addresses/publicKey/${user.publicKey}`
    );
    if (!result.status === 200) {
      alert("try again");
      return;
    }
    if (result.data) {
      const { address } = result.data;
      if (callback) {
        callback(address, user.publicKey, seedpassword);
        dispatch(accountAddressfunc(address));
      }
    }
  } catch (error) {
    alert(error);
  }
};

const getBalance = async (address) => {
  try {
    const result = await axios(
      `${ApiConfig.krossApi}/addresses/balance/${address}`
    );
    if (result.status !== 200) {
      return;
    }
  } catch (error) {
    alert(error);
  }
};

const getAssetsBalance = async (seedpassword, callback) => {
  try {
    const signer = new Signer({ NODE_URL: ApiConfig.krossApi });
    const provider = new ProviderSeed(seedpassword);
    signer.setProvider(provider);
    const user = await signer.login();
    const balance = await signer.getBalance();
    if (callback) {
      callback(balance);
    }
    return balance;
  } catch (err) {
    alert("Something wrong happened !!");
    console.log(err);
  }
};
async function hashBalance(address, walletActions) {
  try {
    const result = await axios(
      `${ApiConfig.krossApi}/assets/balance/${address}/${ApiConfig.hashAssetID}`
    );
    if (result.data) {
      let { balance } = result.data;
      walletActions.hashBalance(balance);
    }
  } catch (error) {
    console.log("Erorr :", error);
  }
}
async function kusdBalance(address, walletActions) {
  try {
    const result = await axios(
      `${ApiConfig.krossApi}/assets/balance/${address}/${ApiConfig.kusdAssetID}`
    );
    if (result.data) {
      let { balance } = result.data;
      walletActions.kusdBalance(balance);
    }
    // console.log(result.data);
  } catch (error) {
    console.log("Erorr :", error);
  }
}
async function kssBalance(address, walletActions) {
  try {
    const result = await axios(
      `${ApiConfig.krossApi}/addresses/balance/${address}`
    );
    if (result.data) {
      let { balance } = result.data;
      walletActions.kssBalance(balance);
    }
    // console.log(result.data);
  } catch (error) {
    console.log("Erorr :", error);
  }
}

const getAddressByAlias = async (alias) => {
  try {
    const res = await axios.get(
      encodeURI(`${ApiConfig.krossApi}/alias/by-alias/${alias}`)
    );
    if (res.status !== 200) return "";
    return res.data.address;
  } catch (e) {}
  return "";
};

const getAliasByAddress = async (recipient) => {
  try {
    const res = await axios.get(
      encodeURI(`${ApiConfig.krossApi}/alias/by-address/${recipient}`)
    );
    if (res.status !== 200) return "";
    return res.data[0]
  } catch (e) {}
  return "";
};
const getBalanceFromAssetId = (walletState, assetId) => {
  switch (assetId) {
    case "HASH":
      return walletState.hash_balance;
    case "KSS":
      return walletState.kss_balance;
    case "KUSD":
      return walletState.kusd_balance;
    default:
      return 0;
  }
};
const getDecimalFromAssetId = (assetId) => {
  switch (assetId) {
    case "KUSD":
      return 6;
    case "HASH":
      return 6
    case "KSS":
      return 8;
  }
};
const Masssend = async (recipients, comments, assetId, assetName, seedpassword) => {
  try {
    const signer = new Signer({ NODE_URL: ApiConfig.krossApi });
    const provider = new ProviderSeed(seedpassword);
    signer.setProvider(provider);
    await signer.login();
    if ((recipients, assetId)) {
      let massTransfer = {
        transfers: [],
        assetId: assetId,
        fee: 0.001 * recipients.length * 10 ** 8
      };
      recipients.forEach((recipient) => {
        massTransfer.transfers.push({
          recipient: recipient.recipient,
          amount: recipient.amount * 10 ** getDecimalFromAssetId(assetName),
        });
      });
      if(comments){
        massTransfer.attachment = base58Encode(stringToBytes(comments));
      }
      await signer.massTransfer(massTransfer).broadcast();
      alert(`Funds Transferred Successfully`)
    }
  } catch (e) {
    alert(e.message);
  }
};
// const createAlias = async (address, alias) => {
//   try {
//     if (window.waves) {
//       await window.waves
//         .alias({
//           alias,
//         })
//         .broadcast();
//       return true;
//     }
//   } catch (e) {
//     console.log(e);
//     AlertUtils.SystemAlert(e);
//     return false;
//   }
// };

export default {
  LoginUser,
  getUser_Address,
  getBalance,
  getAssetsBalance,
  kssBalance,
  kusdBalance,
  hashBalance,
  getDecimalFromAssetId,
  getAddressByAlias,
  getAliasByAddress,
  getBalanceFromAssetId,
  Masssend,
};
