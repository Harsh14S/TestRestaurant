import { Image, StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import { COLORS } from '../Colors';
import { RFPercentage } from 'react-native-responsive-fontsize';
import IconButton from '../CommonComponents/IconButton';
import { IconLinks } from '../IconLinks';
import { CommonStyles, commonHeaderStyle } from '../CommonStyles';

export default HeaderMapScreen = ({ navigation, toYourCurrentLocation }) => {
  return (
    <View style={commonHeaderStyle.headerContainer}>
      <IconButton
        imgSrc={IconLinks.leftArrow}
        onPress={() => navigation.goBack()}
      />
      <Text style={commonHeaderStyle.headerText}>Maps Explorer</Text>
      <IconButton imgSrc={IconLinks.gps} onPress={toYourCurrentLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
});
