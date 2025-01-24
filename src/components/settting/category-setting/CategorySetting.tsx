import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { SIZES } from '../../../constants/themes';
import { useAppNavigation } from '../../../hooks/useAppNavigation';

const CategorySetting = () => {
  const navigation = useAppNavigation();
  return (
    <View>
      <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
            />
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default CategorySetting

const styles = StyleSheet.create({
  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    top: SIZES.xxLarge,
  },
});