import { StyleSheet, Text, View, SafeAreaView, } from 'react-native'
import React from 'react'

const AccountScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AccountScreen</Text>
    </SafeAreaView>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 12,
  },
})