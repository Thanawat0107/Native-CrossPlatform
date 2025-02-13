import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen, NewRivalsScreen } from '../screen';
import { ProductDetails } from '../components';
import { CategorySetting, ProductSetting, ProductUpsert } from '../components/settting';
import RootTabs from './RootTabs';
import HerbalPropertiesReport from '../components/settting/dashboard-setting/HerbalPropertiesReport';
import { MainDashboards, MainManagements } from '../components/settting/main-setting/MainSetting';
import HerbalNutritionReport from '../components/settting/dashboard-setting/HerbalNutritionReport';

const Stack = createNativeStackNavigator();

const StackTabs = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Bottom Navigation'
        component={RootTabs}
        options={{headerShown: false}}
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

      <Stack.Screen
        name="MainManagements"
        component={MainManagements}
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

      <Stack.Screen
        name="MainDashboards"
        component={MainDashboards}
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="HerbalPropertiesReport"
        component={HerbalPropertiesReport}
        options={{ headerShown: false, }}
      />
      <Stack.Screen
        name="HerbalNutritionReport"
        component={HerbalNutritionReport}
        options={{ headerShown: false, }}
      />
    </Stack.Navigator>
  )
}

export { StackTabs }