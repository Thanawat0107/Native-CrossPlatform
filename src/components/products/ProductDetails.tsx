import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import React, {useState} from "react";
import { COLORS, SIZES } from "../../constants/themes";
import { Fontisto, Ionicons, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { RootStackParamList } from "../../../@types/navigation";
import { wp } from "../../helpers/common";
import { useGetHerbsQuery } from "../../fetch/herbsApi";
import { baseUrl } from "../../helpers/SD";

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

const ProductDetails = () => {
  const navigation = useAppNavigation();
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;

  const { data: herbs } = useGetHerbsQuery(null); // ดึงข้อมูลสมุนไพรทั้งหมด
  const herb = herbs?.find((h: any) => h.id === productId); // ค้นหาสมุนไพรตาม productId

  if (!herb) return <Text>Product not found</Text>;

  const selectedName = herb.other_names[0];

  const [count, setCount] = useState<number>(1);

  const increment = () => setCount(count + 1);
  const decrement = () => count > 1 && setCount(count - 1);

  return (
    <>
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
            source={{ uri: `${baseUrl}${herb.imageUrl}` }}
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
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>กลุ่มยาสมุนไพร</Text>
            <Text>{herb.group}</Text>
          </View>
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>ชื่อวิทยาศาสตร์</Text>
            <Text>{herb.scientific_name}</Text>
          </View>
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>ชื่อสามัญ</Text>
            <Text>{herb.common_names}</Text>
          </View>
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>ตระกูล</Text>
            <Text>{herb.family}</Text>
          </View>

          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>คุณสมบัติ : กลีบเลี้ยง</Text>
            <Text>{herb.properties.calyx}</Text>
          </View>
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>คุณสมบัติ : ใบ</Text>
            <Text>{herb.properties.leaves}</Text>
          </View>
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>คุณสมบัติ : ผล</Text>
            <Text>{herb.properties.fruit}</Text>
          </View>
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>คุณสมบัติ : เมล็ดพันธุ์</Text>
            <Text>{herb.properties.seeds}</Text>
          </View>
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>คุณสมบัติ : ทั่วไป</Text>
            <Text>{herb.properties.general}</Text>
          </View>
          
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>วิธี : การใช้งาน</Text>
            <Text>{herb.usage.method}</Text>
          </View>
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>ปริมาณ : การใช้งาน</Text>
            <Text>{herb.usage.dosage}</Text>
          </View>

          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>ปริมาณ : การใช้งาน</Text>
            <Text>{herb.usage.dosage}</Text>
          </View>

          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>องค์ประกอบทางเคมี</Text>
            <Text>{herb.chemical_composition}</Text>
          </View>

          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>คุณค่าทางโภชนาการ : เครื่องดื่ม</Text>
            <Text>{herb.nutritional_value.beverage}</Text>
          </View>
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>คุณค่าทางโภชนาการ : อาหาร</Text>
            <Text>{herb.nutritional_value.food}</Text>
          </View>
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>คุณค่าทางโภชนาการ : วิตามิน</Text>
            <Text>{herb.nutritional_value.vitamins}</Text>
          </View>
          <View style={styles.test}>
            <Text style={{fontFamily: "bold"}}>คุณค่าทางโภชนาการ : สีอาหาร</Text>
            <Text>{herb.nutritional_value.coloring}</Text>
          </View>

          <View style={{ marginBottom: SIZES.small }}>
            <View style={styles.location}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="location-outline" size={20} />
                <Text> Dallas</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  size={20}
                />
                <Text> Free Delivery </Text>
              </View>
            </View>
          </View>

          <View style={styles.cartRow}>
            <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
              <Text style={styles.cartTitle}>BUY NOW </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}} style={styles.addCart}>
              <Fontisto
                name="shopping-bag"
                size={22}
                color={COLORS.lightWhite}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
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
    padding: SIZES.small/2,
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