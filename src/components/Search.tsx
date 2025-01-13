import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { themes } from "../constants/themes";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const navigation = useNavigation();

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
            size={themes.THEME.sizes.xLarge}
            color={themes.THEME.colors.offwhite}
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
    backgroundColor: themes.THEME.colors.while,
    borderRadius: themes.THEME.sizes.medium,
    marginVertical: themes.THEME.sizes.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: themes.THEME.colors.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: themes.THEME.colors.while,
    marginRight: themes.THEME.sizes.small,
    borderRadius: themes.THEME.sizes.small,
  },
  textInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: themes.THEME.sizes.small,
    fontSize: 14,
  },
  searchBtn: {
    width: 45,
    height: "90%",
    borderRadius: themes.THEME.sizes.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themes.THEME.colors.gray2,
  },
});
