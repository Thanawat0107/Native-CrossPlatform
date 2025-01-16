import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/themes";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../@types/navigation";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { wp } from "../../helpers/common";

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

const ProductDetails = () => {
  const navigation = useAppNavigation();
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons
            name="heart"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    // width: wp(100),
    // height: 400,
    // backgroundColor: themes.THEME.COLORS.lightWhite,
    flex: 1,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: "90%",
    zIndex: 999,
  },
  imageWepper: {
    backgroundColor: "#6c757d",
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  contentContainer: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(-44),
    top: 20,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(-10),
    top: 5,
  },
  rating: {
    top: SIZES.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: "medium",
  },

  priceWepper: {
    backgroundColor: COLORS.green,
    borderRadius: SIZES.large,
  },
  price: {
    paddingHorizontal: 10,
    fontFamily: "medium",
    fontSize: SIZES.large,
  },
});
