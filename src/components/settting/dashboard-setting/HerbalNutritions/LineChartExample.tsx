import React from "react";
import { Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { COLORS } from "../../../../constants/themes";

//แนวโน้มของผลกระทบต่อสุขภาพ
const LineChartExample = () => {
  const data = {
    labels: ["วันแรก", "3 วัน", "1 สัปดาห์", "2 สัปดาห์", "1 เดือน"],
    datasets: [
      {
        data: [150, 140, 135, 130, 125], // ค่า BP ที่ลดลงเมื่อใช้ Hibiscus
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={{justifyContent: "center", alignItems: "center"}}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          marginBottom: 10,
          color: COLORS.gray,
        }}
      >
        แนวโน้มความดันโลหิตหลังใช้ Hibiscus
      </Text>
      <LineChart
        data={data}
        width={350}
        height={250}
        yAxisSuffix=" mmHg"
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(34, 202, 236, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 10 },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default LineChartExample;
