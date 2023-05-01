import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import { COLORS } from '../Colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import IconButton from '../CommonComponents/IconButton';
import { IconLinks } from '../IconLinks';
import { CommonStyles, commonHeaderStyle } from '../CommonStyles';

export default HeaderRouteMap = ({ navigation, toYourCurrentLocation }) => {
  return (
    <View style={commonHeaderStyle.headerContainer}>
      <StatusBar barStyle={'dark-content'} />
      <IconButton
        imgSrc={IconLinks.leftArrow}
        onPress={() => navigation.goBack()}
      />
      <Text style={commonHeaderStyle.headerText}>Path Way</Text>
      <IconButton imgSrc={IconLinks.gps} onPress={() => toYourCurrentLocation()} />
    </View>
  );
};

const styles = StyleSheet.create({
});
