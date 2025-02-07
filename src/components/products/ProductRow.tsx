import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SIZES } from "../../constants/themes";
import ProductCard from "./ProductCard";
import { useGetHerbsQuery } from "../../fetch/herbsApi";
import Loading from "../Loading";
import { useAppDispatch } from "../../hooks/useAppHookState";
import { setHerbs } from "../../store/slices/herbsSlice";

const ProductRow = () => {
  const { data, isLoading, isError, refetch } = useGetHerbsQuery(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setHerbs(data));
    }
  }, [data, dispatch]);

  const handleRefresh = () => {
    refetch();
  }

  if (isLoading) return <Loading />;
  if (isError) return <Text style={{ color: "red" }}>Failed to load herbs</Text>;

  return (
    <View style={styles.productGrid}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => <ProductCard herb={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small }}
        refreshing={isLoading}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default ProductRow;

const styles = StyleSheet.create({
  productGrid: { marginTop: SIZES.large },
});
