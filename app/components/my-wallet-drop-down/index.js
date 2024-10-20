import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import { Surface } from "react-native-paper";

const WalletDropDown = ({navigation}) => {

  function ControlNavigation (route) {
    navigation.navigate(route)
  }
  return (
    <Surface elevation={4}  style={styles.dropDown}>
      <TouchableOpacity onPress={() => ControlNavigation('send-funds')}>
        <Text style={styles.textStyle}>Send Funds</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => ControlNavigation('receive-funds')}>
        <Text style={styles.textStyle}>Receive Funds</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => ControlNavigation('mass-funds')}>
        <Text style={styles.textStyle}>Mass Transfer</Text>
      </TouchableOpacity>
    </Surface>
  );
};

export default WalletDropDown;

const styles = StyleSheet.create({
  dropDown: {
    position : "absolute",
    paddingHorizontal : 0,
    padding : 0,
    width : 170,
    top : "110%",
    right : "14%",
    height: 132,
    backgroundColor: colors.white,
    borderRadius : 10,
  },
  textStyle:{
    marginBottom: 8,
    borderRadius : 4,
    marginVertical: 0,
    paddingVertical : 12,
    paddingHorizontal : 9,
    fontFamily : 'Lato',
    fontWeight : '600',
    backgroundColor : colors.dropDowngray,
    color : colors.dropDowngraytextcolor
  }
});
