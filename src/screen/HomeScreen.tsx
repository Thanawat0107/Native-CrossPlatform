import React from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";
import ProductCard from "../components/products/ProductCard";
import Search from "../components/Search";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { themes } from "../constants/themes";

const isIOS = Platform.OS === "ios";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar style="auto" />
        <Search />
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
    // marginVertical: 12,
    marginTop: 12,
    marginBottom: isIOS ? 45 : 70,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
