import React from "react";
import { View, Text, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";

const COLORSz = ["#FF5733", "#33FF57", "#339FFF", "#FF33F6", "#F3FF33"];

//เปรียบเทียบค่าของสารอาหารหรือคุณสมบัติ
const CompareNutrientValue = () => {
  const data = {
    labels: ["ลดไขมัน", "ลดน้ำหนัก", "ลดความดัน", "ช่วยย่อย", "ขับปัสสาวะ"],
    datasets: [
      {
        data: [90, 75, 95, 60, 80],
        colors: COLORSz.map(
          (color) => (opacity: number) =>
            `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
              color.slice(3, 5),
              16
            )}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`
        ),
      },
    ],
  };

  return (
    <ScrollView horizontal>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ textAlign: "center", fontSize: 18, marginBottom: 10, color: "#555" }}>
          คุณสมบัติของ Hibiscus (%)
        </Text>
        <BarChart
          data={data}
          width={400} // ขยายขนาดเล็กน้อย
          height={250}
          fromZero
          yAxisLabel=""
          yAxisSuffix="%"
          showValuesOnTopOfBars // แสดงค่าบนแท่ง
          withInnerLines={false} // ลบเส้นตารางด้านในเพื่อความสวยงาม
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(72, 149, 239, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default CompareNutrientValue;
