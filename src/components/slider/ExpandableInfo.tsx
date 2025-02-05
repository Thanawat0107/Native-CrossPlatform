import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  Animated,
  LayoutChangeEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExpandableInfo = ({ label, children }: { label: string; children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const animationHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    if (expanded) {
      // ถ้ากำลังเปิดอยู่ → หดกลับ
      Animated.timing(animationHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // ถ้ากำลังปิดอยู่ → เปิดขึ้นมา (ใช้ค่า 200 หรือกำหนดค่า maxHeight เอง)
      Animated.timing(animationHeight, {
        toValue: measuredHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setExpanded(!expanded);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity
        onPress={toggleExpand}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{label}</Text>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={24} />
      </TouchableOpacity>

      <View
        style={{ position: "absolute", opacity: 0, left: 0, right: 0 }}
        onLayout={(event: LayoutChangeEvent) =>
          setMeasuredHeight(event.nativeEvent.layout.height)
        }
      >
        {children}
      </View>

      <Animated.View style={{ overflow: "hidden", height: animationHeight, marginTop: 10 }}>
        {children}
      </Animated.View>
    </View>
  );
};

export default ExpandableInfo;