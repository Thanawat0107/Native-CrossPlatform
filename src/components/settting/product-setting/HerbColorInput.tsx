import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ColorPicker } from "react-native-color-picker";
import { Herb } from "../../../../@types";

interface Props {
  form: any;
  setForm: any;
}

const HerbColorInput = ({ form, setForm }: Props) => {
  const [newColor, setNewColor] = useState({
    description: "",
    colorCode: "#FFFFFF",
  });

  const addColor = () => {
    if (!newColor.description.trim()) return;

    setForm((prev: any) => ({
      ...prev,
      nutritional_value: {
        ...prev.nutritional_value,
        coloring: [...prev.nutritional_value.coloring, newColor],
      },
    }));

    setNewColor({ description: "", colorCode: "#FFFFFF" });
  };

  const removeColor = (index: any) => {
    setForm((prev: any) => ({
      ...prev,
      nutritional_value: {
        ...prev.nutritional_value,
        coloring: prev.nutritional_value.coloring.filter(
          (_: any, i: any) => i !== index
        ),
      },
    }));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>เพิ่มสีอาหาร</Text>

      <TextInput
        placeholder="คำอธิบายสี"
        value={newColor.description}
        onChangeText={(text) =>
          setNewColor((prev) => ({ ...prev, description: text }))
        }
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
      />

      {/* Color Picker */}
      <ColorPicker
        onColorSelected={(color) =>
          setNewColor((prev) => ({ ...prev, colorCode: color }))
        }
        style={{ height: 200 }}
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
      />
    </View>
  );
};

export default HerbColorInput;
