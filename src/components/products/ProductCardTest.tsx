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
import { ImageSliderType } from "../slider/SliderData";

const isIOS = Platform.OS === "ios";

interface Products {
  item: ImageSliderType;
  index: number;
}

const ProductCardTest = ({item, index}: Products) => {
  
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.productImage} />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.title}>Lorem ipsum dolor sit amet.</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardTest;

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    // marginEnd: 22,
    borderRadius: themes.THEME.sizes.medium,
    backgroundColor: themes.THEME.colors.white,
    // ...(isIOS
    //   ? {
    //       shadowColor: "black",
    //       shadowOffset: { width: 0, height: 10 },
    //       shadowRadius: 10,
    //       shadowOpacity: 0.1,
    //     }
    //   : {
    //       elevation: 5,
    //     }),
  },
  imageContainer: {
    flex: 1,
    width: 170,
    marginTop: themes.THEME.sizes.small/2.5,
    marginLeft: themes.THEME.sizes.small/2.5,
    borderRadius: themes.THEME.sizes.small,
    backgroundColor:  themes.THEME.colors.gray2,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    overflow: "hidden",
  },
  productDetails: {
    padding: themes.THEME.sizes.small,
    alignItems: "flex-start",
  },
  title: {
    
  }
});
