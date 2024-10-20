import * as React from "react";
import { Text, StyleSheet, Image, View, Pressable, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Padding,
  FontFamily,
  FontSize,
  Color,
  Border,
} from "../Styles/GlobalStyle";
import { TextInput as RNPTextInput } from "react-native-paper";
import chartLine from "../../../assets/images/chart-line.png";
import { Dimensions } from "react-native";

const Staking = () => {
  const height = Dimensions.get("window").height;

  return (
    <ScrollView
      contentContainerStyle={[styles.staking,{height:height - StatusBar.currentHeight}]}
      showsVerticalScrollIndicator={false}
    >
      <Pressable style={styles.frameParent}>
        <View style={[styles.stakeWrapper, styles.wrapperFlexBox]}>
          <Text style={[styles.stake, styles.stakeTypo]}>Stake</Text>
        </View>
        <View style={[styles.depositWrapper, styles.wrapperFlexBox]}>
          <Text style={[styles.deposit, styles.depositTypo]}>Deposit</Text>
        </View>
      </Pressable>
      <Text
        style={[styles.totalStaked0, styles.depositHashFlexBox]}
      >
        Total Staked: 0 HASH
      </Text>
      <View style={styles.frameGroup}>
        <View style={styles.frameContainer}>
          <View
            style={[styles.mdichartLineParent, styles.mdichartParentFlexBox]}
          >
            <Image
              style={styles.mdichartLineIcon}
              resizeMode="cover"
              source={chartLine}
            />
            <Text style={[styles.daily, styles.text1Clr]}>Daily</Text>
          </View>
          <View style={styles.parent}>
            <Text style={[styles.text1, styles.text1Clr]}>0.00</Text>
            <Text style={[styles.text2, styles.textTypo]}>0.014%</Text>
          </View>
        </View>
        <View style={[styles.frameContainer]}>
          <View
            style={[styles.mdichartLineParent, styles.mdichartParentFlexBox]}
          >
            <Image
              style={styles.mdichartLineIcon}
              resizeMode="cover"
              source={chartLine}
            />
            <Text style={[styles.daily, styles.text1Clr]}>Weekly</Text>
          </View>
          <View style={styles.parent}>
            <Text style={[styles.text1, styles.text1Clr]}>0.00</Text>
            <Text style={[styles.text2, styles.textTypo]}>0.097%</Text>
          </View>
        </View>
        <View style={[styles.frameContainer]}>
          <View
            style={[styles.mdichartLineParent, styles.mdichartParentFlexBox]}
          >
            <Image
              style={styles.mdichartLineIcon}
              resizeMode="cover"
              source={chartLine}
            />
            <Text style={[styles.daily, styles.text1Clr]}>Monthly</Text>
          </View>
          <View style={styles.parent}>
            <Text style={[styles.text1, styles.text1Clr]}>0.00</Text>
            <Text style={[styles.text2, styles.textTypo]}>0.416%</Text>
          </View>
        </View>
        <View style={[styles.frameContainer]}>
          <View
            style={[styles.mdichartLineParent, styles.mdichartParentFlexBox]}
          >
            <Image
              style={styles.mdichartLineIcon}
              resizeMode="cover"
              source={chartLine}
            />
            <Text style={[styles.daily, styles.text1Clr]}>Yearly</Text>
          </View>
          <View style={styles.parent}>
            <Text style={[styles.text1, styles.text1Clr]}>0.00</Text>
            <Text style={[styles.text8, styles.textTypo]}>5%</Text>
          </View>
        </View>
      </View>
      <Text
        style={[styles.stakeMinimumOf, styles.depositHashFlexBox]}
        numberOfLines={2}
      >
        Stake minimum of 10,000 HASH
      </Text>
      <View style={[styles.frameParentLayout]}>
        <Text style={styles.amountToDeposit}>Amount to Deposit</Text>
        <RNPTextInput
          style={[{...styles.frameChild,backgroundColor : '#fafafa'}, styles.frameLayout]}
          placeholder="Type something"
          mode="flat"
        />
      </View>
      <Pressable style={[styles.hashWrapperFlexBox]}>
        <Text style={[styles.depositHash, styles.depositHashFlexBox]}>
          Deposit HASH
        </Text>
      </Pressable>
      <View style={[styles.frameParentLayout]}>
        <Text style={styles.amountToDeposit}>Amount to Withdraw</Text>
        <RNPTextInput
          style={[{...styles.frameChild,backgroundColor : '#fafafa'}, styles.frameLayout]}
          placeholder="Type something"
          mode="flat"
        />
      </View>
      <Pressable style={[styles.hashWrapperFlexBox]}>
        <Text style={[styles.depositHash, styles.depositHashFlexBox]}>
          Withdraw HASH
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default Staking;

const styles = StyleSheet.create({
  staking: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  frameParent: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45,
    backgroundColor: Color.labelColorDarkPrimary,
    height: 44,
    flexDirection: "row",
    overflow: "hidden",
  },
  stakeWrapper: {
    backgroundColor: Color.hashgreedPink,
    paddingVertical: Padding.p_8xs,
    paddingHorizontal: Padding.p_xl,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    width: 140,
  },
  wrapperFlexBox: {
    paddingVertical: Padding.p_8xs,
    paddingHorizontal: Padding.p_xl,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  stake: {
    letterSpacing: -0.2,
    fontSize: FontSize.size_xs,
    lineHeight: 20,
    fontFamily: FontFamily.latoSemibold,
    textAlign: "center",
    color: Color.whitesmoke_200,
  },
  stakeTypo: {
    fontFamily: FontFamily.latoSemibold,
    fontWeight: "600",
  },
  depositWrapper: {
    backgroundColor: Color.hashgreedGrey,
    marginLeft: 1,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  wrapperFlexBox: {
    paddingVertical: Padding.p_8xs,
    paddingHorizontal: Padding.p_xl,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  deposit: {
    color: "#525151",
    textAlign: "center",
  },
  depositTypo: {
    fontFamily: FontFamily.latoRegular,
    letterSpacing: -0.2,
    fontSize: FontSize.size_xs,
    lineHeight: 20,
  },
  totalStaked0: {
    color: Color.black,
    alignSelf: "flex-start",
    marginTop: 24,
    marginBottom: 10,
    fontFamily: FontFamily.latoSemibold,
    fontWeight: "600",
    letterSpacing: -0.3,
    fontSize: FontSize.size_base,
  },
  depositHashFlexBox: {
    lineHeight: 30,
  },
  frameGroup: {
    width: "100%",
    flex: 0.2,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    borderRadius: Border.br_81xl,
    position: "relative",
  },
  frameContainer: {
    width: "24%",
    height: 85,
    borderColor: "#979a9e",
    borderStyle: "solid",
    backgroundColor: Color.whitesmoke_100,
    borderRadius: Border.br_9xs,
    borderWidth: 1,
    overflow: "hidden",
    paddingVertical: 5,
  },
  mdichartLineParent: {
    // position : "absolute"
    flexDirection: "row",
    justifyContent: "space-around",
  },
  mdichartLineIcon: {
    width: 12,
    height: 12,
    overflow: "hidden",
  },
  parent: {
    alignItems: "center",
    paddingVertical: 8,
  },
  stakeMinimumOf: {
    alignSelf: "flex-start",
    color: Color.black,
    fontFamily: FontFamily.latoSemibold,
    marginTop: 36,
    fontWeight: "600",
    fontSize: FontSize.size_xs,
  },
  depositHashFlexBox: {
    textAlign: "left",
    lineHeight: 30,
  },
  frameParentLayout: {
    width: "100%",
    marginTop: 0,
    height: 100,
    justifyContent: "center",
    // backgroundColor : '#ccc',
    borderRadius: Border.br_81xl,
  },
  amountToDeposit: {
    fontFamily: FontFamily.latoRegular,
    letterSpacing: -0.2,
    fontSize: FontSize.size_xs,
    lineHeight: 20,
    color: Color.gray_100,
  },
  frameLayout: {
    width: "100%",
    borderStyle: "solid",
    borderRadius: Border.br_9xs,
    height: 48,
    overflow: "hidden",
  },

  // Buttons

  hashWrapperFlexBox: {
    padding: Padding.p_8xs,
    width: 163,
    marginTop: 7,
    alignSelf: "flex-end",
    borderRadius: Border.br_5xs,
    backgroundColor: Color.hashgreedPink,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  depositHash: {
    fontSize: FontSize.size_sm,
    fontWeight: "700",
    fontFamily: FontFamily.latoBold,
    letterSpacing: -0.3,
    color: Color.labelColorDarkPrimary,
    lineHeight: 30,
  },
});
