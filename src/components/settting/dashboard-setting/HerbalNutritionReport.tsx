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

  const chartData = data.map((item: Herb) => ({
    name: item.other_names,
    population: item.nutritional_value?.beverage,
    color: item.nutritional_value?.coloring,
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  }));

  return (
    <View>
      <PieChart
        data={chartData}
        width={SIZES.width}
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />
    </View>
  );
}

export default HerbalNutritionReport

const styles = StyleSheet.create({})