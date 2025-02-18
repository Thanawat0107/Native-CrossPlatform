import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Herb } from "../../../../@types";
import { Canvas, Circle, LinearGradient } from "@shopify/react-native-skia";
interface ColorItem {
  description: string;
  colorCode: string;
}
interface Props {
  form: Herb;
  setForm: any;
}

const HerbColorInput = ({ form, setForm }: Props) => {
  const [newColor, setNewColor] = useState<ColorItem>({ description: "", colorCode: "#FFFFFF" });

  const addColor = () => {
    if (!newColor.description.trim()) return;

    setForm((prev: any) => ({
      ...prev,
      nutritional_value: {
        ...prev.nutritional_value,
        coloring: [...(prev.nutritional_value?.coloring || []), newColor],
      },
    }));

    setNewColor({ description: "", colorCode: "#FFFFFF" });
  };

  const removeColor = (index: any) => {
    setForm((prev: any) => ({
      ...prev,
      nutritional_value: {
        ...prev.nutritional_value,
        coloring: prev.nutritional_value?.coloring?.filter((_: any, i: number) => i !== index),
      },
    }));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>เพิ่มสีอาหาร</Text>

      <TextInput
        placeholder="คำอธิบายสี"
        value={newColor.description}
        onChangeText={(text) => setNewColor((prev) => ({ ...prev, description: text }))}
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
      />

      {/* ใช้ Skia เป็น Color Picker */}
      <ColorPickerSkia
        selectedColor={newColor.colorCode}
        onColorChange={(color) => setNewColor((prev) => ({ ...prev, colorCode: color }))}
      />

      <Button title="เพิ่มสี" onPress={addColor} />

      {/* แสดงรายการสี */}
      <FlatList
        data={form.nutritional_value?.coloring}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
              padding: 10,
              backgroundColor: "#f5f5f5",
              borderRadius: 5,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: item.colorCode,
                borderRadius: 10,
                marginRight: 10,
              }}
            />
            <Text style={{ flex: 1 }}>{item.description}</Text>
            <TouchableOpacity onPress={() => removeColor(index)}>
              <Text style={{ color: "red" }}>ลบ</Text>
            </TouchableOpacity>
          </View>
        )}
        nestedScrollEnabled={true} 
      />
    </View>
  );
};

const ColorPickerSkia = ({ selectedColor, onColorChange }: { selectedColor: string; onColorChange: (color: string) => void }) => {
  const [color, setColor] = useState(selectedColor);

  const handleTouch = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    const hue = (locationX / 200) * 360; // ให้ Hue อยู่ในช่วง 0-360
    const saturation = (locationY / 200) * 100; // ให้ Saturation อยู่ในช่วง 0-100
    const newColor = `hsl(${hue}, ${saturation}%, 50%)`;
  
    setColor(newColor);
    onColorChange(newColor);
  };

  return (
    <View
      style={{
        width: 200,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ddd",
      }}
      onStartShouldSetResponder={() => true}
      onResponderMove={handleTouch}
    >
      <Canvas style={{ width: 200, height: 200 }}>
        <Circle cx={100} cy={100} r={90}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 200, y: 200 }}
            colors={["red", "yellow", "green", "blue", "purple"]}
          />
        </Circle>
      </Canvas>
    </View>
  );
};

export default HerbColorInput;
