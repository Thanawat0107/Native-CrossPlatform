import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { themes } from "../../constants/themes";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../@types/navigation";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { wp } from "../../helpers/common";
import { StatusBar } from "expo-status-bar";

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

const ProductDetails = () => {
  const navigation = useAppNavigation();
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.detailesGrid}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={themes.THEME.colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons
            name="heart"
            size={30}
            color={themes.THEME.colors.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.imageWepper}>
        <Image
          source={require("../../../assets/images/image4.jpg")}
          style={styles.productImage}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>ProductName</Text>
          <View style={styles.priceWepper}>
            <Text style={styles.price}>$ 550.00</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}

            <Text style={styles.ratingText}> (4.9)</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={() => {}}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
              <Text style={styles.ratingText}> 1 </Text>
            <TouchableOpacity onPress={() => {}}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: 400,
    backgroundColor: themes.THEME.colors.lightWhite,
  },
  detailesGrid: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: themes.THEME.sizes.xxLarge,
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
    marginTop: -themes.THEME.sizes.large,
    backgroundColor: themes.THEME.colors.lightWhite,
    borderTopLeftRadius: themes.THEME.sizes.medium,
    borderTopRightRadius: themes.THEME.sizes.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: themes.THEME.sizes.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(-44),
    top: 20,
  },
  title: {
    fontFamily: "bold",
    fontSize: themes.THEME.sizes.large,
  },
  ratingRow: {
    paddingBottom: themes.THEME.sizes.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: wp(-10),
    top: 5,
  },
  rating: {
    top: themes.THEME.sizes.large,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: themes.THEME.sizes.large,
  },
  ratingText: {
    color: themes.THEME.colors.gray,
    fontFamily: "medium",
  },

  priceWepper: {
    backgroundColor: themes.THEME.colors.green,
    borderRadius: themes.THEME.sizes.large,
  },
  price: {
    paddingHorizontal: 10,
    fontFamily: "medium",
    fontSize: themes.THEME.sizes.large,
  },
});
