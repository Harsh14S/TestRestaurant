import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { request, PERMISSIONS } from 'react-native-permissions';

export const PermissionAccessor = (permission) => {
  // await askForPermissions(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  request(permission).then(result => {
    console.log('Permission Result: ', result);
    if (result === 'granted') {
      // setIsPermissionGranted(true);
      return result;
    } else {
      // setIsPermissionGranted(false);
      return result;
    }
  }).then(result => {
    console.log("Results2: ", result);
    // if (result !== 'granted'){
    //   PermissionAccessorAndroid()
    // }
  })
}

export const PermissionAccessorANDROID = async (permission) => {
  await askForPermissions(PERMISSIONS.IOS.LOCATION_ALWAYS)
}
export const PermissionAccessorIOS = async (permission) => {
  await askForPermissions(PERMISSIONS.IOS.LOCATION_ALWAYS)
}
