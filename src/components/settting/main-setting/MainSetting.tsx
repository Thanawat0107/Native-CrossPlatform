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

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: SIZES.xxLarge,
        }}
      >
        <Text style={styles.title}>Admin Managements</Text>
      </View>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ProductSetting")}
        >
          <Text style={styles.buttonText}>การจัดการสินค้า</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("GroupSetting")}
        >
          <Text style={styles.buttonText}>การจัดการกลุ่มยาสมุนไพร</Text>
        </TouchableOpacity>
      </View>
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

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: SIZES.xxLarge,
        }}
      >
        <Text style={styles.title}>Admin Dashboards</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HerbalPropertiesReport")}
        >
          <Text style={styles.buttonText}>คุณสมบัติสมุนไพร</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HerbalNutritionReport")}
        >
          <Text style={styles.buttonText}>โภชนาการจากสมุนไพร</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PriceComparisonReport")}
        >
          <Text style={styles.buttonText}>เปรียบเทียบราคา</Text>
        </TouchableOpacity>

      </View>
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
    marginTop: 25,
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