import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Herb } from '../../../../@types';
import { baseUrl, isIOS } from '../../../helpers/SD';
import { SIZES } from '../../../constants/themes';
import { hp, wp } from '../../../helpers/common';

const ProductItem = ({ herb }: { herb: Herb }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={{flexDirection: "row"}}>
        <View style={styles.imageWepper}>
          <Image
            source={{ uri: `${baseUrl}${herb.imageUrl}` }}
            style={styles.productImage}
          />
        </View>
        <View>
          <Text style={styles.itemName} numberOfLines={1}>
            {herb.name}
          </Text>
          <Text style={styles.itemDescription} numberOfLines={1}>
            หมวดหมู่ : {herb.categories}
          </Text>
          <Text style={styles.itemDescription} numberOfLines={1}>
            ราคา : {herb.price} บาท
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductItem

const styles = StyleSheet.create({
  itemContainer: {
    padding: 5,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  imageWepper: {
    width: wp(20),
    height: hp(10),
    borderRadius: SIZES.medium,
    backgroundColor: "#6c757d",
    overflow: "hidden",
    marginRight: 10,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.medium,
    resizeMode: "cover",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#6c757d",
  },
});