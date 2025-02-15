import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { Herb, RootStackParamList } from "../../../../@types";
import { useAppDispatch } from "../../../hooks/useAppHookState";
import { addHerb, updateHerb } from "../../../store/slices/herbsSlice";
import {
  useAddHerbMutation,
  useUpdateHerbMutation,
} from "../../../fetch/herbsApi";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { SIZES } from "../../../constants/themes";
import defaultHerb from "./defaultHerb";
import { isIOS } from "../../../helpers/SD";
import * as ImagePicker from "expo-image-picker";
import { uploadImageToCloudinary } from "../../../helpers/uploadImageToCloudinary";

type ProductUpsertRouteProp = RouteProp<RootStackParamList, "ProductUpsert">;

interface ProductUpsertProps {
  route: ProductUpsertRouteProp;
}

const ProductUpsert = ({ route }: ProductUpsertProps) => {
  const herb = route.params?.herb as Herb | undefined;
  const navigation = useAppNavigation();
  const isEditMode = !!herb;

  const [addHerbApi] = useAddHerbMutation();
  const [updateHerbApi] = useUpdateHerbMutation();

  const dispatch = useAppDispatch();

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

  const [form, setForm] = useState<Herb>(herb ?? defaultHerb);
  const resetForm = () => setForm(defaultHerb);
  useEffect(() => {
    if (herb) {
      setForm(herb);
    } else {
      resetForm();
    }
  }, [herb]);

  const handleSubmit = async () => {
    if (!form.groupId || !form.scientific_name || !form.other_names.length || form.price < 0) {
      Alert.alert("Invalid Input", "Please fill in all required fields.");
      return;
    }

    try {
      if (isEditMode && herb) {
        const updatedHerb = { ...herb, ...form };

        const response = await updateHerbApi({ id: herb.id, editHerb: updatedHerb }).unwrap();
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
      <Text style={styles.title}>
        {isEditMode ? `Edit Product: ${herb?.other_names}` : "Add New Product"}
      </Text>

      <ScrollView>
        <TextInput
          placeholder="กลุ่มยาสมุนไพร"
          style={styles.input}
          value={(form.groupId ?? "").toString()}
          onChangeText={(text) => setForm({ ...form, groupId: text ? Number(text): 0})}
        />

        <TextInput
          placeholder="ชื่อสมุนไพร"
          style={styles.input}
          value={form.other_names?.join(", ") ?? ""}
          onChangeText={(text) =>
            setForm({
              ...form,
              other_names: text
                .split(",")
                .map((name) => name.trim())
                .filter(Boolean),
            })
          }
        />

        <TextInput
          placeholder="ชื่อวิทยาศาสตร์"
          style={styles.input}
          value={form.scientific_name ?? ""}
          onChangeText={(text) => setForm({ ...form, scientific_name: text })}
        />

        <TextInput
          placeholder="ชื่อสามัญ"
          style={styles.input}
          value={form.common_names?.join(", ") ?? ""}
          onChangeText={(text) =>
            setForm({
              ...form,
              common_names: text.split(",").map((name) => name.trim()),
            })
          }
        />

        <TextInput
          placeholder="ตระกูล"
          style={styles.input}
          value={form.family ?? ""}
          onChangeText={(text) => setForm({ ...form, family: text })}
        />

        <TextInput
          placeholder="คำอธิบายพฤกษศาสตร์"
          style={styles.input}
          value={form.botanical_description ?? ""}
          onChangeText={(text) =>
            setForm({ ...form, botanical_description: text })
          }
        />

        {/* Properties Input Fields */}
        <Text style={{ fontFamily: "bold" }}>คุณสมบัติ</Text>

        <TextInput
          placeholder="กลีบเลี้ยง"
          style={styles.input}
          value={form.properties?.calyx?.join(", ") ?? ""}
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
          placeholder="ใบไม้"
          style={styles.input}
          value={form.properties?.leaves?.join(", ") ?? ""}
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
          placeholder="ดอกไม้"
          style={styles.input}
          value={form.properties?.flowers?.join(", ") ?? ""}
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
          placeholder="ผลไม้"
          style={styles.input}
          value={form.properties?.fruit?.join(", ") ?? ""}
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
          placeholder="เมล็ดพันธุ์"
          style={styles.input}
          value={form.properties?.seeds?.join(", ") ?? ""}
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
          placeholder="ทั่วไป"
          style={styles.input}
          value={form.properties?.general?.join(", ") ?? ""}
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

        <Text style={{ fontFamily: "bold" }}>การใช้งาน</Text>

        <TextInput
          placeholder="วิธีใช้"
          style={styles.input}
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
          placeholder="ปริมาณการใช้"
          style={styles.input}
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

        <TextInput
          placeholder="องค์ประกอบทางเคมี"
          style={styles.input}
          value={form.chemical_composition?.join(", ") ?? ""}
          onChangeText={(text) =>
            setForm({
              ...form,
              chemical_composition: text.split(",").map((name) => name.trim()),
            })
          }
        />

        <Text style={{ fontFamily: "bold" }}>คุณค่าทางโภชนาการ</Text>

        <TextInput
          placeholder="เครื่องดื่ม"
          style={styles.input}
          value={form.nutritional_value?.beverage?.join(", ") ?? ""}
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
          placeholder="อาหาร"
          style={styles.input}
          value={form.nutritional_value?.food?.join(", ") ?? ""}
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
          placeholder="วิตามิน"
          style={styles.input}
          value={form.nutritional_value?.vitamins?.join(", ") ?? ""}
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
        <TextInput
          placeholder="สีอาหาร"
          style={styles.input}
          value={form.nutritional_value?.coloring?.join(", ") ?? ""}
          onChangeText={(text) =>
            setForm({
              ...form,
              nutritional_value: {
                ...form.nutritional_value,
                coloring: text.split(",").map((item) => item.trim()),
              },
            })
          }
        />

        <TextInput
          placeholder="ราคา"
          style={styles.input}
          value={(form.price ?? 0).toString()}
          onChangeText={(text) =>
            setForm({ ...form, price: text ? Number(text) : 0 })
          }
          keyboardType="numeric"
        />
        <TextInput
          placeholder="จำนวนสต๊อก"
          style={styles.input}
          value={(form.stock ?? 0).toString()}
          onChangeText={(text) =>
            setForm({ ...form, stock: text ? Number(text) : 0 })
          }
          keyboardType="numeric"
        />
        <View style={styles.imageWrapper}>
          <Button title="เลือกรูปภาพ" onPress={pickImage} />
          {form.imageUrl ? (
            <Image
              source={{ uri: form.imageUrl }}
              style={styles.image}
            />
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSubmit} color="green" />
        <Button title="Cancel" onPress={() => navigation.goBack()} />
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