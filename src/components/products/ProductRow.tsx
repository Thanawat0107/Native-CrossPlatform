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
import { useGetGroupsQuery } from "../../fetch/groupsApi";
import Loading from "../Loading";
import { useAppDispatch } from "../../hooks/useAppHookState";
import { setHerbs } from "../../store/slices/herbsSlice";

const ProductRow = () => {
  const {
    data: herbs,
    isLoading: herbsLoading,
    isError: herbsError,
    refetch: refetchHerbs,
  } = useGetHerbsQuery(null);
  const {
    data: groups,
    isLoading: groupsLoading,
    isError: groupsError,
  } = useGetGroupsQuery(null);
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (herbs) {
      dispatch(setHerbs(herbs));
    }
  }, [herbs, dispatch]);

  const handleRefresh = () => {
    refetchHerbs();
  }

  if (herbsLoading || groupsLoading) return <Loading />;
  if (herbsError || groupsError) return <Text style={{ color: "red" }}>Failed to load data</Text>;

  return (
    <View style={styles.productGrid}>
      <FlatList
        data={herbs}
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
