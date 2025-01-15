import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import { Platform } from "react-native";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { HomeStack } from "./StackTabs";
import { AccountScreen, SearchScreen, SettingScreen } from "../screen";
import { themes } from "../constants/themes";

const Tab = createBottomTabNavigator();
const isIOS = Platform.OS === "ios";

const RootTabs = () => {
  const screenOptions = ({ route }: {
    route: RouteProp<ParamListBase, string>;
  }): BottomTabNavigationOptions => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    tabBarActiveTintColor: themes.THEME.colors.green,
    tabBarInactiveTintColor: "#6c757d",
    tabBarStyle: {
      backgroundColor: "#f8f9fa",
      height: 60,
      position: "absolute",
      bottom: isIOS ? 25 : 15,
      flexDirection: "row",
      justifyContent: "space-between",
      // alignItems: "center",
      marginHorizontal: 15,
      // paddingVertical: 15,
      borderRadius: 30,
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
    },
    //tabBarIconStyle: { marginBottom: 2 },
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
        name="Setting"
        component={SettingScreen}
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
