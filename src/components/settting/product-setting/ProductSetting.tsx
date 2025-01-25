import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity
} from "react-native";
import React, { useEffect } from "react";
import { COLORS, SIZES } from "../../../constants/themes";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { StatusBar } from "expo-status-bar";
import { useGetHerbsQuery } from "../../../fetch/herbsApi";
import Loading from "../../Loading";
import ProductItem from "./ProductItem";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHookState";
import { setHerbs } from "../../../store/slices/herbsSlice";

const ProductSetting = () => {
  const navigation = useAppNavigation();
  const { data, isLoading, isError } = useGetHerbsQuery(null);
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.herbs);

  useEffect(() => {
    if (data && data !== state.herbs) {
      dispatch(setHerbs(data));
    }
  }, [data, state.herbs ,dispatch]);

  const handleGoBack = () => navigation.goBack();
  const handleAddProduct = () => navigation.navigate("ProductUpsert",{ herb: undefined });

  if (isLoading) return <Loading />
  if (isError) return <Text style={{ color: 'red' }}>Failed to load herbs</Text>;
  if (!data?.length) return <Text>No herbs available</Text>;

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>

        <TouchableOpacity
          onPress={handleGoBack}
          style={{ top: SIZES.xSmall }}
        >
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.txtMain}>Herbs List {state.herbs?.length || 0}</Text>
          <TouchableOpacity onPress={handleAddProduct}>
            <Ionicons name="add-circle" size={60} color={COLORS.green} />
          </TouchableOpacity>

        </View>

        <FlatList
          data={data || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem herb={item} />}
          initialNumToRender={10}
        />
      </SafeAreaView>
    </>
  );
};

export default ProductSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.xsLarge,
    marginBottom: 55,
  },
  txtMain: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
