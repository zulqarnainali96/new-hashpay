import {
  Image,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from "react-native";
import { Text as TextPaper } from "react-native-paper";
import colors from "../../../utils/colors";
import { TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import ApiConfig from "../../../api";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import krossApi from "../../../utils/krossApi";
const Hash = require("../../../../assets/images/hash.png");
const kusd = require("../../../../assets/images/kusd.png");
const kss = require("../../../../assets/images/kss.png");
const CopyImage = require("../../../../assets/images/image-5.png");

const MassTransferList = ({ data, address, mapID }) => {
  const [massTransferAlias, setMassTransferAlias] = useState([]);
  const [copiedText, setCopiedText] = useState("");

  const { timestamp, id, amount, fee, sender, recipient, assetId, transfers } =
    data;
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

  useEffect(() => {
    getMassAdress();
  }, []);
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

  return (
    <>
      <View
        key={mapID}
        style={{
          backgroundColor: colors.dropDowngray,
          marginVertical: 6,
          borderRadius: 10,
        }}
      >
        <View style={styles.transactionBox}>
          <Image
            resizeMode="contain"
            source={Case()}
            style={{ width: 29, marginHorizontal: 5 }}
          />
          <View style={{ width: 210, flex: 1, paddingHorizontal: 3 }}>
            {sender === address ? (
              <TextPaper
                style={{ fontWeight: "700", fontSize: 12, marginBottom: 3 }}
              >
                {data.transfers?.length && "Mass Transfer to:"}
              </TextPaper>
            ) : (
              <TextPaper style={{ fontWeight: "700", fontSize: 12 }}>
                Recieved Mass Transfer From :
              </TextPaper>
            )}
            {sender === address ? (
              <TextPaper
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                style={{ fontSize: 12, textAlign: "auto", width: "50%" }}
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
            ) : (
              <TextPaper
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                style={{ fontSize: 10, textAlign: "auto" }}
              >
                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Text style={{ fontSize: 10 }}>{sender.slice(0, 8)}</Text>
                  <TouchableOpacity
                    onPress={() => fetchCopiedText(sender)}
                  >
                    <Image
                      source={CopyImage}
                      style={{ width: 15, height: 16 }} 
                    />
                  </TouchableOpacity>
                </View>
              </TextPaper>
            )}

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
          {sender === address ? (
            <TextPaper
              style={{ fontWeight: "600", fontSize: 15, color: "red" }}
            >
              -{transfers?.map((t) => t.amount / 10 ** getAssetDecimal() + ",")}
            </TextPaper>
          ) : (
            <TextPaper
              style={{ fontWeight: "600", fontSize: 15, color: "#008000" }}
            >
              +{transfers?.map((t, i) => t.amount / 10 ** getAssetDecimal())}
            </TextPaper>
          )}
        </View>
        <TouchableOpacity
          style={{ marginLeft: 40, paddingVertical: 5 }}
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

export default MassTransferList;

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
