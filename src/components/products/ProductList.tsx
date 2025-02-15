import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useGetHerbsQuery } from "../../fetch/herbsApi";
import Loading from "../Loading";
import { SIZES } from "../../constants/themes";
import ProductCard from "./ProductCard";
import { useAppDispatch } from "../../hooks/useAppHookState";
import { setHerbs } from "../../store/slices/herbsSlice";
import { useGetGroupsQuery } from "../../fetch/groupsApi";
import { setGroups } from "../../store/slices/groupsSlice";

const ProductList = () => {
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
    <View style={styles.container}>
      <FlatList
        data={herbs}
        numColumns={2}
        renderItem={({ item }) => <ProductCard herbs={item} groups={groups} />}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshing={herbsLoading}
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
  },
});
