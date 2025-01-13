import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { ImageSliderType } from "./SliderData";
import { wp } from "../../helpers/common";

interface SliderItemProps {
  item: ImageSliderType;
  index: number;
}

const SliderItem = ({ item, index }: SliderItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={{ width: 300, height: 500 }} />
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: wp,
  },
});
