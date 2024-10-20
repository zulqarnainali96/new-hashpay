import "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import MainContainer from "./screens/Main-container";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

const theme = {
    ...DefaultTheme,
    color: DefaultTheme.colors,
    backgroundColor: "transparent",
};
console.log(theme.color);

export default function Index() {

    const [FontsLoaded, error] = useFonts({
        Doppio_One_regular: require("../assets/fonts/DoppioOne-Regular.ttf"),
        SF_Pro_Text_semibold: require("../assets/fonts/SFProText-Semibold.ttf"),
        Roboto: require("../assets/fonts/Roboto/Roboto-Black.ttf"),
        Mulish: require("../assets/fonts/Mulish/Mulish-VariableFont_wght.ttf"),
        Lato: require("../assets/fonts/Lato/Lato-Regular.ttf"),
        Lato_regular: require("../assets/fonts/Lato/Lato-Regular.ttf"),
        Lato_semibold: require("../assets/fonts/Lato/Lato-Semibold.ttf"),
        Lato_bold: require("../assets/fonts/Lato/Lato-Bold.ttf"),
        Inter: require("../assets/fonts/Inter-Regular.ttf"),
        Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
        Raleway: require("../assets/fonts/Raleway-Regular.ttf"),
        OpenSans: require("../assets/fonts/OpenSans.ttf"),
    });

    if (!FontsLoaded && !error) {
        return null;
    }
    return (
            <NavigationContainer theme={theme} independent={true}>
                <Provider store={store}>
                    <PersistGate persistor={persistor} loading={null}>
                        <PaperProvider>
                            <StatusBar backgroundColor="#000000" barStyle="default" />
                            <MainContainer />
                        </PaperProvider>
                    </PersistGate>
                </Provider>
            </NavigationContainer>
    );
}