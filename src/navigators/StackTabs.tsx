import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen, HomeScreen, NewRivalsScreen, SettingScreen } from '../screen';
import { ProductDetails } from '../components';
import { CategorySetting, ProductSetting, ProductUpsert } from '../components/settting';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerStyle: { backgroundColor: "#6200EE" },  
  headerTintColor: "#FFFFFF",                  
  headerTitleStyle: { fontWeight: "bold" }             
}

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="ProductList"
        component={NewRivalsScreen}
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerShown: false, }}
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
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="ProductSetting"
        component={ProductSetting}
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="ProductUpsert"
        component={ProductUpsert}
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="CategorySetting"
        component={CategorySetting}
        options={{ headerShown: false, }}
      />
    </Stack.Navigator>
  );
}

export { HomeStack, SettingStack }