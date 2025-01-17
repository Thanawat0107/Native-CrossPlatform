import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES } from "../constants/themes";
import { Navber, ProductList, Welcome } from "../components";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Navber />
      <ScrollView>
        <Welcome />
        <ProductList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.small,
    marginVertical: 22,
  },
});
