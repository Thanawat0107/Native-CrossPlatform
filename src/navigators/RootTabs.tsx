import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/HomeScreen";
import SettingScreent from "../screen/SettingScreent";
import AccountScreen from "../screen/AccountScreen";
import CartScreen from "../screen/CartScreen";
import { AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();
const isIOS = Platform.OS === "ios";

const RootTabs = () => {
  const tabBarStyles = {
    backgroundColor: "#f8f9fa",
            height: 60,
            position: "absolute",
            bottom: isIOS ? 25 : 15, // ระยะห่างที่แตกต่างระหว่าง iOS และ Android
            flexDirection: "row",
            justifyContent: "space-between", // ให้แต่ละ Tab กระจายตำแหน่ง
            alignContent: "center",
            marginHorizontal: 20,
            paddingVertical: 15,
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
  }
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#5B4", 
        tabBarInactiveTintColor: "#6c757d", 
        tabBarStyle: tabBarStyles, 
        tabBarIconStyle: { marginBottom: 2 }, 
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size || 26} color={color} />
          ),
          tabBarLabel: "หน้าแรก",
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={size || 26} color={color} />
          ),
          tabBarBadge: 99,
          tabBarBadgeStyle: { backgroundColor: "#dc3545", color: "#fff" },
          tabBarLabel: "ตะกร้า", 
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size || 26} color={color} />
          ),
          tabBarBadge: 3, 
          tabBarBadgeStyle: { backgroundColor: "#dc3545", color: "#fff" }, 
          tabBarLabel: "บัญชี", 
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreent}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size || 26} color={color} />
          ),
          tabBarLabel: "ตั้งค่า", 
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTabs;
