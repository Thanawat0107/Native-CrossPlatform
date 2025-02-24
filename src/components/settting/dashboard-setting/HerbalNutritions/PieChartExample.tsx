import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-chart-kit";

//สัดส่วนของสารอาหาร
const PieChartExample = () => {
  const data = [
    { name: "วิตามิน C", population: 40, color: "#FF6384", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "แร่ธาตุ", population: 25, color: "#36A2EB", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "สารต้านอนุมูลอิสระ", population: 35, color: "#FFCE56", legendFontColor: "#7F7F7F", legendFontSize: 15 },
  ];

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 10 }}>
        สัดส่วนของสารอาหารใน Hibiscus
      </Text>
      <PieChart
        data={data}
        width={350}
        height={250}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />
    </View>
  );
};

export default PieChartExample;
