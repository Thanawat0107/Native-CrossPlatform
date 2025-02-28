import { NavigationContainer } from "@react-navigation/native";
import RootTabs from "./src/navigators/RootTabs";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import useCustomFonts from "./src/hooks/useCustomFonts";
import { Loading } from "./src/components";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { StackTabs } from "./src/navigators/StackTabs";
import { PaperProvider } from "react-native-paper";

export default function App() {
  const [fontsLoaded, fontError] = useCustomFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer onReady={onLayoutRootView}>
          <StackTabs />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
