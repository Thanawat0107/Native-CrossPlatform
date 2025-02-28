import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { COLORS, SIZES } from "../../../constants/themes";
import { LineChart } from "react-native-chart-kit";
import { useGetHerbsQuery } from "../../../fetch/herbsApi";
import Loading from "../../Loading";
import { wp } from "../../../helpers/common";
import { useAppDispatch } from "../../../hooks/useAppHookState";
import { setHerbs } from "../../../store/slices/herbsSlice";
import { Ionicons } from "@expo/vector-icons";
import { useAppNavigation } from "../../../hooks/useAppNavigation";

const generateRandomPriceTrend = (currentPrice: number): number[] => {
  let trend = [];
  let price = currentPrice;

  for (let i = 4; i >= 0; i--) {
    price += Math.floor(Math.random() * 11) - 5; // ราคาผันผวน ±5
    price = Math.max(price, 1); // ห้ามราคาติดลบ
    trend.push(price);
  }

  return trend;
};

//รายงานเปรียบเทียบราคาสินค้า
const PriceComparisonReport = () => {
  const { data: herbs, isLoading, isError, refetch } = useGetHerbsQuery(null);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const handleGoBack = () => navigation.goBack();
  
   useEffect(() => {
     if (herbs) {
       dispatch(setHerbs(herbs));
     }
   }, [herbs, dispatch]);

  const herbsWithTrend = herbs?.map((herb: any) => ({
    ...herb,
    priceTrend: herb.priceTrend ?? generateRandomPriceTrend(herb.price),
  }));

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !herbs) {
    return <Text>เกิดข้อผิดพลาดในการโหลดข้อมูล</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.lightWhite}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>Admin Dashboards</Text>
      </View>
      
      <View style={styles.centered}>
        <Text style={styles.title}>📊 เปรียบเทียบราคาสินค้า</Text>
      </View>
      <Text style={styles.chartTitle}>📈 แนวโน้มราคา 5 เดือน</Text>

      <LineChart
        data={{
          labels: ["-4M", "-3M", "-2M", "-1M", "Now"],
          datasets: herbsWithTrend.map((herb: any, index: number) => ({
            data: herb.priceTrend,
            color: (opacity = 1) => `rgba(${index * 50}, 99, 132, ${opacity})`,
            strokeWidth: 2,
          })),
        }}
        width={SIZES.width - 30}
        height={wp(80)}
        yAxisLabel="฿"
        chartConfig={{
          backgroundColor: "#f8f9fa",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />

      <FlatList
        data={herbsWithTrend}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const displayName = item.other_names?.length
            ? item.other_names[0]
            : "ไม่ทราบชื่อ";
          return (
            <View style={styles.card}>
              <Text style={styles.productName}>{displayName}</Text>
              <Text>💰 ราคา: ฿{item.price}</Text>
              <Text>📦 สต็อก: {item.stock} ชิ้น</Text>
            </View>
          );
        }}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  );
};

export default PriceComparisonReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.xxLarge,
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.green3,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },
  heading: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginHorizontal: 10,
  },
  centered: {
    marginTop: SIZES.xsLarge,
    paddingVertical: SIZES.medium,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: SIZES.large,
    marginBottom: 10,
  },
  chartTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  chart: { marginVertical: 8, borderRadius: 16 },
  card: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  productName: { fontSize: 16, fontWeight: "bold" },
});
