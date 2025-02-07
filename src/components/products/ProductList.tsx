import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useGetHerbsQuery } from "../../fetch/herbsApi";
import Loading from "../Loading";
import { SIZES } from "../../constants/themes";
import ProductCard from "./ProductCard";
import { useAppDispatch } from "../../hooks/useAppHookState";
import { setHerbs } from "../../store/slices/herbsSlice";

const ProductList = () => {
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
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({item}) => < ProductCard herb={item} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshing={isLoading}
        onRefresh={handleRefresh}
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
