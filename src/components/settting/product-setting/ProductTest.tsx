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
import { isIOS } from "../../../helpers/SD";
import { StatusBar } from "expo-status-bar";
import { useGetHerbsQuery } from "../../../fetch/herbsApi";
import Loading from "../../Loading";
import ProductItem from "./ProductItem";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHookState";
import { setHerbs } from "../../../store/slices/herbsSlice";

const ProductTest = () => {
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
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={30} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={styles.txtMain}>Herbs List {selector.herbs.length}</Text>
          <TouchableOpacity>
            <Ionicons name="add-circle" size={60} color={COLORS.green} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={herbs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem herb={item} />}
        />
      </SafeAreaView>
    </>
  );
};

export default ProductTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.xsLarge,
    marginBottom: isIOS ? 55 : 55,
  },
  upperRow: {
    // flexDirection: "row",
    // zIndex: 999,
  },
  addBtn:{
    // position: "absolute",
    // bottom: SIZES.xSmall,
    // right: SIZES.xSmall
  },
  txtMain: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
