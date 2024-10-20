import {
  View,
  Text,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { styles } from "../Nickname";
import colors from "../../utils/colors";
import WalletContainer from "../../redux/Containers/containers";
import NftList from "../../components/nftList";
const searchImage = require("../../../assets/images/search.png");
import nftList from "./data";
import ApiConfig from "../../api";
import axios from "axios";
import { FlashList } from "@shopify/flash-list";

const NFTs = ({ walletState }) => {
  const [search, setSearch] = useState("");
  const [nftlist, setNFTList] = useState([]);
  const [lastId, setLastId] = useState();

  const getNfts = () => {
    axios
      .get(`${ApiConfig.krossApi}/assets/nft/${walletState.address}/limit/1000`)
      .then((res) => {
        setNFTList(res.data);
      });
  };

  useEffect(() => {
    getNfts();
  }, [lastId]);

  const FilterData = useMemo(() => {
    return nftlist.filter((item) =>
      item?.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  }, [search]);

  const renderItem = ({ item }) => {
    return <NftList item={item} />;
  };

  const renderLoader = () => {
    return (
      <View style={styles.loadItems}>
        <Text>You Came to the end...</Text>
      </View>
    );
  };

  const loadMoreItems = () => {
    setLastId(nftList[nftList?.length - 1]?.assetId);
  };

  return (
    <View
      style={[
        styles.Container,
        { backgroundColor: "#ccc", paddingVertical: 5 },
      ]}
    >
      <View style={{ alignSelf: "flex-start", width: "100%", height: "100%" }}>
        <Text
          style={{
            fontSize: 15,
            letterSpacing: 0.5,
            fontWeight: "600",
          }}
        >
          NFT Listing
        </Text>
        <View
          style={{ marginTop: 8, paddingVertical: 10, position: "relative" }}
        >
          <TextInput
            mode="outlined"
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            style={[
              styles.textInput,
              {
                backgroundColor: colors.nftSearch_input_bg,
                borderRadius: 20,
                borderColor: "#fffa",
                paddingHorizontal: 60,
                height: 50,
              },
            ]}
          />
          <Image
            source={searchImage}
            style={{ position: "absolute", top: "53%", left: "6%" }}
          />
          <Text
            style={{
              position: "absolute",
              top: "53%",
              right: "6%",
              fontSize: 14,
            }}
          >
            {FilterData & (FilterData.length > 0)
              ? FilterData.length
              : nftlist.length}
            : results
          </Text>
        </View>
        <FlashList
          renderItem={renderItem}
          data={FilterData && FilterData.length > 0 ? FilterData : nftlist}
          keyExtractor={(item) => item.assetId}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0}
          estimatedItemSize={1000}
        />
      </View>
    </View>
  );
};

export default WalletContainer(NFTs);
