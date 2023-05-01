import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import { COLORS } from '../Colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import IconButton from '../CommonComponents/IconButton';
import { IconLinks } from '../IconLinks';
import { CommonStyles, commonHeaderStyle } from '../CommonStyles';

export default HeaderHome = ({ navigation }) => {
  return (
    <View style={commonHeaderStyle.headerContainer}>
      <StatusBar barStyle={'light-content'} />
      <IconButton imgSrc={IconLinks.menuBars} />
      <Text style={commonHeaderStyle.headerText}>Home</Text>
      <IconButton imgSrc={IconLinks.filledCart} />
    </View>
  );
};

const styles = StyleSheet.create({
});
