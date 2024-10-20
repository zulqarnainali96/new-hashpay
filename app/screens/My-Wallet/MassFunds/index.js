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
import { useEffect } from "react";
import ApiConfig from "../../../api";
import axios from "axios";
import WalletContainer from "../../../redux/Containers/containers";
import { showDropdownfunc } from "../../../redux/Actions/actions";
import { useDispatch } from "react-redux";
import CloseCircle from "react-native-vector-icons/AntDesign";
import krossApi from "../../../utils/krossApi";
import MassTransferList from "./MassTransferList";
import { TouchableNativeFeedback } from "react-native";
const Plus = require("../../../../assets/images/plus.png");

const kss = require("../../../../assets/images/kss.png");
const hash = require("../../../../assets/images/hash.png");
const kusd = require("../../../../assets/images/kusd.png");

const CurrencyDropDown = ({ SelectedData, data }) => {
  return (
    <Surface
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
          <TouchableOpacity onPress={() => SelectedData(item)} key={i}>
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

const MassFunds = ({ walletState, walletActions, navigation }) => {
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [selectedCurrency, setSelected] = useState({
    id: 1,
    value: "KSS",
    address: "WAVES",
  });
  const [comments, setComments] = useState("");
  const [data, setData] = useState([]);
  const [balances, setBalances] = useState([]);
  const [noe, setNoe] = useState(2);
  const fee = "0.001";
  const [Currencydropdown, setCurrencyDropDown] = useState(false);
  const [selectedDataList, setSelectedDataList] = useState({
    id: 1,
    img: kss,
    value: "KSS",
    address: "WAVES",
  });

  const [addRecipient, setAddRecipients] = useState([
    { recipient: "", amount: "" },
  ]);

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
      HASH: otherb[0].balance,
      KUSD: otherb[1].balance,
    };
    setBalances(b);
    dispatch(showDropdownfunc(false));
  };
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
          return item.type === 11 && item.sender === walletState.address;
        });
        // console.log("mass 100: ", filterData);
        setData(filterData);
      } else {
        const result = await axios(
          `${ApiConfig.krossApi}/transactions/address/${
            walletState.address
          }/limit/${20}`
        );
        if (result.status !== 200) {
          return;
        }
        const filterData = result.data[0].filter((item) => {
          return item.type === 11 && item.sender === walletState.address;
        });
        setData(filterData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("Data ", data);
  useEffect(() => {
    getBalance();
    getTransactions("5");
  }, []);

  function handleAddRecipents(text, index) {
    setAddRecipients((prev) => {
      const newTransactions = [...prev];
      newTransactions[index].recipient = text;
      return newTransactions;
    });
  }
  function handleAddAmount(text, index) {
    setAddRecipients((prev) => {
      const newTransactions = [...prev];
      newTransactions[index].amount = text;
      return newTransactions;
    });
  }

  // Add New Recipients
  function addElement() {
    setAddRecipients((prev) => [...prev, { recipient: "", amount: "" }]);
  }
  function DeleteElement(index) {
    const filterElements = addRecipient?.filter((element) => {
      return addRecipient.indexOf(element) !== index;
    });
    setAddRecipients(filterElements);
  }

  const sendAmount = async () => {
    let found = false;
    setLoading(true);
    try {
      addRecipient.forEach((item) => {
        if (
          !item.recipient ||
          !item.amount ||
          item.amount <= 0 ||
          isNaN(item.amount) ||
          item.amount >
            balances[selectedCurrency.value] /
              10 ** krossApi.getDecimalFromAssetId(selectedCurrency.value)
        ) {
          alert(
            `${
              !item.recipient
                ? "Provide recipient address or alias"
                : !item.amount
                ? "Please provide amount"
                : !item.recipient && !item.amount
                ? "Provide recipent address and ammount"
                : item.amount <= 0
                ? `${item.amount} is not valid amount`
                : item.amount >
                  balances[selectedCurrency.value] /
                    10 ** krossApi.getDecimalFromAssetId(selectedCurrency.value)
                ? "Insufficient Balance"
                : isNaN(item.amount)
                ? `Provide ${item.amount} is a valid amount`
                : ""
            }`
          );
          found = true;
          setLoading(false);
          return true;
        }
      });
      let fetchaddress = "";
      let test = true;
      // let txs = [];
      if (!found) {
        for (let key of addRecipient) {
          const valid = await axios(
            `${ApiConfig.krossApi}/addresses/validate/${key.recipient}`
          );
          if (!valid.data.valid) {
            const alias = await krossApi.getAddressByAlias(key.recipient);
            if (alias == "") {
              test = false;
              alert(`${key.recipient} is not valid address or alias`);
              break;
            }
            setAddRecipients([...addRecipient, (key.recipient = alias)]);
          }
          setAddRecipients([
            ...addRecipient,
            (key.amount = Number(key.amount)),
          ]);
        }
        if (test) {
          krossApi.Masssend(
            addRecipient,
            comments,
            selectedCurrency.address,
            selectedCurrency.value,
            walletState.seed
          );
          // alert(`Transfer funds sucessfully on ${JSON.stringify(addRecipient)})`)
          setAddRecipients([{ recipient: "", amount: "" }]);
          getBalance();
          getTransactions();
          setLoading(false);
        }
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
      2;
    }
  };

  function AssetBalanceBaseonDigits() {
    if (selectedCurrency.value === "KSS") {
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

  // if (Loading === true) {
  //   return <Loader title={"Transfering Funds"} />;
  // }
  return (
    <>
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
              <Text style={{ fontFamily: "Lato" }}>
                {selectedDataList.value}
              </Text>
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

        {/* <View style={styles.marginSet} /> */}

        {/* Adding New Recipients here */}

        {addRecipient?.map((recipients, index) => {
          const { recipient, amount } = recipients;
          return (
            <View key={index}>
              {index >= 1 ? (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-end",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text style={{ fontFamily: "Mulish", fontWeight: "400" }}>
                      Remove recipient
                    </Text>
                    <TouchableOpacity onPress={() => DeleteElement(index)}>
                      <CloseCircle
                        color="#333"
                        size={20}
                        name="closecircle"
                        style={{ marginRight: 10, marginVertical: 8 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: "98%",
                      height: 1,
                      backgroundColor: "#333",
                    }}
                  />
                </>
              ) : null}
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
                onChangeText={(text) => handleAddRecipents(text, index)}
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
                onChangeText={(text) => handleAddAmount(text, index)}
                value={String(amount)}
              />
              <View style={styles.marginSet} />
            </View>
          );
        })}
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
          value={comments}
          onChangeText={(text) => setComments(text)}
        />
        <Text
          style={{
            color: colors.sendFund_text_box_label,
            fontWeight: "700",
            fontFamily: "Roboto",
            paddingLeft: 4,
            marginVertical: 10,
            marginTop: 20,
          }}
        >
          Transaction fee {fee} KSS
        </Text>
        <View style={styles.marginSet} />
        <TouchableNativeFeedback onPress={addElement}>
          <View
            style={{
              width: "98%",
              marginVertical: 6,
              height: 120,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              backgroundColor: colors.addRec_button_color,
            }}
          >
            <TouchableOpacity onPress={addElement}>
              <Image
                source={Plus}
                style={{ width: 24, height: 23.4, padding: 2 }}
              />
            </TouchableOpacity>
            <Text
              style={{ color: colors.black, fontSize: 13, fontFamily: "Lato" }}
            >
              Add Recipient
            </Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.marginSet} />
        <TouchableOpacity style={{ width: "98%", marginVertical: 6 }}>
          <Button
            style={[
              styles.ButtonStyle,
              { paddingVertical: 2, borderRadius: 5 },
            ]}
            mode="elevated"
            onPress={sendAmount}
          >
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontFamily: "Lato",
                fontWeight: "700",
                lineHeight: 20,
              }}
            >
              Confirm Mass Transfer
            </Text>
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
                color : "#3a1278",
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
              <MassTransferList
                key={index}
                data={item}
                address={walletState.address}
                mapID={index}
              />
            );
          })
        ) : (
          <Text>No Transaction Found</Text>
        )}
      </ScrollView>
    </>
  );
};

export default WalletContainer(MassFunds);

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

// var massAlias = filterData
//   .map((item) => {
//     return item.transfers;
//   })
//   massAlias.map( (item,i) => {
//     item.map( (list,k) => {
//      obj.push(list)
//      return obj
//     })
//   })
// // console.log("arr ", obj);
// setMassTransferAlias(obj)
// for(let i; i <= obj.length; i++){
//   console.log('no')
//   const address = obj[i].recipient
//   const alias = await krossApi.getAliasByAddress(address)
//   console.log('as', alias)
//   if(alias){
//     console.log('found ', alias)
//   }
// }
