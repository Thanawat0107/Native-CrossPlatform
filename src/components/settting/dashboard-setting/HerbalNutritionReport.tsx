import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PieChart } from "react-native-chart-kit";
import { useGetHerbsQuery } from '../../../fetch/herbsApi';
import { COLORS, SIZES } from '../../../constants/themes';
import { Herb } from '../../../../@types';
import { useAppDispatch } from '../../../hooks/useAppHookState';
import { setHerbs } from '../../../store/slices/herbsSlice';

const HerbalNutritionReport = () => {
  const { data, error, isLoading } = useGetHerbsQuery(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setHerbs(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;

  const chartData = data
  ? data.map((item: Herb) => ({
      name: item.other_names?.join(", ") ?? "",
      population: item.nutritional_value?.beverage?.length ?? 0,
      color: item.nutritional_value?.coloring?.[0] ?? COLORS.green,
      legendFontColor: "#7F7F7F",
      legendFontSize: 16,
    }))
  : [];

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 รายงานโภชนาการจากสมุนไพร</Text>
      <View style={styles.card}>
        <PieChart
          data={chartData}
          width={SIZES.width - 40}
          height={250}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft="15"
          absolute
        />
      </View>
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
  card: {
    marginTop: SIZES.xLarge,
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});