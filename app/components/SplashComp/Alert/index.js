import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import React from "react";
import { styles } from "../../Logout-modal";
import { Button, Surface } from "react-native-paper";

const AlerMsg = ({ showAlerthandle }) => {
  return (
    <View style={[styles.LogoutModal,{zIndex:3,backgroundColor:"rgba(0, 0, 0, 0.77)"}]}>
      <View style={[styles.LogoutBox,{height:"75%",borderRadius:5,backgroundColor:"rgba(0,0,0,0)"}]}>
        <Surface
          elevation={4}
          style={[
            styles.LogoutContent,
            {justifyContent:"center",gap:16, padding: 6, backgroundColor: "#d0342cd6",height:"80%" },
          ]}
        >
          <Text
            style={{ fontFamily: "Mulish", fontWeight: "700", color: "white",textAlign:"center",fontSize:18 }}
          >
            New Account
          </Text>
          <Text
            style={{ fontFamily: "Mulish", fontWeight: "500", color: "white",fontSize:15 }}
          >
            Treat your SEED (backup) with care{" "}
          </Text>
          <Text
            style={{ fontFamily: "Mulish", fontWeight: "500", color: "white",fontSize:15 }}
          >
            Only SEED can provide access to your wallet
          </Text>
          <Text
            style={{ fontFamily: "Mulish", fontWeight: "500", color: "white",fontSize:15 }}
          >
            Dont put your SEED anywhere except official KSS Client (or App)
          </Text>
          <Text
            style={{
              fontFamily: "Mulish",
              fontWeight: "500",
              color: "white",
              color: "white",
              fontSize:15
            }}
          >
            If Someone has access to it you will lose your funds
          </Text>
          <Text
            style={{
              fontFamily: "Mulish",
              fontWeight: "500",
              color: "white",
              fontSize : 15
            }}
          >
            Store your wallet SEED safetly. Its is the only way to restore your account
          </Text> 
          <TouchableNativeFeedback onPress={showAlerthandle}>
            <Button style={[styles.ButtonStyle,{borderRadius:5,marginTop:8,alignSelf:"center"}]} mode="contained">
              <Text
                style={{
                  fontFamily: "Inter",
                  fontWeight: "700",
                  color: "white",
                  fontSize : 15
                }}
              >
                I UNDERSTAND
              </Text>
            </Button>
          </TouchableNativeFeedback>
        </Surface>
      </View>
    </View>
  );
};

export default AlerMsg;
