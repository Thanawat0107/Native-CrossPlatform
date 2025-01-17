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
import { Herb } from "../../../@types";
import { baseUrl } from "../../helpers/SD";

const isIOS = Platform.OS === "ios";

const ProductCard = ({ herb }: { herb: Herb }) => {
  const navigation = useAppNavigation();
  
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { productId: herb.id })}
      style={styles.container}
    >
      <View style={styles.imageWepper}>
        <Image source={{ uri: `${baseUrl}${herb.imageUrl}` }} style={styles.productImage} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {herb.name}
        </Text>
        <Text style={styles.categoty} numberOfLines={1}>
          {herb.type}
        </Text>
        <Text style={styles.productPrice} numberOfLines={1}>
          ${herb.price}
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
    // height: isIOS ? 270 : 235,
    marginEnd: 22,
    backgroundColor: COLORS.white,
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
    height: isIOS ? 160 : 120,
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
    marginBottom: 2,
  },
  categoty: {
    color: "#737373",
    fontFamily: "regular",
    fontSize: SIZES.small,
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
