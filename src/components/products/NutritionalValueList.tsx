import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZES } from "../../constants/themes";

interface NutritionalValueItem {
  label: string;
  value: string;
  colorCode?: string;
}

interface NutritionalValueListProps {
  data: NutritionalValueItem[];
}

const NutritionalValueList = ({ data }: NutritionalValueListProps) => {
  if (!data || data.length === 0) return null;

  return (
    <>
      {data.map((item, index) => (
        <View
          key={`${item.label}-${index}`}
          style={[
            styles.item,
            item.colorCode ? { backgroundColor: item.colorCode } : "", // ใช้สีจาก colorCode ถ้ามี
          ]}
        >
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </>
  );
};

export default NutritionalValueList;

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

// const renderItem = ({ item }: { item: NutritionalValueItem }) => (
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
