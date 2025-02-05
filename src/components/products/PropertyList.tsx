import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZES } from "../../constants/themes";

interface PropertyItem {
  label: string;
  value: string | number;
}

interface PropertyListProps {
  data: PropertyItem[];
}

const PropertyList = ({ data }: PropertyListProps) => {
  if (!data || data.length === 0) return null;

  return (
    <ScrollView>
      {data.map((item, index) => (
        <View key={`${item.label}-${index}`} style={styles.item}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default PropertyList;

const styles = StyleSheet.create({
  item: {
    marginBottom: 8,
  },
  label: {
    fontFamily: "bold",
    marginBottom: 5,
    fontSize: SIZES.medium,
  },
  value: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
  },
});

// const renderItem = ({ item }: { item: PropertyItem }) => (
//   <View style={styles.item}>
//     <Text style={styles.label}>{item.label}</Text>
//     <Text style={styles.value}>{item.value}</Text>
//   </View>
// );

// <FlatList
//   data={data}
//   renderItem={renderItem}
//   keyExtractor={(item, index) => `${item.label}-${index}`}
// />
