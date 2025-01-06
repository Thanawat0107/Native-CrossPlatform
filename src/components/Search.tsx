import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { Image } from "react-native";

export default function Search() {
  return (
    <View style={styles.inputContainer}>
      <Image
        source={require("../../assets/search.png")}
        style={styles.searchIcon}
      />
      <TextInput placeholder="Search" style={styles.textInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    fontSize: 18,
  },
});
