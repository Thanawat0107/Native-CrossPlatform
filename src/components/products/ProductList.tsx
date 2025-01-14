import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { themes } from '../../constants/themes';
import ProductCard from './ProductCard';
import ProductCardTest from './ProductCardTest';

const ProductGrid = () => {
const products = [1, 2, 3, 4];
  return (
    <View style={styles.productGrid}>
      <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        renderItem={({ item, index }) => <ProductCardTest item={item} index={index} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: themes.THEME.sizes.medium }}
      />
    </View>
  );
}

export default ProductGrid

const styles = StyleSheet.create({
  productGrid: { marginTop: themes.THEME.sizes.medium },
  
});