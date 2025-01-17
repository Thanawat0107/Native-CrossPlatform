// export const baseUrlOs = "http://10.120.0.38:3001/";
import { Platform } from "react-native";
const baseUrlOs = "http://10.0.2.2:3001/";
const baseUrlIos = "http://localhost:3001/";

const isIOS = Platform.OS === "ios";

export const baseUrl = isIOS ? baseUrlIos : baseUrlOs;