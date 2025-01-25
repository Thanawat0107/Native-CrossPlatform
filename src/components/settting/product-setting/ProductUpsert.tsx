import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAppNavigation } from '../../../hooks/useAppNavigation'
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../@types';

type ProductUpsertRouteProp = RouteProp<RootStackParamList, "ProductUpsert">;

const ProductUpsert = ({ route }: { route: ProductUpsertRouteProp }) => {
    const navigation = useAppNavigation();
    const herb = route.params?.herb;
    const isEditMode = !!herb;
    return (
    <View style={styles.container}>
      <Text>{isEditMode ? `Edit: ${herb.name}` : "Add New Product"}</Text>
    </View>
  )
}

export default ProductUpsert

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", margin: "auto" },
});