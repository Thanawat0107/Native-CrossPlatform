import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES } from '../../constants/themes';
import ProductCard from './ProductCard';
import { useGetHerbsQuery } from '../../fetch/herbsApi';
import Loading from '../Loading';

const ProductRow = () => {
  const { data: herbs, isLoading} = useGetHerbsQuery(null);

  if (isLoading) return <Loading />;

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

export default ProductRow

const styles = StyleSheet.create({
  productGrid: { marginTop: SIZES.large },
});