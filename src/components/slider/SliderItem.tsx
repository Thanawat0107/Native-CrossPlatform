import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from "react-native";
import React from "react";
import { ImageSliderType } from "./SliderData";
import { wp } from "../../helpers/common";
import { themes } from "../../constants/themes";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface SliderItemProps {
  item: ImageSliderType;
  index: number;
}

const SliderItem = ({ item, index }: SliderItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.background}
      >
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity style={styles}>
            <Ionicons name="heart-outline" size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <View style={{gap: 10}}>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "600",
              letterSpacing: 1.5,
            }}
          >
            Herbbbbb
          </Text>
          <Text style={{ color: "#fff", fontSize: 12, letterSpacing: 1.2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, impedit.
          </Text>
        </View>
      </LinearGradient>
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
    marginBottom: themes.THEME.sizes.xSmall,
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 20,
  },
  background: {
    position: "absolute",
    width: 300,
    height: 400,
    padding: 20,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  icon: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 5,
    borderRadius: 30
  }
});
