import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { StatusBar } from "expo-status-bar";
import React from 'react'
import { Cart } from '../components';

const CartScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Cart />
    </SafeAreaView>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 12,
  },
})