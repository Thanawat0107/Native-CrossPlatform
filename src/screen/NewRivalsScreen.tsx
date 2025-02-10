import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/themes'
import { Ionicons } from '@expo/vector-icons'
import { useAppNavigation } from '../hooks/useAppNavigation'
import { ProductList } from '../components'
import { isIOS } from '../helpers/SD'

const NewRivalsScreen = () => {
  const navigation = useAppNavigation();
  const handleGoBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>รายการสินค้า</Text>
        </View>
        
        <ProductList />
      </View>
    </View>
  );
}

export default NewRivalsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.lightWhite,
    marginTop: SIZES.xsLarge,
    marginBottom: isIOS? 10 : 0,
  },
  wrapper: {
    flex: 1,
    // backgroundColor: COLORS.lightWhite
  }, 
  upperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
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
    marginLeft: 5,
  }
});