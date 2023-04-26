import { Platform, StatusBar, StyleSheet } from "react-native";
import { COLORS } from "./Colors";
// import { RFPercentage } from "react-native-responsive-fontsize";

const isIOS = Platform.OS === 'ios';
const statusBarHeight = StatusBar.currentHeight;

export const CommonStyles = StyleSheet.create({
  verticalPadding: {
    paddingTop: isIOS ? '10%' : statusBarHeight,
    paddingBottom: isIOS ? '7%' : null,
  },
})
