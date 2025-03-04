import { Platform } from "react-native";
const baseUrlOs = "http://10.0.2.2:3001/";
const baseUrlIos = "http://localhost:3001/";

export const isIOS = Platform.OS === "ios";

export const baseUrl = isIOS ? baseUrlIos : baseUrlOs;