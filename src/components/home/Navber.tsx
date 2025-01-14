import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { themes } from "../../constants/themes";

const Navber = () => {
  return (
    <View style={styles.appBar}>
      <Ionicons name="location-outline" size={24} />
      <Text style={styles.location}> Herb Application </Text>
      <View style={{ alignItems: "flex-end" }}>
        <View style={styles.cartCount}>
          <Text style={styles.cartNumber}> 99 </Text>
        </View>
        <TouchableOpacity>
          <Fontisto name="shopping-bag" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navber;

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "bold",
    fontSize: 40,
  },
  appBarWrapper: {
    //marginHorizontal: 22,
    //marginTop: themes.THEME.sizes.small,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: 10,
  },
  location: {
    fontFamily: "medium",
    color: themes.THEME.colors.gray,
  },
  cartCount: {
    position: "absolute",
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: themes.THEME.colors.green,
    justifyContent: "center",
    zIndex: 999
  },
  cartNumber: {
    fontFamily: "regular",
    fontWeight: "600",
    fontSize: 10,
    color: themes.THEME.colors.lightWhite,
  }
});
