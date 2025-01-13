import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { themes } from "../../constants/themes";
import Search from "../Search";
import Carousel from "./Carousel";
import Slider from "./Slider";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Text
        style={welcomeText(
          themes.THEME.colors.primary,
          themes.THEME.sizes.xSmall
        )}
      >
        Find The Most
      </Text>
      <Text style={welcomeText(themes.THEME.colors.green3, 0)}>
        Interesting Herbs
      </Text>
      <Search />
      {/* <Carousel /> */}
      <Slider />
    </View>
  );
};

export default Welcome;

const welcomeText = (color: string, top: number = 0) => ({
  fontFamily: "bold",
  fontSize: themes.THEME.sizes.xxLarge - 6,
  marginTop: top,
  color: color,
  marginHorizontal: themes.THEME.sizes.small,
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
