import { Image, StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS } from '../Colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import IconButton from '../CommonComponents/IconButton';
import { IconLinks } from '../IconLinks';
import { CommonStyles, commonHeaderStyle } from '../CommonStyles';

export default HeaderImagePicker = ({ navigation }) => {
  return (
    <View style={commonHeaderStyle.headerContainer}>
      <StatusBar barStyle={'light-content'} />
      <IconButton
        imgSrc={IconLinks.leftArrow}
        onPress={() => navigation.goBack()}
      />
      <Text style={commonHeaderStyle.headerText}>Image Picker</Text>
      <IconButton imgSrc={IconLinks.filledCart} imgStyle={{ tintColor: COLORS.white }} disabled />
    </View>
  );
};

const styles = StyleSheet.create({
});
