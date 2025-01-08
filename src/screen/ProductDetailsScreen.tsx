import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { StatusBar } from "expo-status-bar";
import React from 'react'

const ProductDetailsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <Text>ProductDetailsScreen</Text>
    </SafeAreaView>
  )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 12,
  },
})