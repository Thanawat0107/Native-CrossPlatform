import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import SetingScreent from '../screen/SetingScreent';
import ProfileScreen from '../screen/ProfileScreen';
import CartScreen from '../screen/CartScreen';
import TabBar from '../components/TabBar';

const Tab = createBottomTabNavigator();

const RootTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Seting" component={SetingScreent} />
  </Tab.Navigator>
  );
}

export default RootTabs