import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
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
          onPress={() => navigation.navigate("MainManagements")}
        >
          <Text style={styles.buttonText}>Managements</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MainDashboards")}
        >
          <Text style={styles.buttonText}>Dashboards</Text>
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