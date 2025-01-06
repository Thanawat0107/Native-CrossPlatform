import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  View,
  Image,
  Text,
} from "react-native";
import React from "react";

const isIOS = Platform.OS === "ios";

export default function ProductCard() {
  const imageUrl =
    "https://cdn.shopify.com/s/files/1/1740/1449/files/Herb_Blog1-2.jpg?v=1676411773";
  return (
    <>
      <TouchableOpacity style={styles.container}>
        <View style={styles.imageWepper}>
          <Image source={{ uri: imageUrl }} style={styles.productImage} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.productName} numberOfLines={1}>
            Herb view najaa
          </Text>
          <Text style={styles.categoty}> OK </Text>
          <Text style={styles.productPrice}> $550 </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    ...(isIOS
      ? {
          shadowColor: "black",
          shadowOffset: { width: 0, height: 10 },
          shadowRadius: 10,
          shadowOpacity: 0.1,
        }
      : {
          elevation: 5,
        }),
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginVertical: 5,
  },
  
  imageWepper: {
    borderRadius: 12,
    backgroundColor: "#6c757d",
    margin: 10,
  },
  productImage: {
    height: 120,
    width: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
  contentContainer: {
    //padding: 10,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  productName: {
    color: "#444444",
    fontSize: 16,
    fontFamily: "",
  },
  categoty: {
    color: "#737373",
  },
  productPrice: {
    //fontWeight: "bold",
    fontSize: 16,
    textAlign: "right",
    color: "#5B41FF",
  },
});
