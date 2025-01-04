import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import RootTabs from './src/navigations/RootTabs';

export default function App() {
  return (
    <NavigationContainer>
      < RootTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
