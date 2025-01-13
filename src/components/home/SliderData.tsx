import { ImageSourcePropType } from "react-native";

export interface ImageSliderType {
  image: ImageSourcePropType;
}

export const imgSlider: ImageSliderType[] = [
  { image: require("../../../assets/images/image1.jpg") },
  { image: require("../../../assets/images/image2.jpg") },
  { image: require("../../../assets/images/image3.jpg") },
  { image: require("../../../assets/images/image4.jpg") },
  { image: require("../../../assets/images/image5.jpg") },
];
