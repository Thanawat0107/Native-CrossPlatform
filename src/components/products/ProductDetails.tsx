import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { themes } from '../../constants/themes'
import { Ionicons } from '@expo/vector-icons'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../@types/navigation'
import { useAppNavigation } from '../../hooks/useAppNavigation'

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

const ProductDetails = () => {
  const navigation = useAppNavigation();
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;

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
    width: -44,
    zIndex: 999,
  }
});