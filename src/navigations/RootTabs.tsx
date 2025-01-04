import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import SettingScreent from '../screen/SettingScreent';
import AccountScreen from '../screen/AccountScreen';
import CartScreen from '../screen/CartScreen';
import TabBar from '../components/TabBar';

const Tab = createBottomTabNavigator();

const RootTabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Setting" component={SettingScreent} />
    </Tab.Navigator>
  );
}

export default RootTabs