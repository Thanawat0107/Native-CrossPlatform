import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/themes";
import { useAppNavigation } from "../hooks/useAppNavigation";

const Search = () => {
  const navigation = useAppNavigation();

  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity>
        <Feather name="search" size={24} style={styles.searchIcon} />
      </TouchableOpacity>
      <View style={styles.searchWrapper}>
        <TextInput
          value=""
          placeholder="What are you looking for"
          style={styles.textInput}
          onPressIn={() => navigation.navigate("Search")}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            color={COLORS.offwhite}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.while,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.while,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  textInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
    fontSize: 14,
  },
  searchBtn: {
    width: 45,
    height: "90%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.gray2,
  },
});
