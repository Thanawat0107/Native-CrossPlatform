import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../../constants/themes";
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { RootStackParamList } from "../../../@types/navigation";
import { wp } from "../../helpers/common";
import { useGetHerbByIdQuery } from "../../fetch/herbsApi";
import InfoText from "./InfoText";
import NutritionalValueList from "./NutritionalValueList";
import PropertyList from "./PropertyList";
import ExpandableInfo from "../slider/ExpandableInfo";
import Loading from "../Loading";
import { useAppDispatch } from "../../hooks/useAppHookState";
import { setHerbs } from "../../store/slices/herbsSlice";

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

const ProductDetails = () => {
  const navigation = useAppNavigation();
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;
  const dispatch = useAppDispatch();

  const { data: herb, isLoading, isError } = useGetHerbByIdQuery(productId);
  useEffect(() => {
    if(herb) {
      dispatch(setHerbs(herb));
    }
  },[herb, dispatch]);
  
  const [count, setCount] = useState(1);
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : prev));

  if (isLoading) return <Loading />;
  if (isError) return <Text style={{ color: "red" }}>Failed to load herbs</Text>;

  const selectedName = herb?.other_names?.length 
  ? herb.other_names[0] 
  : "ชื่อสมุนไพร";

  const propertiesData = herb?.properties
    ? Object.entries(herb.properties).map(([key, value]) => ({
        label: `คุณสมบัติ : ${key}`,
        value: Array.isArray(value) ? value.join(", ") : value,
      }))
    : [];

  const nutritionalValueData = herb?.nutritional_value
    ? Object.entries(herb.nutritional_value).map(([key, value]) => ({
        label: `คุณค่าทางโภชนาการ : ${key}`,
        value: Array.isArray(value) ? value.join(", ") : value,
      }))
    : [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.imageWepper}>
        <Image
          source={{ uri: `${herb.imageUrl}` }}
          style={styles.productImage}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{selectedName}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$ {herb.price}</Text>
          </View>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>

          <View style={styles.rating}>
            <TouchableOpacity onPress={() => decrement()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>

            <Text style={styles.ratingText}>{count}</Text>

            <TouchableOpacity onPress={() => increment()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>คำอธิบายพฤกษศาสตร์</Text>
          <Text style={styles.descText}>{herb.botanical_description}</Text>
        </View>

        <View style={{ marginHorizontal: SIZES.large }}>
          <ExpandableInfo label="ข้อมูลสมุนไพรเพิ่มเติม">
            <InfoText label="กลุ่มยาสมุนไพร" value={herb.group} />
            <InfoText label="ชื่อวิทยาศาสตร์" value={herb.scientific_name} />
            <InfoText label="ชื่อสามัญ" value={herb.common_names} />
            <InfoText label="ตระกูล" value={herb.family} />

            <PropertyList data={propertiesData} />

            <InfoText label="วิธีใช้" value={herb.usage?.method} />
            <InfoText label="ปริมาณการใช้" value={herb.usage?.dosage} />
            <InfoText
              label="องค์ประกอบทางเคมี"
              value={herb.chemical_composition}
            />

            <NutritionalValueList data={nutritionalValueData} />
          </ExpandableInfo>
        </View>

        <View style={{ marginBottom: SIZES.small }}>
          <View style={styles.location}>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="location-outline" size={20} />
              <Text> Dallas</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
              <Text> Free Delivery </Text>
            </View>
          </View>
        </View>

        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>BUY NOW </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.addCart}>
            <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
  },
  imageWepper: {
    width: wp(100),
    height: wp(100),
    backgroundColor: "#6c757d",
    overflow: "hidden",
  },
  productImage: {
    aspectRatio: 1,
    resizeMode: "cover",
    overflow: "hidden",
  },
  contentContainer: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 44,
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
    width: SIZES.width - 10,
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
    paddingHorizontal: SIZES.xSmall,
  },

  priceWrapper: {
    backgroundColor: "#5B41FF",
    borderRadius: SIZES.large,
  },
  price: {
    paddingHorizontal: 10,
    fontFamily: "medium",
    fontSize: SIZES.large,
    color: "yellow",
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontFamily: "bold",
    marginBottom: 5,
    fontSize: SIZES.large - 2,
  },
  descText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  test: {
    marginHorizontal: SIZES.large,
    marginBottom: 10,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.gray2,
    marginHorizontal: 12,
    padding: 5,
    borderRadius: SIZES.large,
  },
  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width,
  },
  cartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    padding: SIZES.small / 2,
    borderRadius: SIZES.large,
    marginLeft: 12,
  },
  cartTitle: {
    marginLeft: SIZES.small,
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },
  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
  },
});
