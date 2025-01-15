import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { StatusBar } from "expo-status-bar";
import React from 'react'
import { ProductDetails } from '../components';
import { themes } from '../constants/themes';
import { Ionicons } from '@expo/vector-icons';

const ProductDetailsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ProductDetails />
    </SafeAreaView>
  );
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginHorizontal: 12,
    // marginVertical: 12,
  },
})