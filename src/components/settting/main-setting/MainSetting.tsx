import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useAppNavigation } from '../../../hooks/useAppNavigation'
import { COLORS, SIZES } from '../../../constants/themes'
import { Ionicons } from '@expo/vector-icons';


const MainManagements = () => {
  const navigation = useAppNavigation();
  const handleGoBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.lightWhite}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>Admin Setting</Text>
      </View>

      <Text style={styles.title}>Admin Managements</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ProductSetting")}
      >
        <Text style={styles.buttonText}>Management Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CategorySetting")}
      >
        <Text style={styles.buttonText}>Management Category</Text>
      </TouchableOpacity>
    </View>
  );
}

const MainDashboards = () => {
  const navigation = useAppNavigation();
  const handleGoBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.lightWhite}
          />
        </TouchableOpacity>

        <Text style={styles.heading}>Admin Setting</Text>
      </View>

      <Text style={styles.title}>Admin Dashboards</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HerbalPropertiesReport")}
      >
        <Text style={styles.buttonText}>HerbalPropertiesReport</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HerbalNutritionReport")}
      >
        <Text style={styles.buttonText}>HerbalNutritionReport</Text>
      </TouchableOpacity>
    </View>
  );
}

export { MainManagements, MainDashboards };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.xxLarge,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  upperRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.green3,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },
  heading: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginHorizontal: 10,
  },
})