import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { themes } from '../../constants/themes'
import { Ionicons } from '@expo/vector-icons'

const ProductDetails = ({navigation}) => {
  return (
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
  )
}

export default ProductDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});