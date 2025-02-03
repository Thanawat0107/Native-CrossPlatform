import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useGetHerbsQuery } from "../../fetch/herbsApi";
import Loading from "../Loading";
import { SIZES } from "../../constants/themes";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { data: herbs, isLoading } = useGetHerbsQuery(null);

  if (isLoading) return <Loading />;
  return (
    <View style={styles.container}>
      <FlatList
        data={herbs}
        numColumns={2}
        renderItem={({item}) => < ProductCard herb={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
       />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: SIZES.xxLarge,
    paddingLeft: SIZES.small / 2,
  },
  separator: {
    height: 16,
  }
});
