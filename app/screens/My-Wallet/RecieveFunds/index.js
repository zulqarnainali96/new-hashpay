import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import { Text as TextPaper } from "react-native-paper";
import React, { useState } from "react";
import colors from "../../../utils/colors";
import Transaction from "../../../components/Transaction";
import WalletContainer from "../../../redux/Containers/containers";
import { useEffect } from "react";
import axios from "axios";
import ApiConfig from "../../../api";
import { showDropdownfunc } from "../../../redux/Actions/actions";
import { useDispatch } from "react-redux";
import * as Clipboard from "expo-clipboard";
import SvgQRCode from "react-native-qrcode-svg";
import { ToastAndroid } from "react-native";
const share = require("../../../../assets/images/share.png");
const copy2 = require("../../../../assets/images/copy-2.png");
const alert = require("../../../../assets/images/alert.png");

const ReceiveFunds = ({ walletState, navigation }) => {
  const [data, setData] = useState([]);
  const [copiedText, setCopiedText] = useState("");
  const dispatch = useDispatch();

  const copyToClipboard = async (value) => {
    await Clipboard.setStringAsync(value);
    ToastAndroid.showWithGravity(
      "Text copied to clipboard",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const fetchCopiedText = async (value) => {
    copyToClipboard(value);
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  const ShareMsg = async () => {
    try {
      const result = await Share.share({
        message: walletState.address,
      });
    } catch (error) {
      // console.log("Share address Error => ", error);
    }
  };
  const getTransactions = async (limit) => {
    try {
      if (limit == '100') {
        const result = await axios(
          `${ApiConfig.krossApi}/transactions/address/${walletState.address}/limit/${limit}`
        );
        if (result.status !== 200) {
          return;
        }
        const filterData = result.data[0].filter((item) => {
          return (item.sender !== walletState.address && item.type === 4) || (item.sender !== walletState.address && item.type === 11);
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
          return (item.sender !== walletState.address && item.type === 4) || (item.sender !== walletState.address && item.type === 11);
        });
        setData(filterData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTransactions('5');
    dispatch(showDropdownfunc(false));
    getTransactions();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.receiveFunds}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.qrCode}>
        <View style={{ fle: 1 }}>
          {/* <Image resizeMethod="auto" resizeMode="center" source={qrCode} style={styles.qrCodeImage} /> */}
          <SvgQRCode value={walletState.address} size={120} />
        </View>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={{ color: colors.dropDowngraytextcolor, fontSize: 17 }}>
            Deposit address
          </Text>
          <Text
            style={{
              color: colors.menuColor,
              paddingVertical: 8,
              fontSize: 16,
              fontFamily: "Lato",
              fontStyle: "normal",
              fontWeight: "700",
            }}
          >
            {walletState.address}
          </Text>
          <View
            style={{
              marginTop: 8,
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => fetchCopiedText(walletState.address)}
            >
              <Image source={copy2} style={{ width: 20, height: 22 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={ShareMsg}>
              <Image source={share} style={{ width: 29, height: 28 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.marginSet} />
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          height: 260,
          backgroundColor: colors.alertBoxColor,
          paddingVertical: 20,
          borderRadius: 10,
        }}
      >
        <Image source={alert} style={{ width: 50, height: 50 }} />
        <View style={{ width: 260 }}>
          <Text
            style={{
              textAlign: "center",
              lineHeight: 23,
              color: colors.sendFund_text_box_label,
              fontFamily: "Lato",
              marginTop: 7,
            }}
          >
            Send only Kross based cryptocurrencies or Assets to this wallet
            address. Your account will automatically update after the
            cryptocurrency network confirms your transaction. The confirmation
            takes only few minutes. You can track all the transactions directly
            on the Explorer.
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          // paddingHorizontal: 22,
          // backgroundColor : 'yellow',
        }}
      >
        <View
          style={{
            flex: 0.2,
            // height : 200,
            justifyContent: "space-between",
            flexDirection: "row",
            // backgroundColor: "green",
            paddingVertical: 14,
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
          <TouchableOpacity onPress={() => getTransactions('100')}>
            <TextPaper
              style={{
                fontWeight: "400",
                fontFamily: "Doppio_One_regular",
                textDecorationLine: "underline",
                lineHeight: 21,
                color: "#3a1278"
              }}
            >
              View more
            </TextPaper>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, width: "100%"}}>
          {data.length ? (
            data.map((item, index) => {
              return (
                <Transaction
                  key={index}
                  data={item}
                  address={walletState.address}
                  mapId={index}
                  nickname={walletState.userAlias}
                />
              );
            })
          ) : (
            <Text>No Transaction Found</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default WalletContainer(ReceiveFunds);

const styles = StyleSheet.create({
  receiveFunds: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 17,
    alignContent: "center",
    backgroundColor: "white",
  },
  qrCode: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  qrCodeImage: {
    width: 125,
    height: 120,
  },
  marginSet: {
    marginVertical: 12,
  },
});
