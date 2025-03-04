import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/themes";
import { useAppNavigation } from "../../hooks/useAppNavigation";

const Navber = () => {
  const navigation = useAppNavigation();
  return (
    <View style={styles.appBar}>
      <Ionicons name="location-outline" size={24} />
      <Text style={styles.location}> Herb Application </Text>
      <View style={{ alignItems: "flex-end" }}>
        <View style={styles.cartCount}>
          <Text style={styles.cartNumber}> 9 </Text>
        </View>
        <TouchableOpacity onPress={ ()=> navigation.navigate("Cart")}>
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
    color: COLORS.gray,
  },
  cartCount: {
    position: "absolute",
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: COLORS.green,
    justifyContent: "center",
    zIndex: 999
  },
  cartNumber: {
    fontFamily: "regular",
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.lightWhite,
  }
});
