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
          <Image source={item.image} style={styles.image} />
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
    marginEnd: 22,
    borderRadius: themes.THEME.sizes.medium,
    backgroundColor: themes.THEME.colors.white,
  },
  imageContainer: {
    flex: 1,
    width: 170,
    marginLeft: themes.THEME.sizes.small/2,
    marginTop: themes.THEME.sizes.small/2,
    borderRadius: themes.THEME.sizes.small,
    overflow: "hidden",
    backgroundColor:  themes.THEME.colors.gray2
  },
  image: {
    width: "100%",
    height: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    overflow: "hidden",
  }
});
