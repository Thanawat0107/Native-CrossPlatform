import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Cart } from '../components';

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Cart />
    </View>
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