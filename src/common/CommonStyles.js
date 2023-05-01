import { Platform, StatusBar, StyleSheet } from 'react-native';
import { COLORS } from './Colors';
import { hasNotch } from 'react-native-device-info';
import { RFPercentage } from 'react-native-responsive-fontsize';
// import { RFPercentage } from "react-native-responsive-fontsize";

const isIOS = Platform.OS === 'ios';
const statusBarHeight = StatusBar.currentHeight;
const notch = hasNotch();

export const CommonStyles = StyleSheet.create({
  verticalPadding: {
    // marginTop: isIOS ? (notch ? '10%' : '6%') : null,
    paddingTop: isIOS ? (notch ? '10%' : '6%') : statusBarHeight,
    paddingBottom: isIOS ? (notch ? '7%' : null) : null,
  },
});

export const commonHeaderStyle = StyleSheet.create({
  headerContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(1),
    marginTop: isIOS ? (notch ? '10%' : '6%') : (notch ? statusBarHeight : statusBarHeight),
    backgroundColor: COLORS.white,
    zIndex: 2,
    shadowColor: COLORS.black,
    elevation: 20,
    shadowOffset: {
      height: RFPercentage(0.1),
      width: RFPercentage(0.1)
    },
    shadowOpacity: 0.5,
    shadowRadius: RFPercentage(2),
  },
  headerText: {
    fontSize: RFPercentage(3.5),
    color: COLORS.darkorange,
    fontWeight: '700',
  }
})
