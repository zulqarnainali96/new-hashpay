import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  LayoutAnimation,
  ToastAndroid
} from "react-native";
import React, { useState } from "react";
import colors from "../../utils/colors";
import { styles } from "../../screens/Nickname";
import * as Clipboard from "expo-clipboard";
import { Button } from "react-native-paper";
import ApiConfig from "../../api";
import * as Linking from "expo-linking";
import axios from "axios";

const copy = require("../../../assets/images/image-5.png");

const NftList = ({ item }) => {
  
  const width = Dimensions.get("window").width;
  const [showFull, setShowFull] = useState(false);
  const [creatorNFT, setcreatorNFT] = useState("");
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
    // console.log(text);
  };

  const getTx = async (txid) => {
    try {
      const result = await axios.get(
        `${ApiConfig.krossApi}/transactions/info/${txid}`
      );
      return result.data;
    } catch (e) {
      return {err:e};
    }
  };

  const viewMore = async (txid) => {
    if(!showFull){
      const tx = await getTx(txid);
      setcreatorNFT(tx.sender);
      // console.log(tx);
    }

    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.linear,
      },
    });
    setShowFull((prev) => !prev);
  };

  return (
    <View
      style={{
        backgroundColor: colors.nftSearch_input_bg,
        width: "100%",
        overflow: "hidden",
        height: showFull ? "auto" : 183,
        padding: 13,
        borderRadius: 17,
        marginVertical: 6,
      }}
    >
      <View style={{ flexDirection: "row", gap: 15 }}>
        <Text>{item.name}</Text>
        <TouchableOpacity onPress={() => fetchCopiedText(item.name)}>
          <Image
            source={copy}
            style={{ width: 14, height: 16, marginTop: 6 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10, gap: 10, width: "100%" }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>ID</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 0,
            width: "100%",
          }}
        >
          {!showFull ? (
            <Text
              style={{
                fontWeight: "400",
                fontSize: 14,
                width: "90%",
              }}
            >
              {item.assetId}
            </Text>
          ) : (
            <TouchableOpacity style={{ width: "90%" }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 14,
                  color: colors.menuColor,
                  width: "90%",
                  textDecorationLine: "underline",
                }}
                numberOfLines={2}
              >
                {item.assetId}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={{ width: "100%" }} onPress={() => fetchCopiedText(item.assetId)}>
            <Image
              source={copy}
              style={{ width: 14, height: 16, marginTop: 3 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showFull ? (
        <>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <Text
              style={{
                paddingVertical: 8,
                fontWeight: "500",
                fontSize: 15,
              }}
            >
              Description
            </Text>
            <TouchableOpacity onPress={() => fetchCopiedText(item.description)}>
              <Image
                source={copy}
                style={{ width: 14, height: 16, marginTop: 12 }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{ width: "100%", marginVertical: 5, paddingVertical: 7 }}
          >
            <Text
              style={{
                color: colors.nft_description_text_color,
                fontWeight: "400",
                lineHeight: 19.5,
                fontSize: 12,
                textAlign: "left",
              }}
            >
              {item.description}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 14 }}>
            <Text
              style={{
                paddingVertical: 8,
                fontWeight: "500",
                fontSize: 15,
              }}
            >
              Txid
            </Text>
            <TouchableOpacity onPress={() => fetchCopiedText(item.originTransactionId)}>
              <Image
                source={copy}
                style={{ width: 14, height: 16, marginTop: 11 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
          onPress={() => {
            Linking.openURL(`${ApiConfig.EXPLORER_URL}/tx/${item.originTransactionId}`);
          }}
        >
            <Text
              style={{
                paddingVertical: 8,
                fontWeight: "400",
                fontSize: 12,
              }}
            >
              {item.originTransactionId}
            </Text>
          </TouchableOpacity>

          {/* <View
            style={{
              height: 1,
              backgroundColor: "rgba(0, 4, 81, 0.4)",
              marginVertical: 8,
            }}
          /> */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Text
              style={{
                paddingVertical: 8,
                fontWeight: "500",
                fontSize: 15,
              }}
            >
              Creator
            </Text>
            <TouchableOpacity onPress={() => fetchCopiedText(creatorNFT)}>
              <Image
                source={copy}
                style={{ width: 14, height: 16, marginTop: 11 }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              paddingVertical: 8,
              fontWeight: "400",
              fontSize: 12,
            }}
          >
            {creatorNFT}
          </Text>

          <View style={{ flexDirection: "row", gap: 13 }}>
            <Text
              style={{
                paddingVertical: 8,
                fontWeight: "500",
                fontSize: 15,
              }}
            >
              Issuer
            </Text>
            <TouchableOpacity onPress={() => fetchCopiedText(item.issuer)}>
              <Image
                source={copy}
                style={{ width: 14, height: 16, marginTop: 11 }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              paddingVertical: 8,
              fontWeight: "400",
              fontSize: 12,
            }}
          >
            {item.issuer}
          </Text>

          <View style={{ flexDirection: "row", gap: 13 }}>
            <Text
              style={{
                paddingVertical: 8,
                fontWeight: "500",
                fontSize: 15,
              }}
            >
              Issued At
            </Text>
            <TouchableOpacity onPress={() => fetchCopiedText(item.issueTimestamp)}>
              <Image
                source={copy}
                style={{ width: 14, height: 16, marginTop: 11 }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              paddingVertical: 8,
              fontWeight: "400",
              fontSize: 12,
            }}
          >
            {(new Date(item.issueTimestamp)).toDateString()}
          </Text>
        </>
      ) : null}
      <TouchableOpacity
        style={[styles.btnContainer, { width: "100%" }]}
        onPress={()=>viewMore(item.originTransactionId)}
      >
        <Button style={[styles.btn, { paddingVertical: 3 }]} mode="contained">
          <Text
            style={{
              fontWeight: "600",
              lineHeight: 18,
            }}
          >
            {showFull ? "Show less" : "View more"}
          </Text>
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default NftList;
