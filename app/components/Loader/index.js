import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { styles } from "../Logout-modal";
import { ActivityIndicator } from "react-native-paper";

const { height, width } = Dimensions.get("window");

const Loader = ({ title }) => {
  return (
    <View
      style={{
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: width,
        alignSelf: "flex-start",
        backgroundColor: "rgba(0, 0, 0, 0.58)",
        height: "100%",
        overflow: "hidden",
        zIndex: 4,
      }}
    >
      <View
        style={[
          {
            width: "85%",
            height: "60%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.white,
            borderRadius: 22,
            paddingHorizontal: 17,
          },
          { height: "15%", borderRadius: 8, justifyContent: "center" },
        ]}
      >
        {title && (
          <Text style={{ marginVertical: 10, fontFamily: "Inter" }}>
            {title}
          </Text>
        )}
        <ActivityIndicator size={30} />
      </View>
    </View>
  );
};

export default Loader;
