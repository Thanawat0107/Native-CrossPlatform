import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES } from '../../constants/themes';
import ProductCard from './ProductCard';
import { useGetHerbsQuery } from '../../fetch/herbsApi';

const ProductList = () => {
  const { data: herbs, isLoading, isError, error } = useGetHerbsQuery(null);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (isError) return <Text>Error: {error.error}</Text>;

  return (
    <View style={styles.productGrid}>
      <FlatList
        data={herbs}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => <ProductCard herb={item} />}
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