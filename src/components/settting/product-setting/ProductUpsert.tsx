import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAppNavigation } from '../../../hooks/useAppNavigation'
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../../@types';

type ProductUpsertRouteProp = RouteProp<RootStackParamList>;

const ProductUpsert = () => {
    const navigation = useAppNavigation();
    const route = useRoute<ProductUpsertRouteProp>();

    const [productName, setProductName] = useState(route?.params?.name || "");
    const [productPrice, setProductPrice] = useState(route?.params?.price || "");
    const [productDescription, setProductDescription] = useState(route?.params?.description || "");
  
    const isEdit = !!route?.params; // ตรวจสอบว่าเป็นการแก้ไขหรือไม่
    return (
    <View>
      <Text>ProductUpsert</Text>
    </View>
  )
}

export default ProductUpsert

const styles = StyleSheet.create({
    
});