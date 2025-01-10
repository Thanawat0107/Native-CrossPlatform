import { NavigationContainer } from "@react-navigation/native";
import RootTabs from "./src/navigators/RootTabs";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import useCustomFonts from "./src/hooks/useCustomFonts";
import { LoadingScreen } from "./src/screen";

export default function App() {
  const [fontsLoaded, fontError] = useCustomFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <RootTabs />
    </NavigationContainer>
  );
}
