import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { StatusBar } from "expo-status-bar";
import React from 'react'
import { ProductDetails } from '../components';
import { themes } from '../constants/themes';
import { Ionicons } from '@expo/vector-icons';

const ProductDetailsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.container}>
      <View style={styles.detailesGrid}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back-circle' size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={24} />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 12,
  },
  detailesGrid: {
      marginHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      top: themes.THEME.sizes.xxLarge,
      // width: themes.THEME.sizes.width -44,
      zIndex: 999,
    }
})