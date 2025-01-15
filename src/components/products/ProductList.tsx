import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { themes } from '../../constants/themes';
import ProductCard from './ProductCard';
import { imgSlider } from '../slider/SliderData';

const ProductList = () => {
  return (
    <View style={styles.productGrid}>
      <FlatList
        data={imgSlider}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        renderItem={({ item, index }) => <ProductCard item={item} index={index} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: themes.THEME.sizes.small }}
      />
    </View>
  );
}

export default ProductList

const styles = StyleSheet.create({
  productGrid: { marginTop: themes.THEME.sizes.large },
});