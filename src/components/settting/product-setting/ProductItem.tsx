import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useMemo, useState } from "react";
import { Group, Herb } from "../../../../@types";
import { COLORS, SIZES } from "../../../constants/themes";
import { hp, wp } from "../../../helpers/common";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { useDeleteHerbMutation } from "../../../fetch/herbsApi";
import { useAppDispatch } from "../../../hooks/useAppHookState";
import { removeHerb } from "../../../store/slices/herbsSlice";

interface Props {
  herbs: Herb;
  groups: Group[];
}

const ProductItem = React.memo(
  ({ herbs, groups }: Props) => {
    const navigation = useAppNavigation();
    const [imageLoading, setImageLoading] = useState(true);
    const selectedName = herbs.other_names[0];
    const [deleteHerbApi] = useDeleteHerbMutation();
    const dispatch = useAppDispatch();
    const groupName = useMemo(() => {
      return groups.find((g) => g.id === herbs.groupId)?.name || "";
    }, [groups, herbs.groupId]);

    const handleEdit = () => {
      navigation.navigate("ProductUpsert", { herbs, groups });
    };

    const handleDelete = async () => {
      Alert.alert(
        "ยืนยันการลบ",
        `คุณต้องการลบ ${herbs.other_names[0]} หรือไม่?`,
        [
          { text: "ยกเลิก", style: "cancel" },
          {
            text: "ลบ",
            onPress: async () => {
              try {
                const response = await deleteHerbApi(herbs.id).unwrap();
                dispatch(removeHerb(response));
              } catch (error) {
                console.error("Failed to delete:", error);
              }
            },
            style: "destructive",
          },
        ]
      );
    };

    return (
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: `${herbs.imageUrl}` }}
              style={styles.productImage}
              onLoad={() => setImageLoading(false)}
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
              {selectedName}
            </Text>
            <Text style={styles.itemDescription} numberOfLines={1}>
              {groupName}
            </Text>
            <Text style={styles.itemDescription} numberOfLines={1}>
              ราคา : {herbs.price} บาท
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() => console.log(`View details of ${herbs.id}`)}
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
  (prevProps, nextProps) => prevProps.herbs === nextProps.herbs
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
