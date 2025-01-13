import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { themes } from "../../constants/themes";
import { ImageSlider } from "react-native-image-slider-banner";
import { hp, wp } from "../../helpers/common";
import { imgSlider } from "./SliderData";

const Carousel = () => {
  return (
    <View style={styles.carouselContainer}>
      <ImageSlider
        data={imgSlider}
        localImg={true} // ระบุว่าเป็นรูป Local
        caroselImageContainerStyle={{
          height: 200,
          borderRadius: 15,
          overflow: "hidden",
        }}
        indicatorContainerStyle={{ position: "absolute", bottom: 10 }}
        autoPlay={true}
        timer={3000} // ใช้แทน autoPlayInterval
        closeIconColor="#fff"
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center",
    width: wp,
    height: hp,
  },
});
