import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Text as TextPaper,
  Surface,
  ActivityIndicator,
} from "react-native-paper";
import React, { useState } from "react";
import CaretDown from "react-native-vector-icons/AntDesign";
import colors from "../../../utils/colors";
import Transaction from "../../../components/Transaction";
import { useEffect } from "react";
import ApiConfig from "../../../api";
import axios from "axios";
import { ProviderSeed } from "@waves/provider-seed";
import { Signer } from "@waves/signer";
import WalletContainer from "../../../redux/Containers/containers";
import { base58Encode, stringToBytes } from "@waves/ts-lib-crypto";
import { showDropdownfunc } from "../../../redux/Actions/actions";
import { useDispatch } from "react-redux";
import krossApi from "../../../utils/krossApi";
const kss = require("../../../../assets/images/kss.png");
const hash = require("../../../../assets/images/hash.png");
const kusd = require("../../../../assets/images/kusd.png");

const CurrencyDropDown = ({ SelectedData, data }) => {
  return (
    <Surface
      key={data.id}
      elevation={4}
      style={{
        position: "absolute",
        height: 130,
        width: "60%",
        backgroundColor: "#fff",
        borderRadius: 8,
        // borderWidth: 1,
        // borderColor : "#ccc",
        top: "190%",
        left: "0%",
        zIndex: 3,
      }}
    >
      {data?.map((item, i) => {
        let { value, image } = item;
        return (
          <TouchableOpacity key={i} onPress={() => SelectedData(item)}>
            <View
              style={{
                flexDirection: "row",
                gap: 11,
                backgroundColor: "#F1F1F1",
                marginTop: i === 0 ? 0 : 4.2,
                padding: 5.5,
                paddingLeft: 12,
                borderBottomLeftRadius: i === 2 ? 8 : 0,
                borderBottomRightRadius: i === 2 ? 8 : 0,
              }}
            >
              <Image
                source={image}
                resizeMode="cover"
                style={{ width: i === 2 ? 31 : 28, height: i === 2 ? 31 : 30 }}
              />
              <Text>{value}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </Surface>
  );
};

const SendFunds = ({ walletState, walletActions, navigation }) => {
  const [selectedCurrency, setSelected] = useState({
    id: 1,
    value: "KSS",
    address: "WAVES",
  });
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [comments, setComments] = useState("");
  const [cleanup, setCleanup] = useState(false);
  const [Currencydropdown, setCurrencyDropDown] = useState(false);
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [balances, setBalances] = useState([]);
  const dispatch = useDispatch();
  const fee = "0.001";
  // const [walletAddress, setWalletAddress] = useState(
  //   "3KW7mRGGR5koNMXKwaCe6g73bjbxTgKzqwL"
  // );
  // const [totalbalance, setTotalBalance] = useState(0);
  // const [userData, setUserdata] = useState();
  const [selectedDataList, setSelectedDataList] = useState({
    id: 1,
    img: kss,
    value: "KSS",
    address: "WAVES",
  });

  var transferData = [
    { id: 1, value: "KSS", image: kss, address: "WAVES" },
    {
      id: 2,
      value: "HASH",
      image: hash,
      address: "A9UCEyG4PwZrkZ4vC3XimXr4A3gWQ8eCs8JDaHKYrP1d",
    },
    {
      id: 3,
      value: "KUSD",
      image: kusd,
      address: "FfF8yjFySexTH5JEBnAoxcgQk6mMY5vcnEcSa1pQxxKE",
    },
  ];

  function SelectedData(item) {
    let { image, value } = item;
    setSelected(item);
    setSelectedDataList({
      img: image,
      value: value,
    });
    setTimeout(() => {
      setCurrencyDropDown(false);
    }, 200);
  }

  const getTransactions = async (limit) => {
    try {
      if (limit == "100") {
        const result = await axios(
          `${ApiConfig.krossApi}/transactions/address/${walletState.address}/limit/${limit}`
        );
        if (result.status !== 200) {
          return;
        }
        const filterData = result.data[0].filter((item) => {
          return (
            item.sender == walletState.address &&
            !item.hasOwnProperty("alias") &&
            item.type === 4
          );
        });
        setData(filterData);
      } else {
        const result = await axios(
          `${ApiConfig.krossApi}/transactions/address/${walletState.address}/limit/${limit}`
        );
        if (result.status !== 200) {
          return;
        }
        const filterData = result.data[0].filter((item) => {
          return (
            item.sender == walletState.address &&
            !item.hasOwnProperty("alias") &&
            item.type === 4
          );
        });
        setData(filterData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    var kccbal = await axios(
      `${ApiConfig.krossApi}/addresses/balance/${walletState.address}`
    );
    var otherbal = await axios(
      `${ApiConfig.krossApi}/assets/balance/${walletState.address}?id=A9UCEyG4PwZrkZ4vC3XimXr4A3gWQ8eCs8JDaHKYrP1d&id=FfF8yjFySexTH5JEBnAoxcgQk6mMY5vcnEcSa1pQxxKE`
    );
    var otherb = await otherbal.data.balances;
    var b = {
      KSS: await kccbal.data.balance,
      HASH: await otherb[0].balance,
      KUSD: await otherb[1].balance,
    };
    setBalances(b);
    dispatch(showDropdownfunc(false));
  };

  useEffect(() => {
    getBalance();
    getTransactions("5");
  }, []);

  async function sendAmount() {
    if (
      amount >
      balances[selectedCurrency?.value] /
        10 ** krossApi.getDecimalFromAssetId(selectedCurrency.value)
    ) {
      alert("Insufficient Balance");
      return;
    }

    if (amount == 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (recipient == "") {
      alert("Please enter address");
      return;
    }
    setLoading(true);
    try {
      const signer = new Signer({ NODE_URL: ApiConfig.krossApi });
      const provider = new ProviderSeed(walletState.seed);
      signer.setProvider(provider);
      const user = await signer.login();

      if (recipient == walletState.address) {
        alert("You can't send to your own account");
        return;
      }
      const d = await axios(
        `${ApiConfig.krossApi}/addresses/validate/${recipient}`
      );
      var fetchaddress = "";
      if (d.data.valid == false) {
        const alias = await krossApi.getAddressByAlias(recipient);
        if (alias == "") {
          alert(recipient + " is not a valid address");
          setLoading(false);
          return;
        }
        fetchaddress = alias;
      }
      const transfer = {
        recipient: fetchaddress == "" ? recipient : fetchaddress,
        amount: amount * 10 ** krossApi.getDecimalFromAssetId(selectedCurrency.value),
        attachment: base58Encode(stringToBytes(comments)),
        assetId: selectedCurrency.address,
        feeAssetId: "WAVES",
      };
      const [tx] = await signer.transfer(transfer).broadcast();
      krossApi.hashBalance(walletState.address, walletActions);
      krossApi.kssBalance(walletState.address, walletActions);
      krossApi.kusdBalance(walletState.address, walletActions);
      setCleanup(true);
      alert("Transaction Sent !! Wait to reflect");
      getBalance();
      setLoading(false);
      getTransactions();
    } catch (err) {
      alert(err.message);
      setLoading(false);
    }
  }
  function AssetBalanceBaseonDigits() {
    if (selectedCurrency.value == "KSS") {
      return (
        balances[selectedCurrency?.value] /
        10 ** krossApi.getDecimalFromAssetId(selectedCurrency.value)
      ).toFixed(8);
    } else {
      return (
        balances[selectedCurrency?.value] /
        10 ** krossApi.getDecimalFromAssetId(selectedCurrency.value)
      ).toFixed(6);
    }
  }

  useEffect(() => {
    return () => {
      setCleanup(false);
      setLoading(false);
    };
  }, [cleanup]);

  return (
    <ScrollView
      contentContainerStyle={styles.sendContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          color: colors.sendFund_text_box_label,
          fontWeight: "400",
          fontFamily: "Lato",
          fontSize: 13,
          marginLeft: "1%",
          lineHeight: 20,
          letterSpacing: -0.4,
        }}
      >
        Currency to Transfer
      </Text>
      <View
        style={[
          styles.ListStyle,
          {
            borderWidth: 1,
            width: "98%",
            height: 50,
            position: "relative",
            zIndex: 1,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => setCurrencyDropDown((prev) => !prev)}
          style={{
            width: "100%",
            paddingLeft: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            // paddingVertical: 7,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              paddingLeft: 10,
              alignItems: "center",
            }}
          >
            <Image
              source={selectedDataList.img}
              resizeMode="contain"
              style={{ width: 30, height: 28, padding: 4 }}
            />
            <Text style={{ fontFamily: "Lato" }}>{selectedDataList.value}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setCurrencyDropDown((prev) => !prev)}
          >
            <CaretDown
              style={{ paddingRight: 10, marginTop: 6 }}
              size={16}
              color={colors.black}
              name="down"
            />
          </TouchableOpacity>
        </TouchableOpacity>
        {Currencydropdown && (
          <CurrencyDropDown SelectedData={SelectedData} data={transferData} />
        )}
      </View>
      <Text
        style={{
          color: colors.sendFund_text_box_label,
          marginTop: 12,
          fontWeight: "700",
          fontFamily: "Roboto",
          paddingLeft: 4,
        }}
      >
        Balance: {AssetBalanceBaseonDigits() + " " + selectedCurrency?.value}
      </Text>
      {Loading && <ActivityIndicator size={30} />}
      <View style={styles.marginSet} />
      <Text
        style={{
          color: colors.sendFund_text_box_label,
          fontWeight: "400",
          fontFamily: "Lato",
          fontSize: 13,
          marginLeft: "1%",
          lineHeight: 20,
          letterSpacing: -0.4,
        }}
      >
        Recipient’s Kross alias or address
      </Text>
      <View style={styles.marginSetNormal} />
      <TextInput
        style={[
          styles.inputBoxSetting,
          {
            width: "98%",
            borderWidth: 1,
            paddingVertical: 10,
            borderRadius: 6,
            borderColor: colors.andBordercolor,
          },
        ]}
        onChangeText={setRecipient}
        value={recipient}
      />
      <View style={styles.marginSet} />
      <Text
        style={{
          color: colors.sendFund_text_box_label,
          fontWeight: "400",
          fontFamily: "Lato",
          fontSize: 13,
          marginLeft: "1%",
          lineHeight: 20,
          letterSpacing: -0.4,
        }}
      >
        Amount to transfer
      </Text>
      <View style={styles.marginSetNormal} />
      <TextInput
        style={[
          styles.inputBoxSetting,
          {
            width: "98%",
            borderWidth: 1,
            paddingVertical: 10,
            borderRadius: 6,
            borderColor: colors.andBordercolor,
          },
        ]}
        keyboardType="numeric"
        onChangeText={setAmount}
        value={amount}
      />

      <View style={styles.marginSet} />
      <Text
        style={{
          color: colors.sendFund_text_box_label,
          fontWeight: "400",
          fontFamily: "Lato",
          fontSize: 13,
          marginLeft: "1%",
          lineHeight: 20,
          letterSpacing: -0.4,
        }}
      >
        Comment
      </Text>
      <View style={styles.marginSetNormal} />
      <TextInput
        style={[
          styles.inputBoxSetting,
          {
            width: "98%",
            height: 140,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: colors.andBordercolor,
            padding: 14,
          },
        ]}
        textAlignVertical="top"
        numberOfLines={4}
        multiline={true}
        onChangeText={setComments}
      />
      <View style={styles.marginSet} />
      <Text
        style={{
          color: colors.sendFund_text_box_label,
          fontWeight: "700",
          fontFamily: "Roboto",
          paddingLeft: 4,
        }}
      >
        Transaction fee {fee} KSS
      </Text>
      <View style={styles.marginSet} />
      <TouchableOpacity style={{ width: "98%", marginVertical: 6 }}>
        <Button
          style={[styles.ButtonStyle, { paddingVertical: 2, borderRadius: 5 }]}
          mode="elevated"
          onPress={sendAmount}
        >
          <Text style={{ color: "white", fontSize: 14 }}>Confirm Transfer</Text>
        </Button>
      </TouchableOpacity>
      <View style={styles.marginSet} />
      <View
        style={{
          flex: 0.2,
          // height : 200,
          justifyContent: "space-between",
          flexDirection: "row",
          // backgroundColor: "green",
          paddingVertical: 14,
          marginTop: 70,
          width: "100%",
        }}
      >
        <TextPaper
          variant="bodyLarge"
          style={{
            alignSelf: "flex-start",
            fontWeight: "400",
            color: colors.black,
            fontFamily: "Doppio_One_regular",
          }}
          x
        >
          Transaction History
        </TextPaper>
        <TouchableOpacity onPress={() => getTransactions("100")}>
          <TextPaper
            style={{
              fontWeight: "400",
              fontFamily: "Doppio_One_regular",
              textDecorationLine: "underline",
              lineHeight: 21,
              color : '#3a1278',
            }}
          >
            View more
          </TextPaper>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }} />
      {data.length ? (
        data.map((item, index) => {
          return (
            <Transaction
              key={item.id}
              data={item}
              address={walletState.address}
              mapId={index}
            />
          );
        })
      ) : (
        <Text>No Transaction Found</Text>
      )}
    </ScrollView>
  );
};

export default WalletContainer(SendFunds);

const styles = StyleSheet.create({
  sendContainer: {
    // height : "100%",
    // flex : 1,
    width: "100%",
    paddingHorizontal: 18,
    backgroundColor: "white",
    paddingVertical: 14,
  },
  ListStyle: {
    width: "90%",
    height: 45,
    marginVertical: 5,
    paddingVertical: 10,
    borderRadius: 5,
  },
  inputStyles: {
    width: "100%",
    maxHeight: 30,
    minHeight: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  marginSet: {
    marginVertical: 12,
  },
  marginSetNormal: {
    marginVertical: 5,
  },
  inputBoxSetting: {
    paddingHorizontal: 12,
  },
  ButtonStyle: {
    width: "100%",
    paddingVertical: 5,
    backgroundColor: colors.pinkColor,
    color: "white",
  },
});
