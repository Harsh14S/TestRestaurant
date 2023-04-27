import { ActivityIndicator, Modal, PermissionsAndroid, Platform, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { COLORS } from '../common/Colors'
import HeaderMapScreen from '../common/Headers/HeaderMapScreen'
import { CommonStyles } from '../common/CommonStyles'
import { ImageLinks } from '../common/ImageLinks'
import CarouselItem from './CarouselItem'
import Geolocation from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location'
import { request, PERMISSIONS } from 'react-native-permissions';
import { RFPercentage } from 'react-native-responsive-fontsize'
import { RestaurantDetails } from '../assets/data'
import { IconLinks } from '../common/IconLinks'

export default MapScreen = ({ navigation }) => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [initRegion, setInitRegion] = useState(null)


  useEffect(() => {
    console.log("1st UseEffect");
    Platform.OS === 'ios' ? askForPermissions(PERMISSIONS.IOS.LOCATION_ALWAYS) : askForPermissions(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    // Platform.OS === 'ios' ? setInitRegion({
    //   latitude: 21.2339244,
    //   longitude: 72.863415,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // }) : null;
  }, []);

  const askForPermissions = async (permission) => {
    await request(permission).then((result) => {
      console.log("Permission Result: ", result);
      setIsPermissionGranted(result);
    });
  }

  useEffect(() => {
    // console.log("2nd UseEffect");
    if (isPermissionGranted) {
      // console.log("Location");
      Geolocation.getCurrentPosition(
        (position) => {
          // console.log(position.coords);
          setInitRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          })
        },
        (error) => {
          console.log("Error: ", error);
          // console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
      );
      // GetLocation.getCurrentPosition({
      //   enableHighAccuracy: true,
      //   timeout: 60000,
      // })
      //   .then(location => {
      //     console.log(location);
      //     setInitRegion({
      //       latitude: location.latitude,
      //       longitude: location.longitude,
      //       latitudeDelta: 0.0922,
      //       longitudeDelta: 0.0421,
      //     })
      //   })
      //   .catch(error => {
      //     const { code, message } = error;
      //     console.warn(code, message);
      //   })
    }
  }, [askForPermissions]);

  return (
    <View style={[styles.container, CommonStyles.verticalPadding]}>
      <HeaderMapScreen navigation={navigation} />
      {initRegion && isPermissionGranted ?
        (<View style={{ flex: 1 }}>
          <MapView
            // provider={}
            initialRegion={initRegion}
            style={{ flex: 1 }}
          >
            {/* <Text style={{ zIndex: 1 }}>Hii</Text> */}
            <Marker
              coordinate={initRegion}
              title='Current Location'
              description='You are currently standing here'
            // image={IconLinks.locationMarker}

            />
          </MapView>
          <View style={{ flex: 1, position: 'absolute', bottom: 0 }}>
            <CarouselItem CarouselData={RestaurantDetails} />
          </View>
        </View>)
        : (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size={Platform.OS === 'ios' ? "large" : RFPercentage(7)} color={COLORS.blue} />
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.blue,
  }
})
