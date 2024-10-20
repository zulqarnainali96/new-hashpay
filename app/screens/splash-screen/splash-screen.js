import {
  SafeAreaView,
  StyleSheet,
} from "react-native";
import React from "react";
import Screen3 from "../../components/SplashComp/Screen3";

const Splashscreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.Container}>
      {/* <Screen1 /> */}
      {/* <Screen2 /> */}
      <Screen3 navigation={navigation} />
    </SafeAreaView>
  );
};

export default Splashscreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // marginTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
});
