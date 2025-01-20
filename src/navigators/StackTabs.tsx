import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen, HomeScreen, SettingScreen } from '../screen';
import { Cart, ProductDetails } from '../components';
import { CategoryCRUD, ProductCRUD } from '../components/settting';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerStyle: { backgroundColor: "#6200EE" },  
  headerTintColor: "#FFFFFF",                  
  headerTitleStyle: { fontWeight: "bold" },   
  animation: "slide_from_right",               
}

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack.Navigator>
  );
}

const SettingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="ProductCRUD"
        component={ProductCRUD}
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="CategoryCRUD"
        component={CategoryCRUD}
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack.Navigator>
  );
}

export { HomeStack, SettingStack }