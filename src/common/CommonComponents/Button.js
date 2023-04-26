import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS } from '../Colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export default ManualButton = ({ title, buttonStyle, textStyle, ...props }) => {
  return (
    <TouchableOpacity style={[styles.btnStyle, buttonStyle]} {...props}>
      <Text style={[styles.btnTxt, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    // height: RFPercentage(6),
    paddingVertical: RFPercentage(1.5),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: RFPercentage(1),
    backgroundColor: COLORS.green,
    // borderWidth: RFPercentage(0.1),
    borderRadius: RFPercentage(1),
  },
  btnTxt: {
    fontSize: RFPercentage(2.1),
    color: COLORS.white,
    fontWeight: '700',
  },
});
