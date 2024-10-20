import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  TextInput as NativeTextInput,
  TouchableNativeFeedback,
  ToastAndroid,
} from "react-native";
import {
  Button,
  Checkbox,
  Text as TextStyle,
  TextInput,
  ActivityIndicator,
} from "react-native-paper";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Eye from "react-native-vector-icons/Ionicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import krossApi from "../../utils/krossApi";
import { accountAddressfunc, show_Menu } from "../../redux/Actions/actions";
import WalletContainer from "../../redux/Containers/containers";
import colors from "../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import * as Clipboard from "expo-clipboard";
import { mnemonic } from "../../utils/seed_generator";
import AlerMsg from "./Alert";
import { SHA256, enc } from "crypto-js";
import CreateAccount from "./CreateAccount";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "expo-status-bar";


const walletImage = require("../../../assets/images/wallet-image.png");
const iphoneNFT = require("../../../assets/images/iphone-nft-blockchain.png");
const Moneybank = require("../../../assets/images/Money-and-bank-card-exchange.png");

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Screen3 = ({ walletState, walletActions, navigation }) => {
  const [check, setChecked] = useState(false);
  const [loginpassword, setLoginPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidepassword, setHidePassword] = useState(true);
  const [hideloginpassword, setHideLoginPassword] = useState(true);
  const [hideconfirmPassword, setHideConfirmPassword] = useState(true);
  let userAddress = useSelector((state) => state.Authreducer.accountAddress);
  const [forgotpassword, setForgotPassword] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const [walletseed, setWalletSeed] = useState("");
  const userData = walletState.userData;
  const dispatch = useDispatch();
  const [horizontal, setHorizontalScroll] = useState(true);

  const [loginShow, setLoginShow] = useState(false);
  const [createAccountshow, setCreateAccountShow] = useState(false);
  const [importAccountshow, setImportAccountShow] = useState(false);
  const [generateSeed, setGenerateSeed] = useState(false);
  const [alertmsg, setShowAlert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [copiedText, setCopiedText] = useState("");

  const onScreenChange = () => {
    this.scrollView.scrollTo({ x: width, animated: true });
  };
  const onScreenChange1 = () => {
    this.scrollView.scrollTo({ x: width + width, animated: true });
  };
  const onScreenChange2 = () => {
    this.scrollView.scrollTo({ x: width + width + width, animated: true });
  };
  const backScreen = () => {
    setCreateAccountShow(false);
    this.scrollView.scrollTo({ x: width - width, animated: true });
  };

  const copyToClipboard = async (value) => {
    await Clipboard.setStringAsync(value);
    ToastAndroid.showWithGravity(
      "Seed copied to clipboard",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const fetchCopiedText = async (value) => {
    copyToClipboard(value);
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  const checkTermsConditions = () => {
    setChecked(!check);
  };

  const ImportAccount = () => {
    //   duration: 400,
    //   update: {
    //     type: LayoutAnimation.Types.linear,
    //   },
    // });
    setLoginShow(false);
    setCreateAccountShow(false);
    setImportAccountShow(true);
    setGenerateSeed(false);
    setWalletSeed("");
    dispatch(accountAddressfunc(""));
    this.scrollView.scrollTo({ x: width * 4, animated: true });
  };

  const registerAccount = () => {
    if (userAddress == "") {
      alert("Please get account address before Register");
      return;
    }
    setLoginShow(false);
    setCreateAccountShow(true);
    setImportAccountShow(true);
    this.scrollView.scrollTo({ x: width - width + width, animated: true });
    dispatch(accountAddressfunc(""));
  };
  const createAccount = () => {
    setLoginShow(false);
    setCreateAccountShow(false);
    setImportAccountShow(true);
    setShowAlert(true);
    setUserLoading(false);
    setGenerateSeed(true);
    dispatch(accountAddressfunc(""));
    setWalletSeed("");
    setIsDisabled(false);
    this.scrollView.scrollTo({ x: width * 4, animated: true });
    generateWallet();
  };

  const alerthandle = () => {
    getUserAddress();
    setShowAlert((prev) => !prev);
  };

  const generateRegisterUserAccount = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Password not matched");
        return;
      }
      if (password.length < 10) {
        alert("Password must be more then 10 characters");
        return;
      }
      if (!check && !forgotpassword) {
        alert("Please check Terms and conditions and Privacy Policy");
        return;
      }
      // console.log("Prev : ", oldUserAccount);
      const hash = SHA256(walletseed);
      const encoded = hash.toString(enc.Hex);
      walletActions.getUserData([
        {
          password: password,
          seed: forgotpassword ? walletState.seed : walletseed,
          address: walletState.address,
          publicKey: walletState.publicKey,
          encodedSeed: encoded,
        },
      ]);
      const users = walletState.userData[0]
      if (forgotpassword) {
        walletActions.getUserData([{
          ...users,
          password: password,
        }])
      }
      if (!forgotpassword) alert("Account Created Successfully");
      if (forgotpassword) alert("Password Changed Successfully");
      this.scrollView.scrollTo({ x: width - width, animated: true });
      setForgotPassword(false);
    } catch (error) {
      alert(error.message);
    }
  };


  const getUserAddress = () => {
    dispatch(accountAddressfunc(""));
    setUserLoading(true);
    if (!walletseed) {
      alert("Please provide Seed");
      setUserLoading(false);
      return;
    }
    try {
      krossApi.getUser_Address(
        walletActions.loginUser,
        dispatch,
        accountAddressfunc,
        walletseed
      );
      setUserLoading(false);
    } catch (error) {
      alert("Found Error while getting address");
      setUserLoading(false);
    }
  };

  const generateWallet = async () => {
    dispatch(accountAddressfunc(""));
    try {
      const seed = mnemonic.generateMenmonic(15);
      setWalletSeed(seed);
    } catch (e) {
      // console.log(e);
      alert("Error generating seed");
    }
  };
  useEffect(() => {
    if (createAccountshow || importAccountshow) {
      getUserAddress();
    }
  }, [walletseed]);

  function showLoginScreen() {
    setCreateAccountShow(false);
    setImportAccountShow(false);
    setLoginShow(true);
    setTimeout(() => {
      this.scrollView.scrollTo({ x: width * 2, animated: true });
    }, 500);
  }
  function handleLogin() {
    console.log(loginpassword);
    if (loginpassword !== userData[0].password) {
      alert("Password not Found");
      return;
    }
    if (loginpassword == userData[0].password) {
      dispatch(show_Menu(true));
    }
  }
  function forgotPassword() {
    setCreateAccountShow(true);
    setConfirmPassword("");
    setPassword("");
    setLoginPassword("");
    setChecked(false);
    setForgotPassword(true);
    setTimeout(() => {
      setLoginShow(false);
    }, 800);
  }
  const passwordDirectory = FileSystem.cacheDirectory + "Downloads/";

  useEffect(() => {
    return () => {
      setForgotPassword(false);
      setChecked(false);
    };
  }, []);

  return (
    <ScrollView
      fadingEdgeLength={4}
      style={{ height: height }}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}
      horizontal={horizontal}
      ref={(scrollView) => (this.scrollView = scrollView)}
    >
      {!userData.length && !walletState.address && (
        <>
          <View style={styles.Container}>
            <ImageBackground
              style={styles.imageBackground}
              source={walletImage}
              resizeMode="contain"
            />
            <View style={styles.centerComp1}>
              <View style={styles.centerComp1child}>
                <View style={styles.centerComp1childInside}>
                  <TextStyle style={styles.textStyles} variant="headlineMedium">
                    Save and Earn
                  </TextStyle>
                </View>
                <View
                  style={{
                    width: "80%",
                    marginTop: 30,
                  }}
                >
                  <TextStyle style={styles.paragraphText} variant="bodyLarge">
                    Save your HASH naira and digital assets and earn rewards in
                    a secure and convenient way
                  </TextStyle>
                </View>

                {/* Small Bar for Scren Move Show */}

                <View style={styles.centerSmallBar}>
                  <View
                    style={[
                      styles.centerSmallBar_1,
                      { backgroundColor: "#444" },
                    ]}
                  />
                  <View
                    style={[
                      styles.centerSmallBar_1,
                      { backgroundColor: "#ccc" },
                    ]}
                  />
                  <View
                    style={[
                      styles.centerSmallBar_1,
                      { backgroundColor: "#ccc" },
                    ]}
                  />
                </View>
                {/*  End */}

                <View
                  style={{
                    flex: 1,
                    width: "80%",
                    justifyContent: "center",
                    marginVertical: 8,
                    paddingVertical: 8,
                  }}
                >
                  <TouchableOpacity onPress={onScreenChange}>
                    <Button style={styles.ButtonStyle} mode="elevated">
                      <Text style={{ color: "white", fontSize: 16 }}>
                        Continue
                      </Text>
                    </Button>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.Container}>
            <ImageBackground
              style={styles.imageBackground}
              source={iphoneNFT}
              resizeMode="contain"
            />
            <View style={styles.centerComp1}>
              <View style={styles.centerComp1child}>
                <View style={styles.centerComp1childInside}>
                  <TextStyle style={styles.textStyles} variant="headlineMedium">
                    Enjoy the usefulness of blockchain
                  </TextStyle>
                </View>
                <View
                  style={{
                    width: "80%",
                    marginTop: 30,
                  }}
                >
                  <TextStyle style={styles.paragraphText} variant="bodyLarge">
                    Make seamless tokenized naira payments and enjoy instant
                    transfers
                  </TextStyle>
                </View>

                {/* Small Bar for Scren Move Show */}

                <View style={styles.centerSmallBar}>
                  <View
                    style={[
                      styles.centerSmallBar_1,
                      { backgroundColor: "#ccc" },
                    ]}
                  />
                  <View
                    style={[
                      styles.centerSmallBar_1,
                      { backgroundColor: "#444" },
                    ]}
                  />
                  <View
                    style={[
                      styles.centerSmallBar_1,
                      { backgroundColor: "#ccc" },
                    ]}
                  />
                </View>
                {/*  End */}

                <View
                  style={{
                    flex: 1,
                    width: "80%",
                    justifyContent: "center",
                    marginVertical: 8,
                    paddingVertical: 10,
                  }}
                >
                  <TouchableOpacity onPress={onScreenChange1}>
                    <Button style={styles.ButtonStyle} mode="elevated">
                      <Text style={{ color: "white", fontSize: 16 }}>
                        Continue
                      </Text>
                    </Button>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.Container}>
            <ImageBackground
              style={styles.imageBackground}
              source={Moneybank}
              resizeMode="contain"
            />
            <View style={styles.centerComp1}>
              <View style={styles.centerComp1child}>
                <View style={styles.centerComp1childInside}>
                  <TextStyle style={styles.textStyles} variant="headlineMedium">
                    Enjoy tokenized rewards
                  </TextStyle>
                </View>
                <View
                  style={{
                    width: "80%",
                    marginTop: 30,
                  }}
                >
                  <TextStyle style={styles.paragraphText} variant="bodyLarge">
                    Receive reward and community nft drops and enjoy discounts
                    in many places
                  </TextStyle>
                </View>

                {/* Small Bar for Scren Move Show */}

                <View style={styles.centerSmallBar}>
                  <View
                    style={[
                      styles.centerSmallBar_1,
                      { backgroundColor: "#ccc" },
                    ]}
                  />
                  <View
                    style={[
                      styles.centerSmallBar_1,
                      { backgroundColor: "#ccc" },
                    ]}
                  />
                  <View
                    style={[
                      styles.centerSmallBar_1,
                      { backgroundColor: "#444" },
                    ]}
                  />
                </View>
                {/*  End */}
                <View
                  style={{
                    flex: 1,
                    width: "80%",
                    justifyContent: "center",
                    marginVertical: 4,
                    paddingVertical: 6,
                  }}
                >
                  <TouchableOpacity>
                    <Button
                      style={styles.ButtonStyle}
                      mode="elevated"
                      onPress={onScreenChange2}
                    >
                      <Text style={{ color: "white", fontSize: 16 }}>
                        Continue
                      </Text>
                    </Button>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </>
      )}

      {/* Create Login and Import Account Container  */}

      <CreateAccount
        styles={styles}
        iphoneNF={iphoneNFT}
        createAccount={createAccount}
        ImportAccount={ImportAccount}
        userData={userData}
        showLoginScreen={showLoginScreen}
      />

      {/* Create Login and Import Account Container End ---------  */}

      {/* Sign Up new Account          */}

      {createAccountshow && (
        <View style={styles.Container}>
          <View style={styles.imageBackground} />
          <View
            style={[{ height: 570, width: width, justifyContent: "flex-end" }]}
          >
            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
                // height: 560,
                flex: 1,
                justifyContent: "flex-start",
                backgroundColor: "white",
                borderTopLeftRadius: 22,
                borderTopRightRadius: 22,
              }}
            >
              <View
                style={[
                  styles.centerSmallBar,
                  { height: 400, flexDirection: "column", width: "100%" },
                ]}
              >
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 24,
                    marginTop: 20,
                    color: "rgba(254, 0, 98, 1)",
                    fontSize: 19,
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  Protect your Account
                </Text>
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 24,
                    fontFamily: "Mulish",
                    marginVertical: 14,
                    color: "#000000",
                  }}
                >
                  Set a single password for all your accounts
                </Text>
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 24,
                    fontFamily: "Roboto",
                    fontWeight: "700",
                  }}
                >
                  Create your Password
                </Text>
                <Text style={styles.labelText}>Enter Password</Text>

                {/* Text Input  */}

                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    textColor="#000000"
                    style={styles.textInput}
                    secureTextEntry={hidepassword}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                  />
                  {password && <>
                    <TouchableNativeFeedback
                      onPress={() => setHidePassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        paddingVertical: 10,
                        backgroundColor: "black",
                        right: 35,
                        zIndex: 2,
                      }}
                    >
                      {hidepassword ? (
                        <Ionicons
                          style={{
                            position: "absolute",
                            paddingVertical: 13,
                            paddingHorizontal: 8,
                            right: 30,
                            zIndex: 2,
                          }}
                          name="eye-off"
                          size={20}
                          color="rgba(0, 0, 0, 0.6)"
                        />
                      ) : (
                        <Ionicons
                          style={{
                            position: "absolute",
                            paddingVertical: 13,
                            paddingHorizontal: 8,
                            right: 30,
                            zIndex: 2,
                          }}
                          name="eye"
                          size={20}
                          color="rgba(0, 0, 0, 0.6)"
                        />
                      )}
                    </TouchableNativeFeedback>
                  </>}
                </View>
                <Text style={styles.labelText}>Confirm Password</Text>
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    textColor="#000000"
                    style={styles.textInput}
                    secureTextEntry={hideconfirmPassword}
                    value={confirmPassword}
                    onChangeText={(confirmPassword) =>
                      setConfirmPassword(confirmPassword)
                    }
                  />
                  {confirmPassword && <>
                    <TouchableNativeFeedback
                      onPress={() => setHideConfirmPassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        paddingVertical: 10,
                        backgroundColor: "black",
                        right: 35,
                        zIndex: 2,
                      }}
                    >
                      {hideconfirmPassword ? (
                        <Ionicons
                          style={{
                            position: "absolute",
                            paddingVertical: 13,
                            paddingHorizontal: 8,
                            right: 30,
                            zIndex: 2,
                          }}
                          name="eye-off"
                          size={20}
                          color="rgba(0, 0, 0, 0.6)"
                        />
                      ) : (
                        <Ionicons
                          style={{
                            position: "absolute",
                            paddingVertical: 13,
                            paddingHorizontal: 8,
                            right: 30,
                            zIndex: 2,
                          }}
                          name="eye"
                          size={20}
                          color="rgba(0, 0, 0, 0.6)"
                        />
                      )}
                    </TouchableNativeFeedback>
                  </>}
                </View>

                {/* Text Input  End ------ */}

                {!forgotpassword && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",

                      // backgroundColor : 'yellow',
                      paddingHorizontal: 14,
                      paddingVertical: 7,
                      maringTop: 10,
                    }}
                  >
                    {Platform.OS === "android" ? (
                      <Checkbox.Android
                        status={check ? "checked" : "unchecked"}
                        onPress={checkTermsConditions}
                        uncheckedColor="#3a1278"
                        color="#3a1278"
                      />
                    ) : (
                      <Checkbox.IOS
                        status={check ? "checked" : "unchecked"}
                        onPress={checkTermsConditions}
                        color="#3a1278"
                      />
                    )}
                    <Text style={{ color: "#000000", flex : 1, }} >
                      I have read and agree to the{" "}
                      <Text
                        onPress={() =>
                          navigation.navigate("terms-and-conditions")
                        }
                        style={{ color: "blue", fontSize: 13 }}
                      >
                        Terms and Conditions
                      </Text>
                      <Text> and</Text>
                      <Text
                        onPress={() => navigation.navigate("privacy-policy")}
                        style={{ color: "blue", fontSize: 13 }}
                      >
                        {" "}
                        Privacy Policy
                      </Text>
                    </Text>
                  </View>
                )}
              </View>

              <View
                style={{
                  flex: 0.3,
                  width: "80%",
                  justifyContent: "center",
                  // backgroundColor : 'green'
                }}
              >
                <TouchableOpacity
                  style={{ marginVertical: 6 }}
                  onPress={generateRegisterUserAccount}
                >
                  <Button
                    style={styles.ButtonStyle}
                    mode="elevated"
                  // onPress={onScreenChange}
                  >
                    <Text style={{ color: "white", fontSize: 16 }}>
                      Sign Up
                    </Text>
                  </Button>
                </TouchableOpacity>
                <Text
                  style={{
                    marginVertical: 5,
                    fontFamily: "Roboto",
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  Already have a account ?
                  <Text onPress={showLoginScreen} style={{ color: "blue" }}>
                    {" "}
                    Login
                  </Text>
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      {/* Sign Up new Account  End   */}

      {/* Login Container  */}

      {loginShow && (
        <View style={[styles.Container]}>
          <View style={styles.imageBackground} />
          <View
            style={[{ width: width, justifyContent: "flex-end" }]}
          >
            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
                height: 550,
                justifyContent: "center",
                backgroundColor: "white",
                borderTopLeftRadius: 22,
                borderTopRightRadius: 22,
              }}
            >
              <View
                style={[
                  styles.centerSmallBar,
                  { flex: 0.7, flexDirection: "column", width: "100%" },
                ]}
              >
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 24,
                    marginTop: 20,
                    color: "rgba(254, 0, 98, 1)",
                    fontSize: 19,
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                  }}
                >
                  Welcome back
                </Text>
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 24,
                    fontFamily: "Mulish",
                    marginVertical: 14,
                    color: "#000000",
                  }}
                >
                  Please enter your password to continue
                </Text>
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 24,
                    fontFamily: "Roboto",
                    fontWeight: "600",
                  }}
                >
                  Password
                </Text>

                {/* Text Input  */}

                <View
                  style={{
                    width: "100%",
                    flex: 0.6,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    mode="flat"
                    textColor="#000000"
                    style={styles.textInput}
                    secureTextEntry={hideloginpassword}
                    value={loginpassword}
                    onChangeText={(password) => setLoginPassword(password)}
                    placeholder="Enter Password"
                  />
                  <TouchableNativeFeedback
                    onPress={() => setHideLoginPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      paddingVertical: 10,
                      right: 35,
                      zIndex: 2,
                    }}
                  >
                    {!hideloginpassword ? (
                      <Eye
                        style={{
                          position: "absolute",
                          paddingVertical: 13,
                          paddingHorizontal: 8,
                          right: 30,
                          zIndex: 2,
                        }}
                        name="eye"
                        size={20}
                        color="rgba(0, 0, 0, 0.6)"
                      />
                    ) : (
                      <Ionicons
                        style={{
                          position: "absolute",
                          paddingVertical: 13,
                          paddingHorizontal: 8,
                          right: 30,
                          zIndex: 2,
                        }}
                        name="eye-off"
                        size={20}
                        color="rgba(0, 0, 0, 0.6)"
                      />
                    )}
                  </TouchableNativeFeedback>
                </View>
                <TouchableNativeFeedback onPress={forgotPassword}>
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      marginLeft: 24,
                      fontFamily: "Roboto",
                      fontWeight: "600",
                    }}
                  >
                    Forgot Password
                  </Text>
                </TouchableNativeFeedback>

                {/* Text Input  End ------ */}
              </View>
              <View
                style={{
                  flex: 0.6,
                  width: "80%",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{ marginVertical: 6 }}
                  onPress={handleLogin}
                >
                  <Button
                    style={styles.ButtonStyle}
                    mode="elevated"
                  // onPress={onScreenChange}
                  >
                    <Text style={{ color: "white", fontSize: 16 }}>Login</Text>
                  </Button>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      {/* Login Container End */}

      {/* Register Account Container  */}

      {importAccountshow && (
        <View
          style={{
            width: width,
            height: height,
            justifyContent: "flex-end",
            marginHorizontal: 0.8,
            alignItems: "flex-end",
            backgroundColor: "#000451",
          }}
        >
          {alertmsg ? <AlerMsg showAlerthandle={alerthandle} /> : null}
          <View
            style={{
              height: "84%",
              width: "100%",
              alignSelf: "flex-end",
            }}
          >
            <ScrollView
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                borderTopLeftRadius: 22,
                borderTopRightRadius: 22,
              }}
            >
              <View
                style={[
                  // styles.centerSmallBar
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 0,
                    justifyContent: "center",
                  },
                  {
                    height: "75%",
                    flexDirection: "column",
                    width: "100%",
                    // backgroundColor: "red",
                  },
                ]}
              >
                <View
                  style={{ marginVertical: 6, marginTop: 30, width: "86%" }}
                >
                  <Button
                    style={[
                      {
                        alignSelf: "center",
                        width: "100%",
                        // paddingVertical: 5,

                        backgroundColor: "#FE0062",
                        color: "white",
                      },
                      {
                        backgroundColor: "#DADADA",
                        borderRadius: 0,
                        // paddingVertical: 2,
                      },
                    ]}
                    mode="elevated"
                  >
                    <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 13 }}>
                      SET UP YOUR SEED
                    </Text>
                  </Button>
                </View>
                {generateSeed && (
                  <TouchableOpacity style={{ marginVertical: 6, width: "86%" }}>
                    <Button
                      style={[
                        styles.ButtonStyle,
                        { borderRadius: 0, paddingVertical: 2 },
                      ]}
                      mode="elevated"
                      onPress={generateWallet}
                    >
                      <Text style={{ color: "white", fontSize: 13 }}>
                        CLICK HERE TO GENERATE NEW SEED
                      </Text>
                    </Button>
                  </TouchableOpacity>
                )}

                {/* Text Input  */}

                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "yellow",
                    position: "relative",
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      marginLeft: "7%",
                      fontFamily: "Roboto",
                      fontWeight: "700",
                      paddingBottom: 5,
                      paddingLeft: 4,
                    }}
                  >
                    Wallet seed
                  </Text>
                  <NativeTextInput
                    // editable={isDisabled}
                    style={[
                      styles.textInput,
                      {
                        height: "50%",
                        backgroundColor: "#E7E7E7",
                        padding: 15,
                        position: "relative",
                      },
                    ]}
                    textAlignVertical="top"
                    placeholder="Type seed"
                    cursorColor="rgba(0, 0, 0, 1)"
                    multiline={true}
                    numberOfLines={5}
                    secureTextEntry={hidepassword}
                    value={walletseed}
                    onChangeText={(seed) => setWalletSeed(seed)}
                  />
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: "10%",
                      right: "6%",
                      padding: 6,
                      backgroundColor: "#FE0062",
                      borderRadius: 2,
                      zIndex: 2,
                    }}
                    onPress={getUserAddress}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 10,
                        height: "auto",
                      }}
                    >
                      Get Address
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: "10%",
                      right: "25%",
                      padding: 6,
                      backgroundColor: "#FE0062",
                      borderRadius: 2,
                      zIndex: 2,
                    }}
                    onPress={() => fetchCopiedText(walletseed)}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 10,
                        height: "auto",
                      }}
                    >
                      Copy seed
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: "10%",
                      right: "42%",
                      padding: 6,
                      backgroundColor: "#FE0062",
                      borderRadius: 2,
                      zIndex: 2,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.white,
                        fontSize: 10,
                        height: "auto",
                      }}
                    >
                      Save as a file
                    </Text>
                  </TouchableOpacity> */}
                  <Text
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: "700",
                      paddingTop: 5,
                    }}
                  >
                    Address
                  </Text>
                  <Text
                    style={{
                      paddingVertical: 6,
                      color: colors.menuColor,
                      fontSize: 15,
                      fontWeight: "700",
                    }}
                  >
                    {userLoading ? (
                      <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                      userAddress
                    )}
                  </Text>
                </View>

                {/* Text Input  End ------ */}
              </View>

              <View
                style={{
                  height: "30%",
                  width: "80%",
                  // backgroundColor: "green",
                  flexDirection: "column",
                  // gap : 4,
                  // alignItems : "center",
                  // justifyContent : "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    marginVertical: 6,
                    justifyContent: "center",
                    height: "35%",
                  }}
                  onPress={registerAccount}
                >
                  <Button
                    style={[
                      styles.ButtonStyle,
                      {
                        borderRadius: width * 0.05,
                        paddingVertical: 2,
                        height: "80%",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 2,
                        fontWeight: "500",
                        fontFamily: "Roboto",
                      },
                    ]}
                    mode="elevated"
                  // onPress={onScreenChange}
                  >
                    <Text style={{ color: "white", fontSize: 14 }}>
                      Register Account
                    </Text>
                  </Button>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    // backgroundColor: "gray",
                    justifyContent: "center",
                    height: "35%",
                  }}
                  onPress={backScreen}
                >
                  <Button
                    style={[
                      styles.ButtonStyle,
                      {
                        borderRadius: width * 0.05,
                        fontFamily: "Roboto",
                        backgroundColor: "#DADADA",
                        height: "80%",
                        fontWeight: "500",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 2,
                      },
                    ]}
                    mode="elevated"
                  // onPress={onScreenChange}
                  >
                    <Text style={{ color: "white", fontSize: 14 }}>Back</Text>
                  </Button>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      )}

      {/* Register Account END  */}
    </ScrollView>
  );
};

export default WalletContainer(Screen3);

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: "flex-end",
    // marginHorizontal: 0.8,
    alignItems: "center",
    backgroundColor: "#000451",
  },
  centerSmallBar: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 0,
    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    marginLeft: 50,
    paddingHorizontal: 30,
    paddingTop: 10,
    // paddingTop: 40,
  },
  centerComp1: {
    flex: 1,
    justifyContent: "flex-end",
    alignSelf: "center",
    height: 660,
    // backgroundColor: "red",
    width: "100%",
    paddingHorizontal: 1,
  },
  centerComp1child: {
    width: "100%",
    height: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  centerComp1childInside: {
    width: "80%",
    marginTop: 15,
  },
  textStyles: {
    textAlign: "center",
    color: "#1E0E62",
    fontStyle: "normal",
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  paragraphText: {
    textAlign: "center",
    color: "#333333",
    fontStyle: "normal",
    fontFamily: "Mulish",
  },
  centerSmallBar_1: {
    width: 28,
    height: 3,
    borderRadius: 10,
    marginHorizontal: 3,
  },
  ButtonStyle: {
    alignSelf: "center",
    width: "100%",
    paddingVertical: 5,
    backgroundColor: "#FE0062",
    color: "white",
  },
  labelText: {
    alignSelf: "flex-start",
    marginLeft: 24,
    marginBottom: 9,
    marginTop: 7,
    color: "#000000",
    fontWeight: "400",
  },
  textInput: {
    width: "88%",
    borderRadius: 5,
    backgroundColor: "#fafafa",
    color: '#000000',
    // height: 50,
    borderWidth: 0,
  },
});
