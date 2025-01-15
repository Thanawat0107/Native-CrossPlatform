import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, ProductDetailsScreen } from '../screen';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerStyle: { backgroundColor: "#6200EE" },  // สีพื้นหลัง Header
  headerTintColor: "#FFFFFF",                  // สีตัวอักษร Header
  headerTitleStyle: { fontWeight: "bold" },    // รูปแบบตัวอักษร
  animation: "slide_from_right",               // Animation เปลี่ยนหน้า
}

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack.Navigator>
  );
}

export { HomeStack }