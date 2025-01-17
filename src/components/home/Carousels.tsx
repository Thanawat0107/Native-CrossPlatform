import { StyleSheet, View } from "react-native";
import React from "react";
import { ImageSlider } from "react-native-image-slider-banner";

const Carousels = () => {
  return (
    <View style={styles.carouselContainer}>
      <ImageSlider
        data={[
          { img: require("../../../assets/braners/image1.jpg") },
          { img: require("../../../assets/braners/image2.jpg") },
          { img: require("../../../assets/braners/image3.jpg") },
          { img: require("../../../assets/braners/image4.jpg") },
          { img: require("../../../assets/braners/image5.jpg") },
        ]}
        localImg={true} // ระบุว่าเป็นรูป Local
        caroselImageContainerStyle={{
          // width: wp,
          height: 200,
          borderRadius: 15,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        }}
        caroselImageStyle={{ resizeMode: 'cover' }}
        indicatorContainerStyle={{ position: "absolute", bottom: 10 }}
        autoPlay={true}
        timer={3000}
        closeIconColor="#fff"
        indicatorActiveColor="#FFA500"
        indicatorInActiveColor="#FFFFFF"
        indicatorStyle={{ width: 8, height: 8, borderRadius: 4 }}
      />
    </View>
  );
};

export default Carousels;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center",
    // width: wp,
    // height: hp,
    marginBottom: 16,
    overflow : "hidden",
    borderRadius: 15
  },
});
