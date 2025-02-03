import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES } from "../constants/themes";
import { Navber, ProductRow, Welcome } from "../components";

const HomeScreen = () => {
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Navber />
        <ScrollView>
          <Welcome />
          <ProductRow />
        </ScrollView>
      </SafeAreaView>
    </>
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
