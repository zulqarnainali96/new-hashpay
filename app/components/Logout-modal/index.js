import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { Button, Text as TextPaper } from "react-native-paper";
import { TouchableNativeFeedback } from "react-native";
import colors from "../../utils/colors";

const { height, width } = Dimensions.get("window");

const LogoutModal = ({ logout, setLogoutModalShow }) => {
  return (
    <View style={styles.LogoutModal}>
      <View style={styles.LogoutBox}>
        <View style={styles.LogoutContent}>
          <TextPaper
            style={{
              fontFamily: "Inter",
              fontWeight: "bold",
            }}
            variant="headlineSmall"
          >
            Logout?
          </TextPaper>
          <Text
            style={{
              fontFamily: "Inter",
              fontWeight: "700",
            }}
          >
            Are you sure you want to logout
          </Text>
        </View>
        <View
          style={[
            styles.LogoutContent,
            {
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginTop : 34
            },
          ]}
        >
          <TouchableNativeFeedback
            onPress={() => setLogoutModalShow(prev => !prev)}
          >
            <Button
              style={[styles.ButtonStyle, { backgroundColor: "#DAD8DC" }]}
              mode="contained"
            >
              <Text
                style={{
                  color: "#000",
                  fontFamily: "Inter",
                  fontWeight: "700",
                }}
              >
                Cancel
              </Text>
            </Button>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={logout}
          >
            <Button style={styles.ButtonStyle} mode="contained">
              <Text
                style={{
                  fontFamily: "Inter",
                  fontWeight: "700",
                }}
              >Logout
              </Text>
            </Button>
          </TouchableNativeFeedback>
        </View>
      </View>
    </View>
  );
};

export default LogoutModal;

export const styles = StyleSheet.create({
  LogoutModal: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: width,
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.58)",
    height: "100%",
    overflow: "hidden",
    zIndex : 4,
  },
  LogoutBox: {
    width: "85%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 22,
    paddingHorizontal: 17,
  },
  LogoutContent: {
    flexDirection: "column",
    gap: 13,
    width: "100%",
    paddingHorizontal: 19,
  },
  ButtonStyle: {
    borderRadius: 13,
    backgroundColor: colors.logoutBtn,
  },
});
