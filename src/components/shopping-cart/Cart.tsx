import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppNavigation } from '../../hooks/useAppNavigation'

const Cart = () => {
  const navigation = useAppNavigation();
  return (
    <View>
      <Text>Cart</Text>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})