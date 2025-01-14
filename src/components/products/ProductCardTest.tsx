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

const isIOS = Platform.OS === "ios";

interface Products {
  item: any;
  index: number;
}

const ProductCardTest = ({item, index}: Products) => {
  
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>

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
    backgroundColor: themes.THEME.colors.gray2,
  },
  imageContainer: {
    flex: 1,
    width: 170,
    marginLeft: themes.THEME.sizes.small/2,
    marginTop: themes.THEME.sizes.small/2,
    borderRadius: themes.THEME.sizes.small,
    overflow: "hidden"
  },
});
