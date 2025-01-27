import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
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

type ProductUpsertRouteProp = RouteProp<RootStackParamList, "ProductUpsert">;

interface ProductUpsertProps {
  route: ProductUpsertRouteProp;
}

const ProductUpsert = ({ route }: ProductUpsertProps) => {
  const herb = route.params?.herb as Herb | undefined;
  const navigation = useAppNavigation();
  const isEditMode = !!herb;
  const dispatch = useAppDispatch();
  const [addHerb] = useAddHerbMutation();
  const [updateHerb] = useUpdateHerbMutation();

  const [form, setForm] = useState<Partial<Herb>>({
    id: herb?.id || 0,
    group: herb?.group || "",
    other_names: herb?.other_names || [],
    botanical_description: herb?.botanical_description || "",
    properties: herb?.properties || {},
    usage: herb?.usage || {},
    chemical_composition: herb?.chemical_composition || [],
    nutritional_value: herb?.nutritional_value || {},
    price: herb?.price ?? 0,
    stock: herb?.stock ?? 0,
    imageUrl: herb?.imageUrl || "",
  });

  const resetForm = () => {
    setForm({
      id: 0,
      group: "",
      other_names: [],
      botanical_description: "",
      properties: {},
      usage: {},
      chemical_composition: [],
      nutritional_value: {},
      price: 0,
      stock: 0,
      imageUrl: "",
    });
  };

  const handleSubmit = async () => {
    if (!form.other_names || form.price === undefined || form.price < 0) {
      alert(
        "Please fill out all required fields and ensure the price is valid."
      );
      return;
    }

    try {
      if (isEditMode && herb) {
        await updateHerb({ id: herb.id, editHerb: form });
        Alert.alert("Success", "Herb updated successfully!");
      } else {
        await addHerb(form);
        Alert.alert("Success", "Herb added successfully!");
      }
      navigation.goBack();
      resetForm();
    } catch (error) {
      console.error("Failed to save herb:", error);
      Alert.alert("Error", "Error saving herb");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {isEditMode ? `Edit Product: ${herb?.other_names}` : "Add New Product"}
      </Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={form.other_names?.join(", ")}
        onChangeText={(text) =>
          setForm({
            ...form,
            other_names: text.split(",").map((name) => name.trim()),
          })
        }
      />
      <TextInput
        placeholder="Group"
        style={styles.input}
        value={form.group ?? ""}
        onChangeText={(text) => setForm({ ...form, group: text })}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={form.botanical_description}
        onChangeText={(text) =>
          setForm({ ...form, botanical_description: text })
        }
      />
      <TextInput
        placeholder="Properties (JSON)"
        style={styles.input}
        value={JSON.stringify(form.properties)}
        onChangeText={(text) =>
          setForm({ ...form, properties: JSON.parse(text) })
        }
      />
      <TextInput
        placeholder="Usage (JSON)"
        style={styles.input}
        value={JSON.stringify(form.usage)}
        onChangeText={(text) => setForm({ ...form, usage: JSON.parse(text) })}
      />
      <TextInput
        placeholder="Chemical Composition (comma-separated)"
        style={styles.input}
        value={form.chemical_composition?.join(", ")}
        onChangeText={(text) =>
          setForm({
            ...form,
            chemical_composition: text.split(",").map((comp) => comp.trim()),
          })
        }
      />
      <TextInput
        placeholder="Nutritional Value (JSON)"
        style={styles.input}
        value={JSON.stringify(form.nutritional_value)}
        onChangeText={(text) =>
          setForm({ ...form, nutritional_value: JSON.parse(text) })
        }
      />
      <TextInput
        placeholder="Price"
        style={styles.input}
        value={(form.price ?? 0).toString()}
        onChangeText={(text) => setForm({ ...form, price: Number(text) })}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Stock"
        style={styles.input}
        value={(form.stock ?? 0).toString()}
        onChangeText={(text) => setForm({ ...form, stock: Number(text) })}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Image URL"
        style={styles.input}
        value={form.imageUrl}
        onChangeText={(text) => setForm({ ...form, imageUrl: text })}
      />

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSubmit} color="green" />
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

export default ProductUpsert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.xsLarge,
    marginBottom: 55,
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
});

function deleteHerb(id: number): any {
  throw new Error("Function not implemented.");
}
