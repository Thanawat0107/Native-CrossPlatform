import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SIZES } from "../../constants/themes";
import ProductCard from "./ProductCard";
import { useGetHerbsQuery } from "../../fetch/herbsApi";
import Loading from "../Loading";
import { useAppDispatch } from "../../hooks/useAppHookState";
import { setHerbs } from "../../store/slices/herbsSlice";
import { useGetGroupsQuery } from "../../fetch/groupsApi";
import { setGroups } from "../../store/slices/groupsSlice";

const ProductRow = () => {
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (herbs && groups) {
      dispatch(setHerbs(herbs));
      dispatch(setGroups(groups));
    }
  }, [herbs, groups, dispatch]);

  const handleRefresh = () => {
    refetchHerbs();
  };

  if (herbsLoading || groupsLoading) return <Loading />;
  if (herbsError || groupsError)
    return <Text style={{ color: "red" }}>Failed to load data</Text>;

  return (
    <View style={styles.productGrid}>
      <FlatList
        data={herbs}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => <ProductCard herbs={item} groups={groups} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small }}
        refreshing={herbsLoading}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default ProductRow;

const styles = StyleSheet.create({
  productGrid: { marginTop: SIZES.large },
});
