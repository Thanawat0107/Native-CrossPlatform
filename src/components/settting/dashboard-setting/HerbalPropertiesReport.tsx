import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useGetHerbsQuery } from "../../../fetch/herbsApi";
import { useAppDispatch } from "../../../hooks/useAppHookState";
import { setHerbs } from "../../../store/slices/herbsSlice";
import Loading from "../../Loading";
import PropertyList from "../../products/PropertyList";
import { SIZES } from "../../../constants/themes";
import { isIOS } from "../../../helpers/SD";

const HerbalPropertiesReport = () => {
  const { data, isLoading, isError, refetch } = useGetHerbsQuery(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setHerbs(data));
    }
  }, [data, dispatch]);

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <Text style={{ color: "red" }}>Failed to load herbs</Text>;

  const selectedName = data?.other_names?.length 
  ? data.other_names[0] 
  : "ชื่อสมุนไพร";

  const propertiesData = data?.properties
  ? Object.entries(data.properties).map(([key, value]) => ({
      label: `คุณสมบัติ : ${key}`,
      value: Array.isArray(value) ? value.join(", ") : value,
    }))
  : [];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📜 รายงานคุณสมบัติสมุนไพร</Text>
      {/* แสดงรายการสมุนไพร */}
      <View style={{ padding: 10, borderBottomWidth: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{selectedName}</Text>
        <PropertyList data={propertiesData} />
      </View>
    </ScrollView>
  );
};

export default HerbalPropertiesReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.xsLarge,
    // marginBottom: isIOS ? 10 : 0,
    // backgroundColor: "#F5F5DC",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  herbName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A7023",
  },
  scientificName: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888",
    marginBottom: 5,
  },
  partSection: {
    marginTop: 5,
    paddingLeft: 10,
  },
  partName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C5F2D",
  },
  benefit: {
    fontSize: 14,
    color: "#333",
  },
});
