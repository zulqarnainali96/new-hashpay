import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "../Menu/Menu";
import colors from "../../utils/colors";
import { getHeaderTitle } from "@react-navigation/elements";
import MyWallet from "../My-Wallet/MyWallet";
import NFTs from "../NFTs";
import WalletDropDown from "../../components/my-wallet-drop-down";
import SendFunds from "../My-Wallet/SendFunds";
import ReceiveFunds from "../My-Wallet/RecieveFunds";
import MassFunds from "../My-Wallet/MassFunds";
import Staking from "../Staking";
import Nickname from "../Nickname";
import Profile from "../Profile";
import Setting from "../setting";
import ReferFriend from "../ReferFriend";
import About from "../setting/About";
import FAQ from "../setting/FAQ";
import TermsConditions from "../setting/Terms-and-Conditons";
import { useDispatch, useSelector } from "react-redux";
import { showDropdownfunc } from "../../redux/Actions/actions";
import PrivacyPolicy from "../setting/Privacy-and-Cookie-Policy";
// import MainScreen from "../Profile/mainScreen";
import WalletCredentials from "../Profile/Wallet-Credentials";
import EditProfile from "../EditProfile";
const ArrowIcon = require("../../../assets/images/arrow.png");
const dotIcon = require("../../../assets/images/doticon.png");
const profileIcon = require("../../../assets/images/profile-icons.png");

const Stack = createStackNavigator();

const MyHeader = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name);
  const dispatch = useDispatch();
  const showDropdown = useSelector((state) => state.Authreducer.showDropdown);
  return (
    <>
      {route.name === "menu" ? null : route.name === "setting" ||
        route.name === "about" ||
        route.name === "faq" ||
        route.name === "edit-profile" ||
        route.name === "wallet-credent" ||
        route.name === "terms" ||
        route.name === "privacycookies" ||
        route.name === "profile" ? (
        <View
          style={[
            options.headerStyle,
            {
              backgroundColor: colors.profileBgColor,
              padding: 10,
              height: 80,
              justifyContent: "flex-start",
              borderBottomWidth: 1,
              borderBottomColor: colors.profileBorderBcolor,
            },
          ]}
        >
          <TouchableOpacity
            onPress={back ? () => navigation.goBack() : undefined}
          >
            <Image source={profileIcon} style={{ width: 56, height: 56 }} />
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 40 }}>
            <Text style={{ fontSize: 18, fontFamily: "Roboto" }}>{title}</Text>
          </View>
        </View>
      ) : (
        <View style={options.headerStyle}>
          <TouchableOpacity
            onPress={back ? () => navigation.goBack() : undefined}
          >
            <Image source={ArrowIcon} style={{ width: 18, height: 20 }} />
          </TouchableOpacity>
          <Text style={{ color: colors.white, fontSize: 18 }}>{title}</Text>
          <TouchableOpacity
            style={{ padding: 6 }}
            onPress={() => dispatch(showDropdownfunc(!showDropdown))}
          >
            <Image
              source={dotIcon}
              style={{
                width: 5,
                height: 20,
                display: route.name === "mywallet" ? "flex" : "none",
              }}
            />
          </TouchableOpacity>
          {showDropdown && route.name === "mywallet" ? (
            <WalletDropDown navigation={navigation} />
          ) : null}
        </View>
      )}
    </>
  );
};
const MenuContainer = () => {
  const [setting, setSetting] = useState("");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <Stack.Navigator
        initialRouteName="menu"
        screenOptions={{
          headerShown: true,
          header: (props) => <MyHeader {...props} />,
          headerStyle: {
            height: 60,
            width: "100%",
            backgroundColor: colors.menuColor,
            justifyContent: "space-between",
            paddingHorizontal: 30,
            alignItems: "center",
            flexDirection: "row",
          },
        }}
      >
        <Stack.Screen
          component={Menu}
          name="menu"
          options={{ title: "Menu" }}
        />
        <Stack.Screen
          component={MyWallet}
          name="mywallet"
          options={{ title: "My Wallet" }}
        />
        <Stack.Screen component={NFTs} name="nft" options={{ title: "NFT" }} />
        <Stack.Screen
          component={SendFunds}
          name="send-funds"
          options={{ title: "Send Funds" }}
        />
        <Stack.Screen
          component={ReceiveFunds}
          name="receive-funds"
          options={{ title: "Receive Funds" }}
        />
        <Stack.Screen
          component={MassFunds}
          name="mass-funds"
          options={{ title: "Mass Transfer" }}
        />
        <Stack.Screen
          component={ReferFriend}
          name="referfriend"
          options={{ title: "Refer Friend" }}
        />
        <Stack.Screen
          component={Staking}
          name="stacking"
          options={{ title: "Staking" }}
        />
        <Stack.Screen
          component={Nickname}
          name="nickname"
          options={{ title: "Nick name" }}
        />
        <Stack.Screen
          component={Profile}
          name="profile"
          options={{ title: "Profile" }}
        />
        {/* <Stack.Screen
          component={MainScreen}
          name="profile"
          options={{ title: "Profile" }}
        /> */}
        <Stack.Screen
          component={Setting}
          name="setting"
          options={{ title: "Setting" }}
        />
        <Stack.Screen
          component={About}
          name="about"
          options={{ title: "About" }}
        />
        <Stack.Screen component={FAQ} name="faq" options={{ title: "FAQ" }} />
        <Stack.Screen
          component={TermsConditions}
          name="terms"
          options={{ title: "Terms and Conditions" }}
        />
        <Stack.Screen
          component={PrivacyPolicy}
          name="privacycookies"
          options={{ title: "Privacy and Cookie Policy" }}
        />
        <Stack.Screen
          component={WalletCredentials}
          name="wallet-credent"
          options={{ title: "Wallet Credentials" }}
        />
        <Stack.Screen
          component={EditProfile}
          name="edit-profile"
          options={{ title: "Edit Profile" }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default MenuContainer;

const styles = StyleSheet.create({});
