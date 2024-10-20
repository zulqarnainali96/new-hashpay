import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
const arrow = require("../../../assets/images/arrow.png");
const profileLogout = require("../../../assets/images/profile-logout.png");
const profileAlert = require("../../../assets/images/profile-alert.png");
const question = require("../../../assets/images/quest.png");
import { TouchableNativeFeedback } from "react-native-gesture-handler";
// import LogoutModal from "../../components/Logout-modal";
import { useDispatch } from "react-redux";
import { show_Menu } from "../../redux/Actions/actions";
import colors from "../../utils/colors";

const Setting = ({ navigation }) => {
  const [logoutModalshow, setLogoutModalShow] = useState(false);
  const dispatch = useDispatch()

  function showProfileRoute(route) {
    navigation.navigate(route);
  }
  function LogoutUser() {
    dispatch(show_Menu(false))
  }
  function ModalShow() {
    setLogoutModalShow((prev) => !prev);
  }

  return (
    <View style={styles.Container}>
      <View style={styles.NavBox}>
        <View style={[styles.NavBox, { height: 47, width: "100%" }]}>
          <TouchableNativeFeedback
            onPress={() => showProfileRoute("about")}
            style={styles.boxNavSetting}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image source={profileAlert} style={{ width: 30, height: 30 }} />
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  fontSize: 15,
                }}
              >
                About app
              </Text>
            </View>
            <TouchableNativeFeedback>
              <Image source={arrow} style={{ width: 15, height: 24 }} />
            </TouchableNativeFeedback>
          </TouchableNativeFeedback>
        </View>
        <View style={[styles.NavBox, { height: 47, width: "100%" }]}>
          <TouchableNativeFeedback
            onPress={() => showProfileRoute("faq")}
            style={styles.boxNavSetting}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image source={question} style={{ width: 30, height: 30 }} />
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  fontSize: 15,
                }}
              >
                FAQ
              </Text>
            </View>
            <TouchableNativeFeedback>
              <Image source={arrow} style={{ width: 15, height: 24 }} />
            </TouchableNativeFeedback>
          </TouchableNativeFeedback>
        </View>
        <View style={[styles.NavBox, { height: 47, width: "100%" }]}>
          <TouchableNativeFeedback
            onPress={() => showProfileRoute("terms")}
            style={styles.boxNavSetting}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image source={question} style={{ width: 30, height: 30 }} />
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  fontSize: 15,
                }}
              >
                Terms and Conditions
              </Text>
            </View>
            <TouchableNativeFeedback>
              <Image source={arrow} style={{ width: 15, height: 24 }} />
            </TouchableNativeFeedback>
          </TouchableNativeFeedback>
        </View>
        <View style={[styles.NavBox, { height: 47, width: "100%" }]}>
          <TouchableNativeFeedback
            onPress={() => showProfileRoute("privacycookies")}
            style={styles.boxNavSetting}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image source={question} style={{ width: 30, height: 30 }} />
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  fontSize: 15,
                }}
              >
                Privacy and Cookies Policy
              </Text>
            </View>
            <TouchableNativeFeedback>
              <Image source={arrow} style={{ width: 15, height: 24 }} />
            </TouchableNativeFeedback>
          </TouchableNativeFeedback>
        </View>
        <View
          style={[styles.NavBox, { height: 47, width: "100%", borderWidth: 0 }]}
        >
          <View style={styles.boxNavSetting}>
            <TouchableNativeFeedback onPress={ModalShow}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
              >
                <Image source={profileLogout} style={{ width: 30, height: 30 }} />
                <Text
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "400",
                    fontSize: 15,
                  }}
                >
                  Logout
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Setting;

export const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.profileBgColor,
    flex: 1,
    width: "100%",
    paddingHorizontal: 14,
    alignItems: "center",
    position: "relative",
  },
  NavBox: {
    width: "97%",
    height: 320,
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.profileBox_color,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  boxNavSetting: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 3,
    alignItems: "center",
    justifyContent: "space-between",
  },
  fontStyle: {
    fontFamily: "Mulish",
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: 0.15,
    color: colors.aboutText_color,
  },
});
