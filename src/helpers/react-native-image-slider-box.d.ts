// react-native-image-slider-box.d.ts
declare module 'react-native-image-slider-box' {
  import { Component } from 'react';
  import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

  interface ImageSliderBoxProps {
    images: any[];  // เปลี่ยนประเภทเป็น any[] เพื่อรองรับการใช้ require()
    autoPlay?: boolean;
    circleLoop?: boolean;
    dotColor?: string;
    inactiveDotColor?: string;
    ImageComponentStyle?: ImageStyle | ViewStyle | TextStyle;
    onCurrentImagePressed?: (index: number) => void;
  }

  const ImageSliderBox: React.FC<ImageSliderBoxProps>;
  export default ImageSliderBox;
}
