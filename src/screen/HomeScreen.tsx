import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ProductCard from "../components/products/ProductCard";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { themes } from "../constants/themes";
import { Navber, ProductList, Welcome } from "../components";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Navber />
      <ScrollView>
        <Welcome />
        <ProductList />
        {/* <View style={styles.productGrid}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: themes.THEME.sizes.small,
    marginVertical: 12,
  },
  // productGrid: {
  //   flexDirection: "row",
  //   flexWrap: "wrap",
  //   justifyContent: "space-between",
  // },
});
