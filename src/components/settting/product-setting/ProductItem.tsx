import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Herb } from "../../../../@types";
import { baseUrl } from "../../../helpers/SD";
import { COLORS, SIZES } from "../../../constants/themes";
import { hp, wp } from "../../../helpers/common";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../../hooks/useAppNavigation";

const ProductItem = React.memo(({ herb }: { herb: Herb }) => {
    const navigation = useAppNavigation();
    const [imageLoading, setImageLoading] = useState(true);

    const handleEdit = () => {
      navigation.navigate("ProductUpsert", { herb });
    };

    const handleDelete = () => {
      console.log(`Delete product with id: ${herb.id}`);
    };

    return (
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: `${baseUrl}${herb.imageUrl}` }}
              style={styles.productImage}
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
            />
            {imageLoading && (
              <ActivityIndicator
                size="small"
                color={COLORS.gray}
                style={styles.imageLoader}
              />
            )}
          </View>

          <View style={styles.detailsWrapper}>
            <Text style={styles.itemName} numberOfLines={1}>
              {herb.name}
            </Text>
            <Text style={styles.itemDescription} numberOfLines={1}>
              หมวดหมู่ : {herb.categories}
            </Text>
            <Text style={styles.itemDescription} numberOfLines={1}>
              ราคา : {herb.price} บาท
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => console.log(`View details of ${herb.id}`)}
              style={styles.button}
            >
              <Ionicons name="eye" size={24} color={COLORS.gray} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEdit} style={styles.button}>
              <AntDesign name="edit" size={24} color={COLORS.tertiary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.button}>
              <AntDesign name="delete" size={24} color={COLORS.red} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => prevProps.herb === nextProps.herb
);

export default ProductItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 5,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: SIZES.medium,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageWrapper: {
    width: wp(20),
    height: hp(10),
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.gray,
    overflow: "hidden",
    marginRight: 10,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.medium,
    resizeMode: "cover",
  },
  imageLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  detailsWrapper: {
    width: wp(40),
    marginEnd: 5,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: COLORS.gray,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    margin: 7,
  },
});
