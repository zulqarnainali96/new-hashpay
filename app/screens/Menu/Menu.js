import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { showDropdownfunc, show_Menu } from "../../redux/Actions/actions";
import colors from "../../utils/colors";
import { useDispatch } from "react-redux";
import WalletContainer from "../../redux/Containers/containers";
import krossApi from "../../utils/krossApi";
const wallet = require("../../../assets/images/wallet.png");
const NFT = require("../../../assets/images/Vector.png");
const Stacking = require("../../../assets/images/Vector-1.png");
const Setting = require("../../../assets/images/setting.png");
const Exit = require("../../../assets/images/exit.png");

const Col = ({ numRows, children }) => {
  return <View style={styles[`${numRows}col`]}>{children}</View>;
};
const Row = ({ children }) => <View style={styles.row}>{children}</View>;

const Menu = ({ walletState, walletActions, navigation }) => {
  
  useEffect(() => {
    krossApi.hashBalance(walletState.address,walletActions);
    krossApi.kusdBalance(walletState.address,walletActions);
    krossApi.kssBalance(walletState.address,walletActions);
  }, []);

  function Logout() {
    dispatch(show_Menu(false));
  }
  const dispatch = useDispatch();
  function ControlNavigation(route) {
    navigation.navigate(route);
  }
  useEffect(() => {
    dispatch(showDropdownfunc(false));
  }, []);
  return (
    <View style={styles.app}>
      <View style={{ justifyContent: "flex-start", marginTop: -40 }}>
        <Text
          style={{
            marginLeft: 20,
            fontFamily: "Roboto",
            fontSize: 22,
            fontWeight: "600",
          }}
        >
          Menu
        </Text>
        <View
          style={{ width: "100%", backgroundColor: colors.mneuLine, height: 1 }}
        />
      </View>
      <Row>
        <Col numRows={2}>
          <TouchableOpacity
            style={styles.menuStyle}
            onPress={() => ControlNavigation("mywallet")}
          >
            <Image source={wallet} style={styles.imageStyle} />
            <Text style={styles.textSetting}>Wallet</Text>
          </TouchableOpacity>
        </Col>
        <Col numRows={2}>
          <TouchableOpacity
            style={styles.menuStyle}
            onPress={() => ControlNavigation("nft")}
          >
            <Image source={NFT} style={styles.imageStyle} />
            <Text style={styles.textSetting}>My NFTs</Text>
          </TouchableOpacity>
        </Col>
        <Col numRows={2}>
          <TouchableOpacity
            style={styles.menuStyle}
            onPress={() => ControlNavigation("stacking")}
          >
            <Image source={Stacking} style={styles.imageStyle} />
            <Text style={styles.textSetting}>Staking</Text>
          </TouchableOpacity>
        </Col>
      </Row>
      <Row>
        <Col numRows={2}>
          <TouchableOpacity
            style={styles.menuStyle}
            onPress={() => ControlNavigation("referfriend")}
          >
            <Image source={wallet} style={styles.imageStyle} />
            <Text style={styles.textSetting}>Refer a Friend</Text>
          </TouchableOpacity>
        </Col>
        <Col numRows={2}>
          <TouchableOpacity
            style={styles.menuStyle}
            onPress={() => ControlNavigation("nickname")}
          >
            <Image source={wallet} style={styles.imageStyle} />
            <Text style={styles.textSetting}>Nickname</Text>
          </TouchableOpacity>
        </Col>
        <Col numRows={2}>
          <TouchableOpacity
            style={styles.menuStyle}
            onPress={() => ControlNavigation("profile")}
          >
            <Image source={wallet} style={styles.imageStyle} />
            <Text style={styles.textSetting}>Profile</Text>
          </TouchableOpacity>
        </Col>
      </Row>
      <Row>
        <Col numRows={2}>
          <TouchableOpacity
            style={styles.menuStyle}
            onPress={() => ControlNavigation("setting")}
          >
            <Image source={Setting} style={styles.imageStyle} />
            <Text style={styles.textSetting}>Setting</Text>
          </TouchableOpacity>
        </Col>
        <Col numRows={2}>
          <TouchableOpacity style={styles.menuStyle} onPress={Logout}>
            <Image source={Exit} style={{ width: 23, height: 24 }} />
            <Text style={styles.textSetting}>Exit</Text>
          </TouchableOpacity>
        </Col>
        <Col numRows={2}>
          <TouchableOpacity style={[styles.menuStyle, { display: "none" }]}>
            <Image source={Exit} style={{ width: 20, height: 18 }} />
            <Text style={styles.textSetting}>Exit</Text>
          </TouchableOpacity>
        </Col>
      </Row>
    </View>
  );
};

export default WalletContainer(Menu);

const styles = StyleSheet.create({
  app: {
    flex: 4, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    width: "100%",
    paddingTop: 90,
    // paddingLeft: 8,
  },
  row: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
  },
  menuStyle: {
    backgroundColor: colors.menuColor,
    marginHorizontal: 0,
    borderRadius: 10,
    width: 105,
    justifyContent: "center",
    alignItems: "center",
    height: 110,
  },
  "2col": {
    paddingVertical: 18,
    paddingHorizontal: 10,
    flex: 3,
  },
  textSetting: {
    textAlign: "center",
    color: colors.white,
    fontSize: 13,
    fontFamily: "Mulish",
    marginTop: 8,
  },
  imageStyle: { width: 26, height: 25 },
});
