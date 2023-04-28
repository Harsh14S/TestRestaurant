import { Platform, StatusBar, StyleSheet } from "react-native";
import { COLORS } from "./Colors";
import { hasNotch } from "react-native-device-info";
// import { RFPercentage } from "react-native-responsive-fontsize";

const isIOS = Platform.OS === 'ios';
const statusBarHeight = StatusBar.currentHeight;
const notch = hasNotch();

export const CommonStyles = StyleSheet.create({
  verticalPadding: {
    paddingTop: isIOS ? (notch ? '10%' : '6%') : statusBarHeight,
    paddingBottom: isIOS ? (notch ? '7%' : null) : null,
  },
})
