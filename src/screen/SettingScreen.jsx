import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { StatusBar } from "expo-status-bar";
import React from 'react'

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <Text>SettingScreen</Text>
    </SafeAreaView>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 12,
  },
})