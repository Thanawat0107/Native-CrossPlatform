import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES } from '../../constants/themes';
import ProductCard from './ProductCard';
import { imgSlider } from '../slider/SliderData';
import { useGetHerbsQuery } from '../../fetch/herbsApi';

const ProductList = () => {
  const { data: herbs, isLoading, isError, error } = useGetHerbsQuery(null);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  // if (isError) return <Text>Error: {error}</Text>;
  return (
    <View style={styles.productGrid}>
      <FlatList
        data={imgSlider}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        renderItem={({ item, index }) => <ProductCard item={item} index={index} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small }}
      />
    </View>
  );
}

export default ProductList

const styles = StyleSheet.create({
  productGrid: { marginTop: SIZES.large },
});