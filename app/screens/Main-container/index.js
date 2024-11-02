import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import WalletContainer from "../../redux/Containers/containers";
import LoginContainer from "../login-container";
import MenuContainer from "../menu-container";
import { useSelector } from "react-redux";
// import { View, Text } from "react-native";

const MainContainer = ({ walletState }) => {
    const showmenu = useSelector(state => state.Authreducer.showmenu)
    const { userData, } = walletState;

    return (
        <SafeAreaView
            style={styles.Container}
        >
            {userData.length && showmenu ? <MenuContainer /> : <LoginContainer />}
        </SafeAreaView>
    );
};

export default WalletContainer(MainContainer);

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: "center",
        // paddingTop : StatusBar.currentHeight,
        // paddingTop : 23,
        justifyContent: "flex-start",
        width: "100%",
        // height : "100%"
    },
});
