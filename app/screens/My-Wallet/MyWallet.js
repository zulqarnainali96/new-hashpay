import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Linking,
} from "react-native";
import { Button, Text as TextPaper } from "react-native-paper";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Transaction from "../../components/Transaction";
import colors from "../../utils/colors";
import * as Clipboard from "expo-clipboard";
import axios from "axios";
import ApiConfig from "../../api";
import { useDispatch } from "react-redux";
import WalletContainer from "../../redux/Containers/containers";
import { showDropdownfunc } from "../../redux/Actions/actions";
const balance = require("../../../assets/images/balance.png");

const kss = require("../../../assets/images/kss.png");
const hash = require("../../../assets/images/hash.png");
const kusd = require("../../../assets/images/kusd.png");
const copy = require("../../../assets/images/copy.png");

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

const MyWallet = ({ walletState, walletActions, navigation }) => {
  const [copiedText, setCopiedText] = useState("");
  const textRef = useRef(null);
  const [data, setData] = useState([]);
  const [totalbalance, setTotalBalance] = useState(0);
  const [kusdNairabalance, setKusdNairaBalance] = useState();
  const [hashNairabalance, setHashNairaBalance] = useState();
  const [kssNairabalance, setKssNairaBalance] = useState();
  const [nairaBalance, setNairaBalance] = useState(1700);

  var nairabalance = 0;

  const options = {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "symbol",
  };
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
  const getTransactions = async (limit) => {
    try {
      if (limit) {
        const result = await axios(
          `${ApiConfig.krossApi}/transactions/address/${walletState.address}/limit/${limit}`
        );
        if (result.status !== 200) {
          return;
        }

        const resultFilter = result.data[0].filter(
          (fil) =>
            (!fil.hasOwnProperty("alias") && fil.type === 4) || fil.type === 11
        );
        // console.log("100 :", resultFilter);
        setData(resultFilter);
      } else {
        const result = await axios(
          `${ApiConfig.krossApi}/transactions/address/${walletState.address}/limit/5`
        );
        if (result.status !== 200) {
          return;
        }
        const resultFilter = result.data[0].filter(
          (fil) => fil.type === 11 || fil.type === 4
        );
        setData(resultFilter);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      const result = await axios(
        `${ApiConfig.krossApi}/addresses/balance/${walletState.address}`
      );
      if (result.status !== 200) {
        return;
      }
      setTotalBalance(result.data.balance / 10 ** 6);
    } catch (error) {
      alert(error);
    }
  };

  const getNickname = async () => {
    const data = await axios(
      `${ApiConfig.krossApi}/alias/by-address/${walletState.address}`
    );
    if ((data.data.length) > 0) {
      const alias = await data.data[0];
      walletActions.getUserAlias(alias)
    }
  };

  const NairaBalanceCall = () => {
    dispatch(showDropdownfunc(false));
    setKusdNairaBalance(
      Number(Math.round((walletState.kusd_balance / 10 ** 6) * nairaBalance * 10) / 10)
    );
    setHashNairaBalance(
      Number(Math.round((walletState.hash_balance / 10 ** 6) * 1 * 10) / 10)
    );
    setKssNairaBalance(
      Number(Math.round((walletState.kss_balance / 10 ** 8) * nairaBalance * 10) / 10)
    );
  };
  useEffect(() => {
    NairaBalanceCall();
    getBalance();
    getTransactions();
    getNickname()
  }, []);
  nairabalance = kssNairabalance + hashNairabalance + kusdNairabalance;

  return (
    <ScrollView
      contentContainerStyle={styles.waContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.textSetting}>Wallet address</Text>
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text selectable={true} style={styles.address}>
          {walletState.address}
        </Text>
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => fetchCopiedText(walletState.address)}
        >
          <Image source={copy} style={{ width: 17, height: 18 }} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.3,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        }}
      >
        <ImageBackground
          resizeMode="stretch"
          source={balance}
          style={styles.ImageBG}
        >
          <Text style={styles.ImageBgText}>Total Balance</Text>
          <TextPaper
            selectable
            numberOfLines={4}
            minimumFontScale={10}
            adjustsFontSizeToFit={true}
            style={styles.ImageBgBalance}
            variant="headlineMedium"
          >
            &#x20A6; {nairabalance ? nairabalance.toLocaleString(options) : 0}
          </TextPaper>
        </ImageBackground>
      </View>
      <View style={styles.currencyBalBox}>
        <View style={styles.box1}>
          <View style={styles.box1inside}>
            <Image
              resizeMode="contain"
              source={kss}
              style={{ width: 22, height: 25 }}
            />
            <Text
              style={{
                paddingVertical: 4,
                color: colors.dropDowngraytextcolor,
                fontSize: ScreenWidth * 0.034,
              }}
            >
              KSS
            </Text>
          </View>
          <TextPaper
            numberOfLines={4}
            style={{
              textAlign: "center",
              fontFamily: "Lato",
              fontWeight: "700",
              height: "auto",
              paddingVertical: 5,
              fontSize: ScreenWidth * 0.03,
              color: colors.dropDowngraytextcolor,
            }}
          >
            {(walletState.kss_balance / 10 ** 8).toFixed(8)}
          </TextPaper>
          <View style={{ marginVertical: 2.3 }} />
          <TextPaper
            style={{
              textAlign: "center",
              height: "auto",
              color: kssNairabalance === 0 ? "black" : "green",
              fontSize: ScreenWidth * 0.032,
            }}
          >
            (N {kssNairabalance})
          </TextPaper>
          <TextPaper
            style={{
              textAlign: "center",
              fontSize: ScreenWidth * 0.024,
              paddingVertical: 5,
              color: colors.dropDowngraytextcolor,
            }}
          >
            Current Price: {nairaBalance} Naira
          </TextPaper>
        </View>
        <View style={styles.box1}>
          <View style={styles.box1inside}>
            <Image
              resizeMode="contain"
              source={hash}
              style={{ width: 22, height: 25 }}
            />
            <Text
              style={{
                paddingVertical: 4,
                color: colors.dropDowngraytextcolor,
                fontSize: ScreenWidth * 0.034,
              }}
            >
              HASH
            </Text>
          </View>
          <TextPaper
            numberOfLines={4}
            style={{
              textAlign: "center",
              fontFamily: "Lato",
              fontWeight: "700",
              paddingVertical: 5,
              height: "auto",
              fontSize: ScreenWidth * 0.03,
              color: colors.dropDowngraytextcolor,
            }}
          >
            {(walletState.hash_balance / 10 ** 6).toFixed(6)}
          </TextPaper>
          <View style={{ marginVertical: 2.3 }} />

          <TextPaper
            style={{
              textAlign: "center",
              color: hashNairabalance === 0 ? "black" : "green",
              fontSize: ScreenWidth * 0.032,
            }}
          >
            (N {hashNairabalance})
          </TextPaper>
          <TextPaper
            style={{
              textAlign: "center",
              fontSize: ScreenWidth * 0.024,
              paddingVertical: 5,
              color: colors.dropDowngraytextcolor,
            }}
          >
            Current Price: {" "} 1 Naira
          </TextPaper>
        </View>
        <View style={styles.box1}>
          <View style={styles.box1inside}>
            <Image
              resizeMode="contain"
              source={kusd}
              style={{ width: 26, height: 26 }}
            />
            <Text
              style={{
                paddingVertical: 4,
                color: colors.dropDowngraytextcolor,
                fontSize: ScreenWidth * 0.034,
              }}
            >
              KUSD
            </Text>
          </View>
          <TextPaper
            numberOfLines={4}
            style={{
              textAlign: "center",
              fontFamily: "Lato",
              fontWeight: "700",
              paddingVertical: 5,
              fontSize: ScreenWidth * 0.03,
              color: colors.dropDowngraytextcolor,
            }}
          >
            {(walletState.kusd_balance / 10 ** 6).toFixed(6)}
          </TextPaper>
          <View style={{ marginVertical: 2.3 }} />

          <TextPaper
            style={{
              textAlign: "center",
              height: "auto",
              color: kusdNairabalance === 0 ? "black" : "green",
              fontSize: ScreenWidth * 0.032,
            }}
          >
            (N {kusdNairabalance})
          </TextPaper>
          <TextPaper
            style={{
              textAlign: "center",
              fontSize: ScreenWidth * 0.024,
              paddingVertical: 5,
              color: colors.dropDowngraytextcolor,
            }}
          >
            Current Price: {nairaBalance} Naira
          </TextPaper>
        </View>
      </View>
      <View style={styles.walletContent}>
        <TextPaper variant="headlineMedium" style={styles.youReady}>
          You are Ready !
        </TextPaper>
        <TextPaper
          variant="bodyMedium"
          style={{
            textAlign: "center",
            paddingVertical: 10,
            paddingHorizontal: ScreenWidth * 0.15,
            letterSpacing: 1,
            lineHeight: 20,
            fontSize: ScreenWidth * 0.034,
            color: colors.dropDowngraytextcolor,
          }}
        >
          You're now connected and able to use the application. We recommend you
          to make a backup of your account seed words if you just created one.
          Losing them means loss of access to your account.
        </TextPaper>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://forms.gle/JAy7ycJZo8bS5Xcw5")}
          style={{ width: "90%", marginVertical: 6, marginBottom: 13 }}
        >
          <Button
            style={[
              styles.ButtonStyle,
              { paddingVertical: 2, borderRadius: 8 },
            ]}
            mode="elevated"
          >
            <Text
              style={{
                color: "white",
                fontSize: ScreenWidth * 0.029,
                fontFamily: "Lato",
                fontWeight: "700",
              }}
            >
              Buy HASH Naira
            </Text>
          </Button>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://docs.google.com/forms/d/e/1FAIpQLSdIuV4az7Y0YCiYsd0addPNndvqdcA4OQwjeUgqldyZcZE3Lw/viewform"
            )
          }
          style={{ width: "90%", marginVertical: 5 }}
        >
          <Button
            style={[
              styles.ButtonStyle,
              {
                paddingVertical: 1,
                borderRadius: 8,
                backgroundColor: "transparent",
                borderColor: "#FE006C",
                borderWidth: 2,
              },
            ]}
            mode="contained"
          >
            <Text
              style={{
                color: colors.pinkColor,
                fontSize: ScreenWidth * 0.029,
                fontFamily: "Lato",
                fontWeight: "700",
              }}
            >
              Buy KSS Credit's
            </Text>
          </Button>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
          paddingHorizontal: 22,
          marginTop: 70,
          backgroundColor: "#FEFEFE",
        }}
      >
        <View
          style={{
            flex: 0.2,
            justifyContent: "space-between",
            flexDirection: "row",
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
          <TouchableOpacity onPress={() => getTransactions("100")}>
            <TextPaper
              style={{
                textDecorationLine: "underline",
                fontWeight: "400",
                fontFamily: "Doppio_One_regular",
                lineHeight: 21,
                color: "#3a1278",
              }}
            >
              View more
            </TextPaper>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, width: "100%", marginTop: 20 }}>
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

export default WalletContainer(MyWallet);

const styles = StyleSheet.create({
  waContainer: {
    // height: ScreenHeight,
    backgroundColor: colors.white,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 8,
  },
  textSetting: {
    color: colors.dropDowngraytextcolor,
    marginTop: 15,
  },
  address: {
    color: colors.menuColor,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: ScreenWidth * 0.037,
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: "700",
  },
  ImageBG: {
    flex: 1,
    position: "relative",
    width: "98%",
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 5,
    marginVertical: 8,
    zIndex: 2,
  },
  ImageBgText: {
    position: "absolute",
    alignSelf: "flex-start",
    marginTop: 4,
    top: 23,
    paddingLeft: 27,
    color: colors.white,
    fontSize: ScreenWidth * 0.035,
  },
  ImageBgBalance: {
    color: colors.white,
    fontSize: ScreenWidth * 0.06,
  },
  currencyBalBox: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "100%",
    // backgroundColor : "#454",
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  box1: {
    flex: 3,
    width: "100%",
    marginHorizontal: 3,
    // paddingVertical : 3,
    height: "auto",
    backgroundColor: colors.dropDowngray,
    borderRadius: 5,
    padding: 7,
    paddingHorizontal: 14
  },
  box1inside: {
    flex: 0.7,
    flexDirection: "row",
    // backgroundColor: "lightgreen",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  walletContent: {
    // flex: 0.5,
    flex: 1,
    paddingTop: 35,
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 25,
    justifyContent: "flex-start",
    width: "100%",
  },
  youReady: {
    color: colors.menuColor,
    fontFamily: "Lato",
    fontWeight: "700",
    fontStyle: "normal",
    height: "auto",
    fontSize: ScreenWidth * 0.067,
  },
  ButtonStyle: {
    // alignSelf: "center",
    width: "100%",
    paddingVertical: 5,
    backgroundColor: colors.pinkColor,
    color: "white",
  },
});
