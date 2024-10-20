import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  UIManager,
  LayoutAnimation,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { Button } from "react-native-paper";
import { styles } from "../setting";
import colors from "../../utils/colors";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
import WalletContainer from "../../redux/Containers/containers";

const person_pic = require("../../../assets/images/profile-pic.png");
const referrels = require("../../../assets/images/referrels.png");
const domainVerification = require("../../../assets/images/domain-verification.png");
const arrow = require("../../../assets/images/arrow.png");
const avatar = require("../../../assets/images/avatar.png");
const userEdit = require("../../../assets/images/u_edit.png");
const arrowDown = require("../../../assets/images/arrow-down.png");

const Collapsable = ({ navigation, seed }) => {
  return (
    <View
      style={{
        width: "100%",
        height: "auto",
        flexDirection: "column",
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
      }}
    >
      <Text
        style={{
          fontSize: width * 0.050,
          fontFamily: "Inter",
        }}
      >
        Seed:
      </Text>
      <Text
        selectable={true}
        style={{
          fontSize: width * 0.04,
          fontFamily: "Inter",
          letterSpacing: 1,
        }}
      >
        {seed}
      </Text>
      <Button onPress={() => navigation.navigate("wallet-credent")}>
        <Text style={{color:'#3a1278'}}>View more</Text>
      </Button>
    </View>
  );
};

const { width } = Dimensions.get("window");
const Profile = ({ walletState, navigation, walletActions }) => {
  const bottomSheetRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const animatedArrow = useRef(new Animated.Value(0)).current;
  let fname = walletState.userData[0]?.firstname;
  let lname = walletState.userData[0]?.lastname;

  const handleLayout = () => {
    if (Platform.OS === "android") {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  const rotateArrow = () => {
    const toValue = isCollapsed ? 1 : 0;
    Animated.timing(animatedArrow, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setIsCollapsed(!isCollapsed);
  };

  const arrowRotation = animatedArrow.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "0deg"],
  });

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  const handleRecentPicturesPress = () => {
    setSelectedImages([]);
    // bottomSheetRef.current.snapTo(1);
  };

  const handlePress = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 7],
        quality: 1,
      });
      // console.log(result);
      if (!result.canceled) {
        console.log(result.assets[0].uri);
        setImageUri(result.assets[0].uri);
        // walletState.userData.push({imageURI : [result.assets[0].uri]})
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  const handleSelectPicturesPress = async () => {
    try {
      const images = ImagePicker.openPicker({
        multiple: true,
        mediaType: "photo",
      });
      setSelectedImages(images);
      bottomSheetRef.current.snapTo(1);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(imageUri);
  return (
    <View style={[styles.Container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 7,
        }}
      >
        <View
          style={{
            height: 155,
            width: "30%",
            marginBottom: 18,
          }}
        >
          <View
            style={{
              height: 100,
              width: 100,
              marginTop: 15,
              borderRadius: 110,
              borderWidth: 1,
              padding: 12,
              position: "relative",
              borderColor: "#ccc",
            }}
          >
            <Image
              resizeMode="contain"
              source={
                walletState.userData[0]?.image
                  ? { uri: walletState.userData[0].image }
                  : avatar
              }
              style={{
                position: "absolute",
                width: 98,
                height: 98,
                borderRadius: 100,
              }}
            />
          </View>
          <Text style={profile.editStyle}>Edit profile pic</Text>
        </View>
        <TouchableNativeFeedback>
          <View style={profile.inputStyle}>
            <View style={profile.inputInside}>
              <Image style={[{ width: width*0.090, height: width*0.090 }]} source={person_pic} />
              <View style={{ flexDirection: "column", height: "auto" }}>
                <Text style={[profile.textStyle, { width: width * 0.39 }]}>
                  {fname && lname ? (
                    fname + " " + lname
                  ) : (
                    <Text style={{ color: "rgba(0,0,0,0.4)" }}>
                      No name provided
                    </Text>
                  )}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("edit-profile")}
              >
                <Image source={userEdit} style={{ width: 30, height: 25 }} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={profile.inputStyle}>
            <View style={profile.inputInside}>
              <Image
                style={{ width: width*0.095, height: width*0.093}}
                source={domainVerification}
              />
              <View style={{ flexDirection: "column", marginTop: 8 }}>
                <Text style={profile.textStyle}>Passed KYC</Text>
                <Text style={{ letterSpacing: 0.5 }}>
                  {" "}
                  BVN:{" "}
                  <Text style={{ color: colors.profileUserDetail_color }}>
                    not available
                  </Text>{" "}
                </Text>
              </View>
              <TouchableNativeFeedback style={{ justifyContent: "flex-end" }}>
                <Image source={arrow} style={{ width: 10, height: 17 }} />
              </TouchableNativeFeedback>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={profile.inputStyle}>
            <View style={profile.inputInside}>
              <Image style={[profile.imageStyle,{width: width*0.075, height: width*0.070}]} source={referrels} />
              <View style={{ flexDirection: "column", marginTop: 8 }}>
                <Text style={profile.textStyle}>Number of referrels</Text>
                <Text style={{ letterSpacing: 0.5 }}>
                  {" "}
                  <Text style={{ color: colors.profileUserDetail_color }}>
                    not available
                  </Text>{" "}
                </Text>
              </View>
              <TouchableNativeFeedback style={{ justifyContent: "flex-end" }}>
                <Image source={arrow} style={{ width: 10, height: 17 }} />
              </TouchableNativeFeedback>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={rotateArrow} onLayout={handleLayout}>
          <View
            style={[
              profile.inputStyle,
              {
                paddingVertical: 17,
                height: "auto",
                borderBottomWidth: isCollapsed ? 0 : 1,
              },
            ]}
          >
            <View style={profile.inputInside}>
              <Image style={[profile.imageStyle,{width: width*0.075, height: width*0.070}]} source={referrels} />
              <View style={{ flexDirection: "column", marginTop: 8 }}>
                <Text style={profile.textStyle}>Wallet Credentials</Text>
              </View>
              <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
                <Image
                  source={isCollapsed ? arrowDown : arrow}
                  style={{
                    width: isCollapsed ? 18 : 10,
                    height: isCollapsed ? 10 : 17,
                  }}
                />
              </Animated.View>
            </View>
          </View>
        </TouchableNativeFeedback>
        <Animatable.View animation="jello">
          {isCollapsed && (
            <Collapsable navigation={navigation} seed={walletState.seed} />
          )}
        </Animatable.View>
      </ScrollView>
    </View>
  );
};

export default WalletContainer(Profile);

const profile = StyleSheet.create({
  inputStyle: {
    width: "80%",
    borderBottomWidth: 1,
    height: 60,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  inputInside: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "auto",
    alignItems: "center",
    gap: 10,
  },
  textStyle: {
    fontWeight: "400",
    fontFamily: "Inter",
    lineHeight: 16,
    width: width * 0.45,
    fontSize: width * 0.04,
    paddingVertical: 6,
  },
  imageStyle: {
    width: 29,
    height: 25,
  },
  editStyle: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
    top: 12,
    lineHeight: 21.79,
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2E2E2",
    padding: 20,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    // gap : 20,
    width: "30%",
    // backgroundColor : "red",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  galleryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});
