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
  const { data: herbs, isLoading, error } = useGetHerbsQuery(null);
  const dispatch = useAppDispatch();
  const selector = useAppSelector(state => state.herbs);

  useEffect(() => {
    if (herbs) {
      dispatch(setHerbs(herbs));
    }
  }, [herbs, dispatch]);

  if (isLoading) return <Loading />
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Failed to fetch data. Please try again later.</Text>
      </SafeAreaView>
    );
  }
  
  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
          <Text style={styles.txtMain}>Herbs List {selector.herbs?.length || 0}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("ProductUpsert")}>
            <Ionicons name="add-circle" size={60} color={COLORS.green} />
          </TouchableOpacity>

        </View>

        <FlatList
          data={herbs || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem herb={item} />}
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
