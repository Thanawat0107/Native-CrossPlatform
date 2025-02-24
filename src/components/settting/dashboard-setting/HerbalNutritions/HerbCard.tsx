import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const HerbCard = ({ herb }: any) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: herb.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{herb.scientific_name}</Text>
      <Text style={styles.family}>🌿 วงศ์: {herb.family}</Text>
      <Text style={styles.commonNames}>
        {herb.common_names.join(", ")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 10 },
  image: { width: "100%", height: 150, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  family: { fontSize: 14, color: "gray" },
  commonNames: { fontSize: 14, marginTop: 5 }
});

export default HerbCard;
