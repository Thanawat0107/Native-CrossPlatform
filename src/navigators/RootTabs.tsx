import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import { Platform } from "react-native";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { HomeStack, SettingStack } from "./StackTabs";
import { AccountScreen, SearchScreen } from "../screen";
import { COLORS } from "../constants/themes";

const Tab = createBottomTabNavigator();
const isIOS = Platform.OS === "ios";

const RootTabs = () => {
  const screenOptions = ({
    route,
  }: {
    route: RouteProp<ParamListBase, string>;
  }): BottomTabNavigationOptions => ({
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarActiveTintColor: COLORS.green,
    tabBarInactiveTintColor: "#6c757d",
      // paddingVertical: 15,
    tabBarStyle: {
      position: "absolute",
      bottom: isIOS ? 25 : 0,
      height: 60,
      flexDirection: "row",
      justifyContent: "space-between",
      ...(isIOS ? {
            //ios
            alignItems: "center",
          }
        : {
            //os
          }),
      ...(isIOS
        ? {
            //ios
            marginHorizontal: 15,
          }
        : {
            //os
          }),
      ...(isIOS
        ? {
            //ios
            borderRadius: 30,
          }
        : {
            //os
          }),
      ...(isIOS
        ? {
            shadowColor: "black",
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 10,
            shadowOpacity: 0.1,
          }
        : {
            elevation: 0,
          }),
    },
  });

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="home" size={size || 26} color={color} />
          ),
          tabBarLabel: "หน้าแรก",
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Feather name="search" size={size || 26} color={color} />
          ),
          tabBarLabel: "ค้นหา",
        }}
      />
      {/* <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="shoppingcart" size={size || 26} color={color} />
          ),
          tabBarBadge: 99,
          tabBarBadgeStyle: { backgroundColor: "#dc3545", color: "#fff" },
          tabBarLabel: "รถเข็น",
        }}
      /> */}
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="user" size={size || 26} color={color} />
          ),
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: "#dc3545", color: "#fff" },
          tabBarLabel: "บัญชี",
        }}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingStack}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="setting" size={size || 26} color={color} />
          ),
          tabBarLabel: "ตั้งค่า",
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTabs;
