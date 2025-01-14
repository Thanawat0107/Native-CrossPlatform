import React from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";
import ProductCard from "../components/products/ProductCard";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { themes } from "../constants/themes";
import Navber from "../components/Navber";
import { Welcome } from "../components";

const isIOS = Platform.OS === "ios";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Navber />
      <ScrollView>
        <Welcome />
        <View style={styles.productGrid}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: themes.THEME.sizes.small,
    marginTop: 12,
    marginBottom: isIOS ? 45 : 70,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
