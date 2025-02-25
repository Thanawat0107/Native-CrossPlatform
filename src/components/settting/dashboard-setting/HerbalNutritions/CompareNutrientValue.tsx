import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { COLORS } from "../../../../constants/themes";

//เปรียบเทียบค่าของสารอาหารหรือคุณสมบัติ
const CompareNutrientValue = () => {
  const data = {
    labels: ["ลดไขมัน", "ลดน้ำหนัก", "ลดความดัน", "ช่วยย่อย", "ขับปัสสาวะ"],
    datasets: [
      {
        data: [5, 4, 5, 3, 4], // ค่าเปรียบเทียบระดับประสิทธิภาพ
      },
    ],
  };

  return (
    <View style={{justifyContent: "center", alignItems: "center"}}>
      <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 10, color: COLORS.gray, }}>
        คุณสมบัติของ Hibiscus
      </Text>
      <BarChart
        data={data}
        width={350}
        height={250}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(72, 149, 239, ${opacity})`,
        }}
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default CompareNutrientValue;
