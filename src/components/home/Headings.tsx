import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/themes';

const Headings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Herbs</Text>
        <TouchableOpacity>
            <Ionicons name='grid' size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Headings

const styles = StyleSheet.create({
  container: {
    // marginBottom: -themes.THEME.sizes.xSmall,
    // marginHorizontal: 12,
  },
  header: {
    flexDirection: "row",
     justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "medium",
    fontSize: SIZES.xLarge -2,
  },
});