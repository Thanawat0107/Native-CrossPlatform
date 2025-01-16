import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  Image,
  Text,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/themes";
import { Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../hooks/useAppNavigation";

const isIOS = Platform.OS === "ios";

interface Products {
  item: any;
  index: number;
}

const ProductCard = ({item, index}: Products) => {
  const navigation = useAppNavigation();
  
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { productId: "123" })}
      style={styles.container}
    >
      <View style={styles.imageWepper}>
        <Image source={item.image} style={styles.productImage} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          ProductName
        </Text>
        <Text style={styles.categoty} numberOfLines={1}>
          HerbGood!
        </Text>
        <Text style={styles.productPrice} numberOfLines={1}>
          $550
        </Text>
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Ionicons
          name="add-circle"
          size={35}
          color={COLORS.green}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: isIOS ? 182 : 184,
    height: 260,
    marginEnd: 22,
    ...(isIOS
      ? {
          shadowColor: "black",
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 10,
          shadowOpacity: 0.1,
        }
      : {
          elevation: 5,
        }),
    backgroundColor: "#FFFFFF",
    borderRadius: SIZES.medium,
  },

  imageWepper: {
    borderRadius: SIZES.medium,
    backgroundColor: "#6c757d",
    marginTop: 5,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 160,
    borderRadius: SIZES.medium,
    resizeMode: "cover",
  },
  contentContainer: {
     padding: SIZES.small,
  },
  productName: {
    color: "#444444",
    fontSize: SIZES.large,
    fontFamily: "bold",
    marginBottom: 5,
  },
  categoty: {
    color: "#737373",
    fontFamily: "regular",
    fontSize: SIZES.small,
    marginBottom: 2,
  },
  productPrice: {
    fontSize: SIZES.large,
    color: "#5B41FF",
    fontFamily: "medium",
  },
  addBtn:{
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall
  }
});
