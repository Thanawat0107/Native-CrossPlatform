import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SIZES, } from "../../constants/themes";
import Search from "../Search";
import Carousels from "./Carousels";
import Headings from "./Headings";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Text
        style={welcomeText(
          COLORS.primary,
          SIZES.xSmall
        )}
      >
        Find The Most
      </Text>
      <Text style={welcomeText(COLORS.green3, 0)}>
        Interesting Herbs
      </Text>
      <Search />
      <Carousels />
      <Headings />
    </View>
  );
};

export default Welcome;

const welcomeText = (color: string, top: number = 0) => ({
  fontFamily: "bold",
  fontSize: SIZES.xxLarge - 6,
  marginTop: top,
  color: color,
  //marginHorizontal: themes.THEME.sizes.small,
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
