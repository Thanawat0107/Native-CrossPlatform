import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import ProductCard from "../components/products/ProductCard";
import Search from "../components/Search";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <>
      <ScrollView style={styles.container}>
        <StatusBar style="light"/>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 12,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
