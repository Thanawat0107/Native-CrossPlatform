import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useGetHerbsQuery } from "../../../fetch/herbsApi";
import { useAppDispatch } from "../../../hooks/useAppHookState";
import { setHerbs } from "../../../store/slices/herbsSlice";
import Loading from "../../Loading";
import { SIZES } from "../../../constants/themes";

//รายงานคุณสมบัติสมุนไพร
const HerbalPropertiesReport = () => {
  const { data: herbalData, isLoading, isError } = useGetHerbsQuery(null);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (herbalData) {
      dispatch(setHerbs(herbalData));
    }
  }, [herbalData, dispatch]);

  if (isLoading) return <Loading />;
  if (isError)
    return <Text style={{ color: "red" }}>Failed to load herbs</Text>;

  // const propertiesData = herbalData?.length
  // ? herbalData.flatMap((herb: any) =>
  //     herb.properties && typeof herb.properties === "object"
  //       ? Object.entries(herb.properties).map(([key, value]) => ({
  //           part: `ส่วนที่ใช้: ${key}`,
  //           benefits: Array.isArray(value) ? value.join(", ") : value || "",
  //         }))
  //       : [{ part: "ไม่มีข้อมูล", benefits: "" }]
  //   )
  // : [{ part: "ไม่มีข้อมูล", benefits: "" }];

  const formattedHerbsData = herbalData?.length
    ? herbalData.map((herb: any) => ({
      name: herb.other_names?.length ? herb.other_names[0] : "ไม่ทราบชื่อ",  
        properties: herb.properties && typeof herb.properties === "object"
          ? Object.entries(herb.properties).map(([key, value]) => ({
              part: `ส่วนที่ใช้: ${key}`,
              benefits: `สรรพคุณ: ${Array.isArray(value) ? value.join(", ") : value || ""}`,
            }))
          : [{ part: "ไม่มีข้อมูล", benefits: "" }]
      }))
    : [];
  
  // const formattedPropertiesData = propertiesData?.length
  // ? propertiesData.map((item: any) => ({
  //     label: item.part,
  //     value: item.benefits || "-",
  //   }))
  // : [];
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 รายงานสรรพคุณสมุนไพร</Text>

      <FlatList
        data={formattedHerbsData}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.herbContainer}>

            <Text style={styles.herbName}>{item.name}</Text>

            <FlatList
              data={item.properties}
              keyExtractor={(prop, index) => `${prop.part}-${index}`}
              renderItem={({ item: prop }) => (
                <View style={styles.row}>
                  <Text style={styles.cell}>{prop.part}</Text>
                  <Text style={styles.cell}>{prop.benefits}</Text>
                </View>
              )}
            />
          </View>
        )}
      />

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
  herbContainer: {
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingVertical: 10,
  },
  herbName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    color: "#2E7D32",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#4CAF50",
  },
  headerText: {
    fontWeight: "bold",
    color: "#fff",
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  divider: {
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#999",
    marginHorizontal: 20,
  },

  card: {
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3, // เงา
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardText: {
    fontSize: 16,
    color: "#666",
  },
});
