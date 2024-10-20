import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../Nickname";
import { Surface } from "react-native-paper";
import WalletContainer from "../../../redux/Containers/containers";
import colors from "../../../utils/colors";
import * as Clipboard from "expo-clipboard";
import { ToastAndroid } from "react-native";
import { useState } from "react";

const WalletCredentials = ({ walletState, navigation }) => {
  const { seed, address, publicKey, encodedSeed } = walletState.userData[0];
  const { height } = Dimensions.get("window");
  const [copiedText, setCopiedText] = useState("");

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
  let copyObj = {
    seed: seed,
    address: address,
    publicKey: publicKey,
    encodedSeed: encodedSeed,
  };
  copyObj = JSON.stringify(copyObj);
  // console.log(copyObj);
  return (
    <ScrollView
      contentContainerStyle={[styles.Container, { height: "auto", flex: 0 }]}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{ alignSelf: "flex-start", paddingLeft: 5, marginVertical: 10 }}
      >
        <Text selectable={true} style={walletStyle.textStyle}>
          Seed
        </Text>
      </View>
      <Surface style={walletStyle.walletBox} elevation={1}>
        <Text
          selectable={true}
          style={[walletStyle.centerText, walletStyle.seeStyle]}
        >
          {seed}
        </Text>
      </Surface>
      <View style={{ marginVertical: 8 }} />
      <View
        style={{ alignSelf: "flex-start", paddingLeft: 5, marginVertical: 10 }}
      >
        <Text style={walletStyle.textStyle}>Encoded Seed</Text>
      </View>
      <Surface style={walletStyle.walletBox} elevation={1}>
        <Text
          selectable={true}
          style={[walletStyle.centerText, walletStyle.seeStyle]}
        >
          {encodedSeed}
        </Text>
      </Surface>
      <View style={{ marginVertical: 8 }} />
      <View
        style={{ alignSelf: "flex-start", paddingLeft: 5, marginVertical: 10 }}
      >
        <Text style={walletStyle.textStyle}>Public Key</Text>
      </View>
      <Surface style={walletStyle.walletBox} elevation={1}>
        <Text
          selectable={true}
          style={[walletStyle.centerText, walletStyle.seeStyle]}
        >
          {publicKey}
        </Text>
      </Surface>
      <View style={{ marginVertical: 8 }} />
      <View
        style={{ alignSelf: "flex-start", paddingLeft: 5, marginVertical: 10 }}
      >
        <Text style={walletStyle.textStyle}>Address</Text>
      </View>
      <Surface style={walletStyle.walletBox} elevation={1}>
        <Text
          selectable={true}
          style={[walletStyle.centerText, walletStyle.seeStyle]}
        >
          {address}
        </Text>
      </Surface>
      <View style={{ marginVertical: 8 }} />
      <View
        style={{
          height: 100,
          width: "100%",
          flexDirection: "row",
          gap: 18,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={[
            walletStyle.copyButton,
            { borderWidth: 0, paddingVertical: 12 },
          ]}
        >
          <Text
            style={walletStyle.copyTextColor}
            onPress={() => fetchCopiedText(copyObj)}
          >
            Copy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[walletStyle.copyButton, { backgroundColor: "white" }]}
        >
          <Text style={walletStyle.copyTextColor}>Close</Text>
        </TouchableOpacity>
      </View>
      <Text style={walletStyle.copyTextColor}>support@krosscoin.io</Text>
    </ScrollView>
  );
};

const walletStyle = StyleSheet.create({
  walletBox: {
    width: "100%",
    borderRadius: 13,
    borderColor: "#A4A4A4",
    height: 100,
    backgroundColor : '#ccc'
  },
  textStyle: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  centerText: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify",
  },
  seeStyle: {
    fontFamily: "Roboto",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 24.2,
    letterSpacing: 0.5,
    color: colors.black,
  },
  copyButton: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#DAD8DC",
    paddingHorizontal: 16,
    borderColor: "#000000",
    borderRadius: 7,
  },
  copyTextColor: {
    color: colors.black,
    fontFamily: "Inter",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 16,
  },
});
export default WalletContainer(WalletCredentials);
