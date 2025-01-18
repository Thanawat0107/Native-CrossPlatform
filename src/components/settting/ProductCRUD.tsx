import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SIZES } from '../../constants/themes'
import { Ionicons } from '@expo/vector-icons'
import { useAppNavigation } from '../../hooks/useAppNavigation'

const ProductCRUD = () => {
  const navigation = useAppNavigation();
  return (
    <View>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
      </View>

      <View style={{ top: SIZES.xxLarge }}>
        <View>
          <Text> ProductList </Text>
        </View>

        <View>
          
        </View>
      </View>
    </View>
  );
}

export default ProductCRUD

const styles = StyleSheet.create({
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    top: SIZES.xxLarge,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});