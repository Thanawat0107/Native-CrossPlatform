import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {  PieChart } from "react-native-chart-kit";
import { useGetHerbsQuery } from '../../../../fetch/herbsApi';
import { COLORS, SIZES } from '../../../../constants/themes';
import { Herb } from '../../../../../@types';
import { useAppDispatch } from '../../../../hooks/useAppHookState';
import { setHerbs } from '../../../../store/slices/herbsSlice';
import { Ionicons } from '@expo/vector-icons';
import { useAppNavigation } from '../../../../hooks/useAppNavigation';
import CompareNutrientValue from './CompareNutrientValue';
import LineChartExample from './LineChartExample';
import { wp } from '../../../../helpers/common';
import { useGetGroupsQuery } from '../../../../fetch/groupsApi';

//รายงานโภชนาการจากสมุนไพร
const HerbalNutritionReport = () => {
  const { data: herbs, error, isLoading } = useGetHerbsQuery(null);
  const { data: groups } = useGetGroupsQuery(null);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const handleGoBack = () => navigation.goBack();
  const [selectedComponent, setSelectedComponent] = useState("main");

  useEffect(() => {
    if (herbs) {
      dispatch(setHerbs(herbs));
    }
  }, [herbs, dispatch]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;

  const selectedHerb = herbs?.herbs?.[0];

  const chartData = herbs
  ? [
      {
        name: "เครื่องดื่ม",
        population: herbs[0].nutritional_value?.beverage?.length ?? 0,
        color: "#FF6384",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "อาหาร",
        population: herbs[0].nutritional_value?.food?.length ?? 0,
        color: "#36A2EB",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "วิตามิน",
        population: herbs[0].nutritional_value?.vitamins?.length ?? 0,
        color: "#FFCE56",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
      {
        name: "องค์ประกอบเคมี",
        population: herbs[0].chemical_composition?.length ?? 0,
        color: "#4BC0C0",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
      },
    ]
  : [];

  // const dataValue = [
  //   { name: "วิตามิน C", population: 40, color: "#FF6384", legendFontColor: "#7F7F7F", legendFontSize: 15 },
  //   { name: "แร่ธาตุ", population: 25, color: "#36A2EB", legendFontColor: "#7F7F7F", legendFontSize: 15 },
  //   { name: "สารต้านอนุมูลอิสระ", population: 35, color: "#FFCE56", legendFontColor: "#7F7F7F", legendFontSize: 15 },
  // ];

  const chartConfig = {
    backgroundColor: "#1E1E1E",
    backgroundGradientFrom: "#2C2C2C",
    backgroundGradientTo: "#3E3E3E",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 10,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  }

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "compare":
        return <CompareNutrientValue />;
      case "lineChart":
        return <LineChartExample />;
      default:
        return (
          <View style={styles.card}>
            <Text
              style={{ textAlign: "center", fontSize: 18, marginBottom: 10, color: COLORS.gray }}
            >
              สัดส่วนของสารอาหารใน Hibiscus
            </Text>
            <PieChart
              data={chartData}
              width={350}
              height={250}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              absolute
            />
          </View>
        );
    }
  };

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
        <Text style={styles.title}>📜 รายงานโภชนาการจากสมุนไพร</Text>
      </View>

      <View style={styles.buttonContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSelectedComponent("main")}
          >
            <Text style={styles.buttonText}>📊 สัดส่วนของสารอาหาร</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setSelectedComponent("compare")}
          >
            <Text style={styles.buttonText}>🔍 เปรียบเทียบโภชนาการ</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setSelectedComponent("lineChart")}
          >
            <Text style={styles.buttonText}>📈 แนวโน้มของผลกระทบต่อสุขภาพ</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>

      {renderSelectedComponent()}
    </View>
  );
}

export default HerbalNutritionReport

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
  card: {
    marginTop: SIZES.xLarge,
    backgroundColor: COLORS.offwhite,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  centered: {
    marginTop: SIZES.xsLarge,
    paddingVertical: SIZES.medium,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: SIZES.large,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.secondary,
    marginRight: 10,
    padding: SIZES.xSmall,
    borderRadius: SIZES.small,
    marginBottom: SIZES.small,
    width: wp(40),
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
    fontWeight: "bold",
  },
});
