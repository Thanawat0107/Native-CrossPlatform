import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, ProductDetailsScreen } from '../screen';

const Stack = createNativeStackNavigator();
const screenOptions = {
  headerStyle: { backgroundColor: "#6200EE" },  
  headerTintColor: "#FFFFFF",                  
  headerTitleStyle: { fontWeight: "bold" },   
  animation: "slide_from_right",               
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