import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  Image} from "react-native";
  import { TextInput, Button, Text, Menu, Divider } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { Herb, RootStackParamList } from "../../../../@types";
import { useAppDispatch } from "../../../hooks/useAppHookState";
import { addHerb, updateHerb } from "../../../store/slices/herbsSlice";
import { useAddHerbMutation, useUpdateHerbMutation, } from "../../../fetch/herbsApi";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { SIZES } from "../../../constants/themes";
import defaultHerb from "./defaultHerb";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../../../helpers/uploadImageToCloudinary";
import RNPickerSelect from "react-native-picker-select";

type ProductUpsertRouteProp = RouteProp<RootStackParamList, "ProductUpsert">;
interface ProductUpsertProps {
  route: ProductUpsertRouteProp;
}

const ProductUpsert = ({ route }: ProductUpsertProps) => {
  const { herbs, groups } = route.params;
  const navigation = useAppNavigation();
  const isEditMode = !!herbs;
  const [addHerbApi] = useAddHerbMutation();
  const [updateHerbApi] = useUpdateHerbMutation();
  const dispatch = useAppDispatch();
  const [colorDescription, setColorDescription] = useState("");
  const [colorCode, setColorCode] = useState("");

  const pickImage = async () => {
    // ขออนุญาตเข้าถึงอัลบั้มภาพ
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("ขออภัย! ต้องอนุญาตเข้าถึงรูปภาพก่อนใช้งาน");
      return;
    }
   // เปิดแกลเลอรีให้เลือกภาพ
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const imageUri = result.assets[0].uri;      
      const uploadedImageUrl = await uploadImageToCloudinary(imageUri);
      
      if (uploadedImageUrl) {
        setForm((prev) => ({ ...prev, imageUrl: uploadedImageUrl }));
      } else {
        Alert.alert("Upload Failed", "ไม่สามารถอัปโหลดรูปภาพได้");
      }
    }
  };

  const [form, setForm] = useState<Herb>(herbs ?? defaultHerb);
  const resetForm = () => setForm(defaultHerb);
  useEffect(() => {
    if (herbs) {
      setForm(herbs);
    } else {
      resetForm();
    }
  }, [herbs]);

   const [groupMenuVisible, setGroupMenuVisible] = useState(false);

  const addColor = (description: string, colorCode: string) => {
    if (!description || !colorCode) return;
  
    setForm((prev) => ({
      ...prev,
      nutritional_value: {
        ...(prev.nutritional_value ?? { beverage: [], food: [], vitamins: [], coloring: [] }),
        coloring: [...(prev.nutritional_value?.coloring ?? []), { description, colorCode }],
      },
    }));
  };

  const removeColor = (index: number) => {
    setForm((prev) => ({
      ...prev,
      nutritional_value: {
        ...(prev.nutritional_value ?? { beverage: [], food: [], vitamins: [], coloring: [] }),
        coloring: prev.nutritional_value?.coloring?.filter((_, i) => i !== index) ?? [],
      },
    }));
  };
  

  const handleSubmit = async () => {
    if (!form.groupId || !form.scientific_name || !form.other_names.length || form.price < 0) {
      Alert.alert("Invalid Input", "Please fill in all required fields.");
      return;
    }

    try {
      if (isEditMode && herbs) {
        const updatedHerb = { ...herbs, ...form };

        const response = await updateHerbApi({ id: herbs.id, editHerb: updatedHerb }).unwrap();
        dispatch(updateHerb(response));

        Alert.alert("Success", "Herb updated successfully!");
      } else {
        const newHerb = { ...form, id: Date.now() };

        const response = await addHerbApi(newHerb).unwrap();
        dispatch(addHerb(response));

        Alert.alert("Success", "Herb added successfully!", [{ text: "OK" }]);
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error saving herb:", error);
      Alert.alert("Error", "Failed to save herb.");
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">
        {isEditMode
          ? `Edit Product: ${form?.other_names.join(", ")}`
          : "Add New Product"}
      </Text>

      <ScrollView>
        <Menu
          visible={groupMenuVisible}
          onDismiss={() => setGroupMenuVisible(false)}
          anchor={
            <Button onPress={() => setGroupMenuVisible(true)} mode="outlined">
              {form.groupId
                ? groups.find((g) => g.id === form.groupId)?.name
                : "เลือกกลุ่มยาสมุนไพร"}
            </Button>
          }
        >
          {groups?.map((group) => (
            <Menu.Item
              key={group.id}
              title={group.name}
              onPress={() => {
                setForm({ ...form, groupId: group.id });
                setGroupMenuVisible(false);
              }}
            />
          ))}
        </Menu>

        <TextInput
          label="ชื่อสมุนไพร"
          mode="outlined"
          value={form.other_names?.join(", ") ?? ""}
          onChangeText={(text) =>
            setForm({
              ...form,
              other_names: text.split(",").map((name) => name.trim()),
            })
          }
        />

        <TextInput
          label="ชื่อวิทยาศาสตร์"
          mode="outlined"
          value={form.scientific_name ?? ""}
          onChangeText={(text) => setForm({ ...form, scientific_name: text })}
        />

        <TextInput
          label="ชื่อสามัญ"
          mode="outlined"
          value={form.common_names?.join(", ") ?? ""}
          onChangeText={(text) =>
            setForm({
              ...form,
              common_names: text.split(",").map((name) => name.trim()),
            })
          }
        />

        <TextInput
          label="ตระกูล"
          mode="outlined"
          value={form.family ?? ""}
          onChangeText={(text) => setForm({ ...form, family: text })}
        />

        <TextInput
          label="คำอธิบายพฤกษศาสตร์"
          mode="outlined"
          multiline
          value={form.botanical_description ?? ""}
          onChangeText={(text) =>
            setForm({ ...form, botanical_description: text })
          }
        />

        <Divider style={{ marginVertical: 10 }} />

        {/* Properties Input Fields */}
        <Text variant="titleMedium">คุณสมบัติ</Text>

        <TextInput
          label="กลีบเลี้ยง"
          mode="outlined"
          value={(Array.isArray(form.properties?.calyx)
            ? form.properties?.calyx
            : []
          ).join(", ")}
          onChangeText={(text) =>
            setForm({
              ...form,
              properties: {
                ...form.properties,
                calyx: text.split(",").map((item) => item.trim()),
              },
            })
          }
        />
        <TextInput
          label="ใบไม้"
          mode="outlined"
          value={(Array.isArray(form.properties?.leaves)
            ? form.properties?.leaves
            : []
          ).join(", ")}
          onChangeText={(text) =>
            setForm({
              ...form,
              properties: {
                ...form.properties,
                leaves: text.split(",").map((item) => item.trim()),
              },
            })
          }
        />
        <TextInput
          label="ดอกไม้"
          mode="outlined"
          value={(Array.isArray(form.properties?.flowers)
            ? form.properties?.flowers
            : []
          ).join(", ")}
          onChangeText={(text) =>
            setForm({
              ...form,
              properties: {
                ...form.properties,
                flowers: text.split(",").map((item) => item.trim()),
              },
            })
          }
        />
        <TextInput
          label="ผลไม้"
          mode="outlined"
          value={(Array.isArray(form.properties?.fruit)
            ? form.properties?.fruit
            : []
          ).join(", ")}
          onChangeText={(text) =>
            setForm({
              ...form,
              properties: {
                ...form.properties,
                fruit: text.split(",").map((item) => item.trim()),
              },
            })
          }
        />
        <TextInput
          label="เมล็ดพันธุ์"
          mode="outlined"
          value={(Array.isArray(form.properties?.seeds)
            ? form.properties?.seeds
            : []
          ).join(", ")}
          onChangeText={(text) =>
            setForm({
              ...form,
              properties: {
                ...form.properties,
                seeds: text.split(",").map((item) => item.trim()),
              },
            })
          }
        />
        <TextInput
          label="ทั่วไป"
          mode="outlined"
          value={(Array.isArray(form.properties?.general)
            ? form.properties?.general
            : []
          ).join(", ")}
          onChangeText={(text) =>
            setForm({
              ...form,
              properties: {
                ...form.properties,
                general: text.split(",").map((item) => item.trim()),
              },
            })
          }
        />

        <Divider style={{ marginVertical: 10 }} />

        <Text variant="titleMedium">การใช้งาน</Text>

        <TextInput
          label="วิธีใช้"
          mode="outlined"
          value={form.usage?.method ?? ""}
          onChangeText={(text) =>
            setForm({
              ...form,
              usage: {
                ...form.usage,
                method: text,
              },
            })
          }
        />

        <TextInput
          label="ปริมาณการใช้"
          mode="outlined"
          value={form.usage?.dosage ?? ""}
          onChangeText={(text) =>
            setForm({
              ...form,
              usage: {
                ...form.usage,
                dosage: text,
              },
            })
          }
        />

        <Divider style={{ marginVertical: 10 }} />

        <TextInput
          label="องค์ประกอบทางเคมี"
          mode="outlined"
          value={(Array.isArray(form.chemical_composition)
            ? form.chemical_composition
            : []
          ).join(", ")}
          onChangeText={(text) =>
            setForm({
              ...form,
              chemical_composition: text.split(",").map((name) => name.trim()),
            })
          }
        />

        <Divider style={{ marginVertical: 10 }} />

        <Text variant="titleMedium">คุณค่าทางโภชนาการ</Text>

        <TextInput
          label="เครื่องดื่ม"
          mode="outlined"
          value={(Array.isArray(form.nutritional_value?.beverage)
            ? form.nutritional_value.beverage
            : []
          ).join(", ")}
          onChangeText={(text) =>
            setForm({
              ...form,
              nutritional_value: {
                ...form.nutritional_value,
                beverage: text.split(",").map((item) => item.trim()),
              },
            })
          }
        />
        <TextInput
          label="อาหาร"
          mode="outlined"
          value={(Array.isArray(form.nutritional_value?.food)
            ? form.nutritional_value.food
            : []
          ).join(", ")}
          onChangeText={(text) =>
            setForm({
              ...form,
              nutritional_value: {
                ...form.nutritional_value,
                food: text.split(",").map((item) => item.trim()),
              },
            })
          }
        />
        <TextInput
          label="วิตามิน"
          mode="outlined"
          value={(Array.isArray(form.nutritional_value?.vitamins)
            ? form.nutritional_value.vitamins
            : []
          ).join(", ")}
          onChangeText={(text) =>
            setForm({
              ...form,
              nutritional_value: {
                ...form.nutritional_value,
                vitamins: text.split(",").map((item) => item.trim()),
              },
            })
          }
        />

        <View>
          <TextInput
            label="รหัสสี"
            mode="outlined"
            value={colorCode}
            onChangeText={setColorCode}
          />
          <TextInput
            label="คำอธิบายสี"
            mode="outlined"
            value={colorDescription}
            onChangeText={setColorDescription}
          />
          <Divider style={{ marginVertical: 10 }} />
          <Button
            mode="contained"
            onPress={() => addColor(colorDescription, colorCode)}
          >
            เพิ่มสี
          </Button>

          <Divider style={{ marginVertical: 10 }} />

          {form.nutritional_value?.coloring?.length ? (
            form.nutritional_value.coloring.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: item.colorCode,
                  padding: 10,
                  margin: 5,
                }}
              >
                <Text>
                  {item.description} ({item.colorCode})
                </Text>
                <Button mode="outlined" onPress={() => removeColor(index)}>
                  ลบ
                </Button>
              </View>
            ))
          ) : (
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              ไม่มีข้อมูลสี
            </Text>
          )}
        </View>

        <TextInput
          label="ราคา"
          mode="outlined"
          keyboardType="numeric"
          value={(form.price ?? 0).toString()}
          onChangeText={(text) =>
            setForm({ ...form, price: text ? Number(text) : 0 })
          }
        />

        <TextInput
          label="จำนวนสต๊อก"
          mode="outlined"
          keyboardType="numeric"
          value={(form.stock ?? 0).toString()}
          onChangeText={(text) =>
            setForm({ ...form, stock: text ? Number(text) : 0 })
          }
        />
        <Divider style={{ marginVertical: 10 }} />
        <View style={styles.imageWrapper}>
          <Button mode="contained" onPress={pickImage}>
            เลือกรูปภาพ
          </Button>
          {form.imageUrl ? (
            <Image source={{ uri: form.imageUrl }} style={styles.image} />
          ) : null}
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 10,
        }}
      >
        <Button mode="contained" onPress={handleSubmit}>
          Save
        </Button>
        <Button mode="outlined" onPress={() => navigation.goBack()}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default ProductUpsert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.xsLarge,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
     width: 200, height: 200, marginTop: 10 
  }
});