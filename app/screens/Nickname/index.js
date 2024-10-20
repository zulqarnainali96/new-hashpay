import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import { Surface, Button } from "react-native-paper";
import React, { useEffect, useState } from "react";
import colors from "../../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import WalletContainer from "../../redux/Containers/containers";
import axios from "axios";
import { ProviderSeed } from "@waves/provider-seed";
import { Signer } from "@waves/signer";
import ApiConfig from "../../api";

const Nickname = ({ walletState, walletActions }) => {
  const width = Dimensions.get("window").width;
  const [nickName, setNickName] = useState("");
  const [nickNameSet, setNickNameSet] = useState("");
  const [hasNickname, setHasNickname] = useState(false);
  // const nicknameRegex = /[@\.\-_]+/

  const handleNickName = async () => {
    setNickName(nickName.toLowerCase());
    walletActions.loading(true);
    if (nickName == "") {
      alert("Please enter a nickname");
      walletActions.loading(false)
      return;
    }
    // if(nickName){
    //   alert ('Nickname must contain at least one of the symbols @, ., -, or _')
    //   walletActions.loading(false)
    //   return
    // }
    try {
      const signer = new Signer({ NODE_URL: ApiConfig.krossApi });
      const provider = new ProviderSeed(walletState.seed);
      signer.setProvider(provider);
      const user = await signer.login();
      const data = {
        alias: nickName,
      };
      // console.log(data);
      const [tx] = await signer.alias(data).broadcast();
      // console.log(tx);
      alert("Alias Created ");
      walletActions.loading(false);
      getNickname();
    } catch (err) {
      console.log(err);
      alert(err.message);
      walletActions.loading(false);
    }
  };
  const getNickname = async () => {
    const data = await axios(
      `https://nodes.krossexplorer.com/alias/by-address/${walletState.address}`
    );
    // console.log(await data.data);
    if ((await data.data.length) > 0) {
      setHasNickname(true);
      const alias = await data.data[0];
      setNickNameSet(await alias);
    }
  };
  useEffect(() => {
    getNickname();
  }, [hasNickname]);

  return (
    <View style={styles.Container}>
      <View style={styles.mainBox}>
        <Text
          style={{
            textAlign: "center",
            lineHeight: 20,
            marginTop: 20,
            fontSize: 18,
            fontWeight: "400",
            color: "#000",
          }}
        >
          Your Nickname:{" "}
          {hasNickname ? (
            <Text
              style={{ fontWeight: "600", fontFamily: "Inter", fontSize: 18 }}
            >
              {nickNameSet.slice(8,nickNameSet.length)}
            </Text>
          ) : (
            "Not Set"
          )}
        </Text>
        <Text
          style={{
            fontSize: 17,
            lineHeight: 17,
            fontWeight: 300,
            color: colors.black,
          }}
        >
          Enter a new nickname
        </Text>
        <Surface style={{ width: "100%", borderRadius: 13 }} elevation={3}>
          <TextInput
            style={styles.textInput}
            value={nickName}
            onChangeText={(value) => setNickName(value)}
          />
        </Surface>
        <Text
          style={{
            textAlign: "center",
            paddingHorizontal: 51,
            lineHeight: 20,
            marginTop: 20,
            fontWeight: "400",
            color: "rgba(72, 71, 71, 1)",
          }}
        >
          Please use ONLY small letters. Your nickname should be between 4 to 30 characters long and can include letters, numbers and any one or more of these four symbols(@ _ . - )
        </Text>
        <TouchableOpacity style={[styles.btnContainer, { width: width }]}>
          <Button
            style={styles.btn}
            mode="contained"
            loading={walletState.loader}
            onPress={handleNickName}
          >
            <Text style={{ fontWeight: "600", lineHeight: 18, color : '#fff' }}>Create</Text>
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WalletContainer(Nickname);

export const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.profileBgColor,
    flex: 1,
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 18,
    alignItems: "center",
  },
  mainBox: {
    height: 400,
    width: "100%",
    marginTop: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 18,
  },
  textInput: {
    width: "100%",
    backgroundColor: "#F8F8F8",
    borderColor: "#F8F8F9",
    borderWidth: 1,
    borderRadius: 13,
    height: 60,
    paddingHorizontal: 12,
    fontSize: 17,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btn: {
    width: 200,
    backgroundColor: colors.nickname_button_color,
    justifyContent: "center",
    padding: 6,
    borderRadius: 100,
  },
  loadItems: {
    marginVertical: 16,
    alignItems: "center",
  },
});
