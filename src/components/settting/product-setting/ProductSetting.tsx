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
import { useGetHerbsQuery } from "../../../fetch/herbsApi";
import Loading from "../../Loading";
import ProductItem from "./ProductItem";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppHookState";
import { setHerbs } from "../../../store/slices/herbsSlice";
import { isIOS } from "../../../helpers/SD";

const ProductSetting = () => {
  const navigation = useAppNavigation();
  const { data, isLoading, isError, refetch } = useGetHerbsQuery(null);
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.herbs.herbs);

  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(state)) {
      dispatch(setHerbs(data));
    }
  }, [data ,dispatch, state]);

  const handleRefresh = () => {
    refetch();
  }

  const handleGoBack = () => navigation.goBack();
  const handleAddProduct = () => navigation.navigate("ProductUpsert",{ herb: undefined });

  if (isLoading) return <Loading />
  if (isError) return <Text style={{ color: 'red' }}>Failed to load herbs</Text>;
  if (!data?.length) return <Text>No herbs available</Text>;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>

           <Text style={styles.heading}>จัดการสินค้า</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: SIZES.xxLarge,
          }}
        >
          <Text style={styles.txtMain}>
            รายการสมุนไพร [ {state.length || 0} ]
          </Text>
          <TouchableOpacity onPress={handleAddProduct}>
            <Ionicons name="add-circle" size={60} color={COLORS.green} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data || []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem herb={item} />}
          initialNumToRender={10}
          refreshing={isLoading}
          onRefresh={handleRefresh}
        />
      </View>
    </>
  );
};

export default ProductSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.xsLarge,
    marginBottom: isIOS ? 10 : 0,
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.green3,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },
  heading: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginHorizontal: 10,
  },
  txtMain: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
