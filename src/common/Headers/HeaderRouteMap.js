import {Image, StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {COLORS} from '../Colors';
import {RFPercentage} from 'react-native-responsive-fontsize';
import IconButton from '../CommonComponents/IconButton';
import {IconLinks} from '../IconLinks';
import {CommonStyles} from '../CommonStyles';

export default HeaderRouteMap = ({navigation}) => {
  return (
    <View style={[styles.container, CommonStyles.topMargin]}>
      <StatusBar barStyle={'dark-content'} />
      <IconButton
        imgSrc={IconLinks.leftArrow}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.headerTxt}>Path Way</Text>
      <IconButton imgSrc={IconLinks.gps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(1),
    marginTop: RFPercentage(6),
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    elevation: 2,
    zIndex: 2,
  },
  headerTxt: {
    fontSize: RFPercentage(3.5),
    color: COLORS.darkorange,
    fontWeight: '700',
  },
});
