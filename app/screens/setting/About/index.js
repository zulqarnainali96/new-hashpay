import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../utils/colors";
const About = () => {
  return (
    <View style={[styles.Container, { paddingTop: 20 }]}>
      <Text
        style={[
          styles.fontStyle,
          { lineHeight: 25, paddingHorizontal: 1, textAlign: "justify" },
        ]}
      >
        HashPay is a modern blockchain enabled financial platform meeting
        customers where they are: on their smartphones. We offer our customers
        the broadest level of choice and financial access. HashPay is owned and
        managed by Vinekross Technologies Limited (RC 1883948), registered
        office at 21, Pariola Street, Ogudu GRA, Lagos.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.profileBgColor,
    flex: 1,
    width: "100%",
    paddingHorizontal: 14,
    alignItems: "center",
    position: "relative",
  },
  fontStyle: {
    fontFamily: "Mulish",
    fontWeight: "600",
    fontSize: 17,
    letterSpacing: 0.15,
    color: colors.aboutText_color,
  },
});


export default About;
