import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { imgSlider } from './SliderData'
import SliderItem from './SliderItem';
interface Props {
  
}

const Slider = () => {
  return (
    <View>
      <FlatList
        data={imgSlider}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default Slider

const styles = StyleSheet.create({})