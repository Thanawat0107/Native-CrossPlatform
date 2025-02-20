import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useGetHerbsQuery } from "../../../fetch/herbsApi";
import { useAppDispatch } from "../../../hooks/useAppHookState";
import { setHerbs } from "../../../store/slices/herbsSlice";
import Loading from "../../Loading";
import { SIZES } from "../../../constants/themes";
import PropertyList from "../../products/PropertyList";

//รายงานคุณสมบัติสมุนไพร
const HerbalPropertiesReport = () => {
  const { data: herbalData, isLoading, isError } = useGetHerbsQuery(null);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (herbalData) {
      dispatch(setHerbs(herbalData));
      // console.log("ข้อมูลลล",herbalData);
    }
  }, [herbalData, dispatch]);

  if (isLoading) return <Loading />;
  if (isError)
    return <Text style={{ color: "red" }}>Failed to load herbs</Text>;

  const propertiesData = herbalData?.properties
  ? Object.entries(herbalData.properties).map(([key, value]) => ({
      part: `ส่วนที่ใช้: ${key}`,
      benefits: Array.isArray(value) ? value.join(", ") : value || "",
    }))
  : [{ part: "ไม่มีข้อมูล", benefits: "" }];
  console.log("ข้อมูล: *propertiesData*",propertiesData);
  
  const formattedPropertiesData = propertiesData?.length
  ? propertiesData.map((item) => ({
      label: item.part,
      value: item.benefits || "-",
    }))
  : [];
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 รายงานสรรพคุณสมุนไพร</Text>

      <View style={styles.table}>
        {/* Header */}
        <View style={[styles.row, styles.header]}>
          <Text style={[styles.cell, styles.headerText]}>ส่วนที่ใช้</Text>
          <Text style={[styles.cell, styles.headerText]}>สรรพคุณ</Text>
        </View>

        <PropertyList data={formattedPropertiesData} />
      </View>
    </View>
  );
};

export default HerbalPropertiesReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.xsLarge,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  table: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5 },
  row: { flexDirection: "row", paddingVertical: 10, paddingHorizontal: 8 },
  header: { backgroundColor: "#4CAF50" },
  headerText: { fontWeight: "bold", color: "white" },
  rowEven: { backgroundColor: "#f9f9f9" },
  rowOdd: { backgroundColor: "#ffffff" },
  cell: { flex: 1, textAlign: "center", paddingHorizontal: 5 },
  noDataText: {

  }
});
