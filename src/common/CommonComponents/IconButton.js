import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { COLORS } from '../Colors';

export default IconButton = ({ imgSrc, buttonStyle, imgStyle, ...props }) => {
  return (
    <TouchableOpacity style={[styles.btnStyle, buttonStyle]} {...props}>
      <Image source={imgSrc} style={[styles.btnImg, imgStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    // height: RFPercentage(6),
    padding: RFPercentage(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: COLORS.green,
    // borderWidth: RFPercentage(0.1),
    borderRadius: RFPercentage(100),
  },
  btnImg: {
    height: RFPercentage(2.9),
    width: RFPercentage(2.9),
    tintColor: COLORS.blue
  },
});
