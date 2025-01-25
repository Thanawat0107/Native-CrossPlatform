import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp } from '@react-navigation/native';
import { Herb, RootStackParamList } from '../../../../@types';
import { useAppDispatch } from '../../../hooks/useAppHookState';
import { addHerb, updateHerb } from '../../../store/slices/herbsSlice';
import { useAddHerbMutation, useUpdateHerbMutation } from '../../../fetch/herbsApi';
import { useAppNavigation } from '../../../hooks/useAppNavigation';

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
    name: herb?.name || "",
    categories: herb?.categories || "",
    benefits: herb?.benefits || "",
    price: herb?.price ?? 0,
    stock: herb?.stock ?? 0,
    imageUrl: herb?.imageUrl || "",
  });

  const resetForm = () => {
    setForm({
      id: 0,
      name: "",
      categories: "",
      benefits: "",
      price: 0,
      stock: 0,
      imageUrl: "",
    });
  };

  const handleSubmit = async () => {
    if (!form.name || form.price === undefined || form.price < 0) {
      alert("Please fill out all required fields and ensure the price is valid.");
      return;
    }

    try {
      if (isEditMode && herb) {
        await updateHerb({ id: herb.id, editHerb: form });
        alert("Herb updated successfully!");
      } else {
        addHerb(form);
        alert("Herb added successfully!");
      }
      navigation.goBack();
      resetForm();
    } catch (error) {
      console.error("Failed to save herb:", error);
      alert("Error saving herb");
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {isEditMode ? `Edit Product: ${herb?.name}` : "Add New Product"}
      </Text>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
      />
      <TextInput
        placeholder="Categories"
        style={styles.input}
        value={form.categories}
        onChangeText={(text) => setForm({ ...form, categories: text })}
      />
      <TextInput
        placeholder="Benefits"
        style={styles.input}
        value={form.benefits}
        onChangeText={(text) => setForm({ ...form, benefits: text })}
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
        {isEditMode && (
          <Button title="Delete" onPress={() => {}} color="red" />
        )}
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

export default ProductUpsert

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  throw new Error('Function not implemented.');
}
