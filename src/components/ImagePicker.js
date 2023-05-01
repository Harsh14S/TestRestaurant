import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { CommonStyles } from '../common/CommonStyles';
import { COLORS } from '../common/Colors';
import HeaderHome from '../common/Headers/HeaderHome';
import Button from '../common/CommonComponents/Button';
import { RFPercentage } from 'react-native-responsive-fontsize';
import HeaderImagePicker from '../common/Headers/HeaderImagePicker';
import { request, PERMISSIONS } from 'react-native-permissions';
import { PermissionAccessor } from '../common/PermissionAccessor';

export default ImagePicker = ({ navigation }) => {
  useEffect(() => {
    console.log('1st UseEffect');
    Platform.OS === 'ios'
      ? PermissionAccessor(PERMISSIONS.IOS.CAMERA)
      : PermissionAccessor(PERMISSIONS.ANDROID.CAMERA);
  }, []);

  return (
    <View style={[styles.container, CommonStyles.verticalPadding]}>
      <HeaderImagePicker navigation={navigation} />
      <View style={styles.subContainer}>
        <View style={{ backgroundColor: COLORS.blue, marginTop: RFPercentage(2), paddingVertical: RFPercentage(2), alignItems: 'center', borderRadius: RFPercentage(1.5) }}>
          <Text style={{ fontSize: RFPercentage(2.5), fontWeight: '700', color: COLORS.white }}>Add Image</Text>
        </View>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
    // paddingHorizontal
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: RFPercentage(3),
    // justifyContent: 'center',
    backgroundColor: COLORS.white,
    marginTop: RFPercentage(9),
  },
  btnStyle: {},
});
