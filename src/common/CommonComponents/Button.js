import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS } from '../Colors';
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
    backgroundColor: COLORS.white,
    // borderWidth: RFPercentage(0.1),
    borderRadius: RFPercentage(1),
    shadowColor: COLORS.black,
    elevation: 5,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowOpacity: 1,
    shadowRadius: RFPercentage(0.5),
  },
  btnTxt: {
    fontSize: RFPercentage(2.3),
    color: COLORS.darkorange,
    fontWeight: '700',
  },
});
