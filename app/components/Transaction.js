import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { Text as TextPaper } from "react-native-paper";
import React, { useState } from "react";
import colors from "../utils/colors";
import { TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import ApiConfig from "../api";
import krossApi from "../utils/krossApi";
import * as Clipboard from "expo-clipboard";
import { useEffect } from "react";
import { ToastAndroid } from "react-native";
const Hash = require("../../assets/images/hash.png");
const kusd = require("../../assets/images/kusd.png");
const kss = require("../../assets/images/kss.png");
const CopyImage = require("../../assets/images/image-5.png");

// const { width: screenWidth } = Dimensions.get("window");

const Transaction = ({ data, address, mapId, nickname }) => {
  const [recipientAlias, setUserAlias] = useState("");
  const [senderAlias, setSenderAlias] = useState("");
  const [massTransferAlias, setMassTransferAlias] = useState([]);
  const [copiedText, setCopiedText] = useState("");

  const { timestamp, id, amount, fee, sender, recipient, assetId } = data;

  // console.log(data);
  async function getMassAdress() {
    try {
      if (data.transfers?.length) {
        for (let i = 0; i < data.transfers.length; i++) {
          const transfer = data.transfers[i];
          const address = data.transfers[i].recipient;
          // Check if the address has an alias
          const alias = await krossApi.getAliasByAddress(address);
          if (!alias == "") {
            // Update the recipient property with the alias
            transfer.recipient = alias;
            setMassTransferAlias({
              recipient: transfer.recipient,
              amount: transfer.amount,
            });
          }
          setMassTransferAlias({
            recipient: transfer.recipient,
            amount: transfer.amount,
          });
        }
        // Loop through each transfer in the transfers array
      }
    } catch (error) {
      alert(e.message);
    }
  }

  function getAssetDecimal() {
    switch (assetId) {
      case ApiConfig.hashAssetID:
        return ApiConfig.HASH_Decimals;
      case ApiConfig.kusdAssetID:
        return ApiConfig.KUSHD_Decimals;
      default:
        return 8;
    }
  }

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

  const getAliasforRecipient = async () => {
    const alias = await krossApi.getAliasByAddress(recipient);
    if (alias == "") return "";
    if (alias) {
      setUserAlias(alias.slice(8, alias.length));
    }
    else {
     setUserAlias(recipient) 
    }
    return "";
  };
  const getAliasforSender = async () => {
    const alias = await krossApi.getAliasByAddress(sender);
    if (alias == "") return "";
    if (alias) {
      setSenderAlias(alias.slice(8, alias.length));
    }
    else {
      setSenderAlias(sender)
    }
    return "";
  };

  useEffect(() => {
    getAliasforRecipient();
    getAliasforSender();
    // AliasForMassTransfer();
    getMassAdress();
  }, []);
  
  function getReceiveMassTransferAmount() {
    let amount;
    if (sender !== address && data.hasOwnProperty("transfers")) {
      let filterAmountAccordingAddress = data.transfers?.filter((item) => {
        return item.recipient === address || item.recipient === nickname;
      });
      amount = filterAmountAccordingAddress.reduce((acc, amount) => {
        return acc + amount.amount;
      });
      return {
        amount: amount.amount / 10 ** getAssetDecimal(),
        recipient: sender?.length > 32 ? sender
            : sender.slice(8, sender?.length),
      };
    }
  }

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  const date = new Date(timestamp);
  const dateFormat = date.toLocaleString("en-US", options);
  function Case() {
    switch (assetId) {
      case ApiConfig.hashAssetID:
        return Hash;
      case ApiConfig.kusdAssetID:
        return kusd;
      case assetId:
        return kss;
    }
  }

  return (
    <>
      <View
        key={mapId}
        style={{
          backgroundColor: colors.dropDowngray,
          marginVertical: 6,
          borderRadius: 10,
        }}
      >
        <View key={id} style={styles.transactionBox}>
          <Image
            resizeMode="contain"
            source={Case()}
            style={{ width: 29, marginHorizontal: 5 }}
          />
          <View style={{ width: 210, flex: 1, paddingHorizontal: 3 }}>
            {sender === address && !data.hasOwnProperty("transfers") ? (
              <TextPaper
                style={{ fontWeight: "700", fontSize: 12, marginBottom: 3 }}
              >
                Transfer To:
              </TextPaper>
            ) : null}
            {sender !== address && !data.hasOwnProperty("transfers") ? (
              <TextPaper
                style={{ fontWeight: "700", fontSize: 12, marginBottom: 3 }}
              >
                Recieved From:
              </TextPaper>
            ) : null}
            {sender === address && data.hasOwnProperty("transfers") ? (
              <TextPaper
                style={{ fontWeight: "700", fontSize: 12, marginBottom: 3 }}
              >
                Mass Transfer to:
              </TextPaper>
            ) : null}

            {sender !== address && data.hasOwnProperty("transfers") ? (
              <TextPaper style={{ fontWeight: "700", fontSize: 12 }}>
                Recieved From :
              </TextPaper>
            ) : null}

            {/* ADD  */}

            {sender === address && !data.hasOwnProperty("transfers") ? (
              <TextPaper
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                style={{ fontSize: 10, width: "100%" }}
              >
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Text style={{ fontSize: 10 }}>{recipientAlias.length > 32 ? recipientAlias.slice(0,8) : recipientAlias}</Text>
                  <TouchableOpacity onPress={() => fetchCopiedText(recipientAlias)}>
                    <Image
                      source={CopyImage}
                      style={{ width: 15, height: 16 }}
                    />
                  </TouchableOpacity>
                </View>
              </TextPaper>
            ) : null}

            {sender !== address && !data.hasOwnProperty("transfers") ? (
              <TextPaper
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                style={{ fontSize: 10, width: "100%" }}
              >
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Text style={{ fontSize: 10 }}>{senderAlias.length > 32 ? senderAlias.slice(0,8) : senderAlias}</Text>
                  <TouchableOpacity onPress={() => fetchCopiedText(senderAlias)}>
                    <Image
                      source={CopyImage}
                      style={{ width: 15, height: 16 }}
                    />
                  </TouchableOpacity>
                </View>
              </TextPaper>
            ) : null}

            {/* Mass Transfers */}

            {sender === address && data.hasOwnProperty("transfers") ? (
              <TextPaper
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                style={{ fontSize: 10, width: "50%" }}
              >
                {data.transfers?.length
                  ? data.transfers.map((list, i) => (
                      <View key={i} style={{ flexDirection: "row", gap: 6 }}>
                        <Text style={{ fontSize: 10 }}>
                          {list.recipient.length > 33
                            ? list.recipient.slice(0, 8)
                            : list.recipient.slice(8, list.recipient.length)}
                        </Text>
                        <TouchableOpacity
                          onPress={() => fetchCopiedText(list.recipient)}
                        >
                          <Image
                            source={CopyImage}
                            style={{ width: 15, height: 16 }}
                          />
                        </TouchableOpacity>
                      </View>
                    ))
                  : null}
              </TextPaper>
            ) : null}

            {/* Mass Receive */}

            {sender !== address && data.hasOwnProperty("transfers") ? (
              <TextPaper
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                style={{ fontSize: 10, width: "50%" }}
              >
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Text style={{ fontSize: 10 }}>
                    {getReceiveMassTransferAmount().recipient.slice(0,8)}
                  </Text>
                  <TouchableOpacity onPress={() => fetchCopiedText(getReceiveMassTransferAmount().recipient)}>
                    <Image
                      source={CopyImage}
                      style={{ width: 15, height: 16 }}
                    />
                  </TouchableOpacity>
                </View>
              </TextPaper>
            ) : null}

            {/* {data.transfers?.length
                  ? data.transfers.map((list, i) => (
                      <View key={i} style={{ flexDirection: "row", gap: 6 }}>
                        <Text style={{ fontSize: 10 }}>
                          {list.recipient.length > 33
                            ? list.recipient.slice(0, 8)
                            : list.recipient.slice(8, list.recipient.length)}
                        </Text>
                        <TouchableOpacity
                          onPress={() => fetchCopiedText(list.recipient)}
                        >
                          <Image
                            source={CopyImage}
                            style={{ width: 15, height: 16 }}
                          />
                        </TouchableOpacity>
                      </View>
                    ))
                  : null} */}
            {/* 
                {data.transfers?.length && sender === address ? null : recipientAlias.length ? (
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <Text style={{ fontSize: 10 }}>{recipientAlias}</Text>
                    <TouchableOpacity
                      onPress={() => fetchCopiedText(recipientAlias)}
                    >
                      <Image
                        source={CopyImage}
                        style={{ width: 15, height: 13 }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    <Text style={{ fontSize: 10 }}>
                      {recipient.slice(0, 8)}
                    </Text>
                    <TouchableOpacity
                      onPress={() => fetchCopiedText(recipient)}
                    >
                      <Image
                        style={{ width: 15, height: 13 }}
                        source={CopyImage}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </TextPaper>
            ) : sender !== address && data.transfers?.length ? (
              <TextPaper
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                style={{ fontSize: 10, textAlign: "auto" }}
              > */}

            <View style={styles.marginSet} />
            <TextPaper style={{ fontWeight: "700", fontSize: 12 }}>
              Txid
            </TextPaper>
            <TextPaper
              adjustsFontSizeToFit={true}
              allowFontScaling={true}
              style={{ fontSize: 10, textAlign: "auto" }}
            >
              <View style={{ flexDirection: "row", gap: 6 }}>
                <Text style={{ fontSize: 10 }}>{id.slice(0, 8)}</Text>
                <TouchableOpacity onPress={() => fetchCopiedText(id)}>
                  <Image style={{ width: 15, height: 13 }} source={CopyImage} />
                </TouchableOpacity>
              </View>
            </TextPaper>
            <View style={styles.marginSet} />
            <TextPaper
              adjustsFontSizeToFit={true}
              allowFontScaling={true}
              style={{ fontSize: 10, textAlign: "auto" }}
            >
              {dateFormat}
            </TextPaper>
          </View>

          {/* Transfer to Amount  */}

          {sender === address && !data.hasOwnProperty("transfers") ? (
            <TextPaper
              style={{ fontWeight: "600", fontSize: 15, color: "red" }}
            >
              -{amount / 10 ** getAssetDecimal()}
            </TextPaper>
          ) : null}

          {/* Receive to Amount  */}

          {sender !== address && !data.hasOwnProperty("transfers") ? (
            <TextPaper
              style={{ fontWeight: "600", fontSize: 15, color: "green" }}
            >
              +{amount / 10 ** getAssetDecimal()}
            </TextPaper>
          ) : null}

          {/* Mass Transfers to Amount  */}

          {sender === address && data.hasOwnProperty("transfers") ? (
            <TextPaper
              style={{ fontWeight: "600", fontSize: 15, color: "red" }}
            >
              -
              {data.transfers?.length &&
                data.transfers?.map((t) => t.amount / 10 ** getAssetDecimal() + ",")}
            </TextPaper>
          ) : null}

          {/* Received Mass Transfers to Amount  */}

          {sender !== address && data.hasOwnProperty("transfers") ? (
            <TextPaper
              style={{ fontWeight: "600", fontSize: 15, color: "green" }}
            >
              +{getReceiveMassTransferAmount().amount}
            </TextPaper>
          ) : null}
        </View>
        <TouchableOpacity
          style={{ marginLeft: 40, paddingVertical: 2 }}
          onPress={() => {
            Linking.openURL(`https://krossexplorer.com/tx/${id}`);
          }}
        >
          <TextPaper
            style={{
              fontSize: 12,
              textDecorationLine: "underline",
              fontWeight: "700",
              marginHorizontal: 10,
            }}
          >
            View on Explorer
          </TextPaper>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  transactionBox: {
    // flex: 1,
    // backgroundColor: colors.dropDowngray,
    width: "98%",
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  marginSet: {
    marginVertical: 2,
  },
});
