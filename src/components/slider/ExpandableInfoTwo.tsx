import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// เปิดใช้งาน LayoutAnimation บน Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExpandableInfo = ({ label, children }: { label: string; children: React.ReactNode }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={{ marginBottom: 10 }}>
      {/* ปุ่มกดเพื่อขยาย/ย่อ */}
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

      {/* เนื้อหาที่ขยายได้ */}
      {expanded && (
        <View style={{ marginTop: 10 }}>
          {children}
        </View>
      )}
    </View>
  );
};

export default ExpandableInfo;
