import {
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import React from "react";
import colors from "../../utils/colors";

const ReferFriend = () => {

  return (
    <ScrollView
      contentContainerStyle={[styles.Container]}
      showsVerticalScrollIndicator={false}
    >
      <Text
        style={{
          fontFamily: "Mulish",
          fontWeight: "600",
          fontSize: 24,
          top : 265,
          height : 800,
          textAlign: "center",
          alignSelf: "center",
          width:"100%"
        }}
      >
        Comming Soon
      </Text>
    </ScrollView>
  );
};

export default ReferFriend;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.profileBgColor,
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 8,

    justifyContent : "center",
    alignItems : "center",
  },
  mainBox: {
    width: "100%",
    marginTop: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 18,
  },
  imageStyle: {
    width: "70%",
    height: 250,
  },
  buttonStyle: {
    width: 270,
    backgroundColor: colors.nickname_button_color,
    justifyContent: "center",
    padding: 6,
    borderRadius: 100,
  },
  referrelText: {
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 12,
    marginTop: 5,
    color: "rgba(0, 0, 0, 1)",
    textAlign: "center",
  },
});
