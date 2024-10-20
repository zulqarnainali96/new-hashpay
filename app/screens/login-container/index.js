import { View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splashscreen from "../splash-screen/splash-screen";
import TermsConditions from "../setting/Terms-and-Conditons";
import PrivacyPolicy from "../setting/Privacy-and-Cookie-Policy";

const Stack = createStackNavigator();

const LoginContainer = () => {
  return (
    <View style={{ flex: 1, width: "100%",}}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="splashscreen"
      >
        <Stack.Screen name='splashscreen' component={Splashscreen} />
        <Stack.Screen name='terms-and-conditions' component={TermsConditions} />
        <Stack.Screen name='privacy-policy' component={PrivacyPolicy} />
        
      </Stack.Navigator>
    </View>
  );
};

export default LoginContainer;