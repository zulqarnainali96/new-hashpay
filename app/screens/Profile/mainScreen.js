import {
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { styles } from "../setting";
import { TouchableOpacity } from "react-native";
const arrow = require("../../../assets/images/arrow.png");
const profileAlert = require("../../../assets/images/profile-alert.png");
const person_pic = require("../../../assets/images/profile-pic.png");
const domainVerification = require("../../../assets/images/domain-verification.png");
const Transaction = require("../../../assets/images/transaction.png");

const MainScreen = ({ navigation }) => {
  const showProfileRoute = (route) => {
    navigation.navigate(route);
  };

  return (
    <View style={styles.Container}>
      <View style={[styles.NavBox, { height: 385 }]}>
        <View style={[styles.NavBox, { height: 47, width: "100%" }]}>
          <TouchableOpacity
            style={styles.boxNavSetting}
            // onPress={() => showProfileRoute("about")}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image source={person_pic} style={{ width: 30, height: 30 }} />
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  fontSize: 15,
                }}
              >
                Nickname
              </Text>
            </View>
            <View>
              <Image source={arrow} style={{ width: 15, height: 24 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.NavBox, { height: 47, width: "100%" }]}>
          <TouchableOpacity
            style={styles.boxNavSetting}
            // onPress={() => showProfileRoute("about")}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image
                source={profileAlert}
                resizeMode="contain"
                style={{ width:30,height:30 }}
              />
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  fontSize: 15,
                }}
              >
                Pass KYC
              </Text>
              <Text style={{color:"gray",justifyContent:"flex-end",marginLeft:19}}>Comming soon</Text>
            </View>
            <View>
              <Image source={arrow} style={{ width: 15, height: 24 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.NavBox, { height: 47, width: "100%" }]}>
          <TouchableOpacity
            style={styles.boxNavSetting}
            // onPress={() => showProfileRoute("about")}
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
                Number of Referrels
              </Text>
            </View>
            <View>
              <Image source={arrow} style={{ width: 15, height: 24 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.NavBox, { height: 47, width: "100%" }]}>
          <TouchableOpacity
            style={styles.boxNavSetting}
            // onPress={() => showProfileRoute("about")}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image source={Transaction} style={{ width: 26, height: 26 }} />
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  fontSize: 15,
                }}
              >
                Transaction History
              </Text>
            </View>
            <View>
              <Image source={arrow} style={{ width: 15, height: 24 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.NavBox, { height: 47, width: "100%" }]}>
          <TouchableOpacity
            style={styles.boxNavSetting}
            onPress={() => showProfileRoute("wallet-credent")}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image
                source={domainVerification}
                style={{ width: 33, height: 33 }}
              />
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  fontSize: 15,
                }}
              >
                Wallet Credentials
              </Text>
            </View>
            <View>
              <Image source={arrow} style={{ width: 15, height: 24 }} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.NavBox, { height: 47, width: "100%" }]}>
          <TouchableOpacity
            style={styles.boxNavSetting}
            // onPress={() => showProfileRoute("wallet-credent")}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image
                source={domainVerification}
                style={{ width: 33, height: 33 }}
              />
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontWeight: "400",
                  fontSize: 15,
                }}
              >
                BVN
              </Text>
            </View>
            <View>
              <Image source={arrow} style={{ width: 15, height: 24 }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MainScreen;
