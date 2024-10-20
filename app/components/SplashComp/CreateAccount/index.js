import { View, Text, ImageBackground,TouchableOpacity } from 'react-native'
import React from 'react'
import {
    Button,
    Text as TextStyle,
  } from "react-native-paper";
const iphoneNFT = require("../../../../assets/images/iphone-nft-blockchain.png");

const CreateAccount = ({styles, createAccount, ImportAccount, showLoginScreen, userData }) => {
  return (
    <View style={styles.Container}>
    <ImageBackground
      style={styles.imageBackground}
      source={iphoneNFT}
      resizeMode="contain"
    />
    <View style={[styles.centerComp1, { flex: 1.2 }]}>
      <View style={styles.centerComp1child}>
        <View style={styles.centerComp1childInside}>
          <TextStyle style={styles.textStyles} variant="headlineMedium">
            Welcome to HashPay
          </TextStyle>
        </View>
        <View
          style={{
            width: "80%",
            marginTop: 5,
          }}
        >
          <TextStyle style={styles.paragraphText} variant="bodyLarge">
            Make seamless payments
          </TextStyle>
        </View>

        <View
          style={{
            flex: 1,
            width: "80%",
            justifyContent: "center",
          }}
        >
          {userData.length ? (
            <TouchableOpacity
              style={{ marginVertical: 6 }}
              onPress={showLoginScreen}
            >
              <Button
                style={styles.ButtonStyle}
                mode="elevated"
                // onPress={onScreenChange}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Login</Text>
              </Button>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            onPress={createAccount}
            style={{ marginVertical: 6 }}
          >
            <Button style={styles.ButtonStyle} mode="elevated">
              <Text style={{ color: "white", fontSize: 16 }}>
                Create a new account
              </Text>
            </Button>
          </TouchableOpacity>
          <Text
            style={{
              marginVertical: 5,
              fontFamily: "Roboto",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Or
          </Text>
          <TouchableOpacity
            style={{ marginVertical: 6 }}
            onPress={ImportAccount}
          >
            <Button style={styles.ButtonStyle} mode="elevated">
              <Text style={{ color: "white", fontSize: 16 }}>
                Import account via Seed
              </Text>
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
  )
}

export default CreateAccount