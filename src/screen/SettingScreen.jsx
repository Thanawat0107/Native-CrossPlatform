import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { StatusBar } from "expo-status-bar";
import { SIZES } from "../constants/themes";
import React from 'react'
import { useAppNavigation } from '../hooks/useAppNavigation';

const SettingScreen = () => {
  const navigation = useAppNavigation();
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Admin Settings</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProductSetting")}
        >
          <Text style={styles.buttonText}>Manage Products</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CategorySetting")}
        >
          <Text style={styles.buttonText}>Manage Categories</Text>
        </TouchableOpacity>
      </View>
  );
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.xxLarge,
    marginBottom: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
})