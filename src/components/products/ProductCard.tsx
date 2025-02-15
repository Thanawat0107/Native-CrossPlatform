import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/themes";
import { Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { Group, Herb } from "../../../@types";
import { isIOS } from "../../helpers/SD";
import { hp, wp } from "../../helpers/common";

interface Props {
  herbs: Herb;
  groups: Group[]
}

const ProductCard = ({ herbs, groups }: Props) => {
  const navigation = useAppNavigation();
  const groupName = groups.find((g: any) => g.id === herbs.groupId)?.name || "";
  const selectedName = herbs.other_names[0];

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ProductDetails", { productId: herbs.id })
      }
      style={styles.container}
    >
      <View style={styles.imageWepper}>
        <Image
          source={{ uri: `${herbs.imageUrl}` }}
          style={styles.productImage}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {selectedName}
        </Text>
        <Text style={styles.categoty} numberOfLines={1}>
          {groupName}
        </Text>
        <Text style={styles.productPrice} numberOfLines={1}>
          ${herbs.price}
        </Text>
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Ionicons name="add-circle" size={35} color={COLORS.green} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: wp(42.3),
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
    height: isIOS ? hp(18) : hp(15),
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
