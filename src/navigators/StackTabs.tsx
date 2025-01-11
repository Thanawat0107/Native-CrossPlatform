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
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "หน้าหลัก", // ชื่อหน้า
          headerShown: false, // ซ่อน Header
          animation: "fade", // Animation
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          title: "สินค้า", // ชื่อหน้า
          headerShown: false, // ซ่อน Header
          animation: "fade", // Animation
        }}
      />
    </Stack.Navigator>
  );
}



export { HomeStack }