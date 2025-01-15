import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  Image,
  Text,
} from "react-native";
import React from "react";
import { themes } from "../../constants/themes";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../@types/navigation";
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
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Exercitationem, libero?
        </Text>
        <Text style={styles.categoty} numberOfLines={1}>
          {" "}
          HerbGood!{" "}
        </Text>
        <Text style={styles.productPrice} numberOfLines={1}>
          {" "}
          $550{" "}
        </Text>
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Ionicons
          name="add-circle"
          size={35}
          color={themes.THEME.colors.green}
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
    borderRadius: themes.THEME.sizes.medium,
  },

  imageWepper: {
    borderRadius: themes.THEME.sizes.medium,
    backgroundColor: "#6c757d",
    marginTop: 5,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  productImage: {
    height: 160,
    width: "100%",
    borderRadius: themes.THEME.sizes.medium,
    resizeMode: "cover",
  },
  contentContainer: {
     padding: themes.THEME.sizes.small,
  },
  productName: {
    color: "#444444",
    fontSize: themes.THEME.sizes.large,
    fontFamily: "bold",
    marginBottom: 5,
  },
  categoty: {
    color: "#737373",
    fontFamily: "regular",
    fontSize: themes.THEME.sizes.small,
    marginBottom: 2,
  },
  productPrice: {
    fontSize: themes.THEME.sizes.large,
    color: "#5B41FF",
    fontFamily: "medium",
  },
  addBtn:{
    position: "absolute",
    bottom: themes.THEME.sizes.xSmall,
    right: themes.THEME.sizes.xSmall
  }
});
