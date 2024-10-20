import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import { Surface, TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import colors from "../../utils/colors";
import * as ImagePicker from "expo-image-picker";
import WalletContainer from "../../redux/Containers/containers";
const avatar = require("../../../assets/images/avatar.png");
const CameraIcon = require("../../../assets/images/camera-alt.png");


const { width, height } = Dimensions.get("window");

const EditProfile = ({ walletState, walletActions, navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
        const data = walletState.userData;
        setImageUri(result.assets[0].uri);
      }
      // console.log(walletState.userData);
    } catch (error) {
      // console.log("Error : ", error);
    }
  };

  const handleUserSave = async () => {
    const data = walletState.userData[0];
    if (!firstName && !lastName && imageUri==null) {
      alert("Please provide all details before save");
      return;
    }
    walletActions.getUserData([
      {
        ...data,
        image: imageUri,
        firstname: firstName,
        lastname: lastName,
      },
    ]);
    alert("Account info saved!");
    // console.log(walletState.userData)
    navigation.goBack()
    setFirstName("")
    setLastName("")
  };

  return (
    <View style={styles.Container}>
      <Surface elevation={3} style={styles.imageStyle}>
        <Image
          resizeMode="contain"
          source={walletState.userData[0]?.image ? { uri: walletState.userData[0].image } : avatar}
          style={[styles.image]}
        />
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={CameraIcon}
            style={{
              position: "absolute",
              width: 25,
              height: 25,
              bottom: 0,
              right: 10,
            }}
          />
        </TouchableOpacity>
      </Surface>
      <View style={styles.InsideContainer}>
        <Text style={styles.textLable}>First name</Text>
        <TextInput
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="red"
          value={firstName}
          style={styles.textInputStyle}
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
      <View style={styles.InsideContainer}>
        <Text style={styles.textLable}>Last name</Text>
        <TextInput
          mode="outlined"
          outlineColor="transparent"
          activeOutlineColor="red"
          value={lastName}
          style={styles.textInputStyle}
          onChangeText={(text) => setLastName(text)}
        />
      </View>
      <View style={[styles.InsideContainer, { marginTop: 50 }]}>
        <TouchableOpacity onPress={handleUserSave} style={styles.ButtonStyle}>
          <Text
            style={[
              styles.textLable,
              { textAlign: "center", color: "white", fontWeight: "600" },
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WalletContainer(EditProfile);

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  InsideContainer: {
    width: "100%",
    padding: 8,
    flexDirection: "column",
    gap: 14,
  },
  textLable: {
    fontFamily: "OpenSans",
    fontWeight: "400",
    fontSize: width * 0.04,
    letterSpacing: 2,
  },
  textInputStyle: {
    backgroundColor: "#EFF0EE",
    height: height * 0.08,
    fontSize: width * 0.04,
    fontFamily: "OpenSans",
    letterSpacing: 2,
    fontWeight: "400",
    lineHeight: 19,
    borderRadius: 20,
  },
  imageStyle: {
    borderRadius: 100,
    shadowColor: "#ccc",
    marginVertical: 14,
    marginHorizontal: 14,
    position: "relative",
    backgroundColor: "white",
  },
  image: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: 100,
  },
  ButtonStyle: {
    backgroundColor: colors.pinkColor,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.08,
  },
});
