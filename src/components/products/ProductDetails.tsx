import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView } from "react-native";
import React, {useState} from "react";
import { COLORS, SIZES } from "../../constants/themes";
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../@types/navigation";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { StatusBar } from "expo-status-bar";
import { wp } from "../../helpers/common";

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "ProductDetails">;

const ProductDetails = () => {
  const navigation = useAppNavigation();
  const route = useRoute<ProductDetailsRouteProp>();
  const { productId } = route.params;

  const [count, setCount] = useState<number>(1);

  const increment = () => {
    setCount(count + 1);
  }
  const decrement = () => {
    if(count > 1) {
      setCount(count - 1);
    }
  }

  return (
    <>
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
            <Ionicons name="heart" size={30} color={COLORS.primary} />
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
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>$ 550.00</Text>
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
              <TouchableOpacity onPress={() => increment()}>
                <SimpleLineIcons name="plus" size={20} />
              </TouchableOpacity>

              <Text style={styles.ratingText}>{count}</Text>

              <TouchableOpacity onPress={() => decrement()}>
                <SimpleLineIcons name="minus" size={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.descText}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              corrupti enim tempora rem, expedita quia sequi fugiat maxime eos.
              Qui?
            </Text>
          </View>

          <View style={{ marginBottom: SIZES.small }}>
            <View style={styles.location}>

              <View style={{ flexDirection: "row" }}>
                <Ionicons name="location-outline" size={20} />
                <Text>  Dallas</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
                <Text>  Free Delivery  </Text>
              </View>

            </View>
          </View>
          
          <View style={styles.cartRow}>

          </View>

        </View>
      </View>
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
    height: 440,
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
    fontFamily: "medium",
    fontSize: SIZES.large - 2,
  },
  descText: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
    marginBottom: SIZES.small,
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.gray2,
    marginHorizontal: 20,
    padding: 5,
    borderRadius: SIZES.large,
  },
  cartRow: {
    
  }
});