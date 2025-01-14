import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { themes } from '../../constants/themes';

const Headings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Rivals</Text>
        <TouchableOpacity>
            <Ionicons name='grid' size={24} color={themes.THEME.colors.primary} />
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
    fontSize: themes.THEME.sizes.xLarge -2,
  },
});