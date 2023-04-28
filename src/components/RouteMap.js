import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { COLORS } from '../common/Colors';
import HeaderMapScreen from '../common/Headers/HeaderMapScreen';
import { CommonStyles } from '../common/CommonStyles';
import CarouselItem from './CarouselItem';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { RestaurantDetails } from '../assets/data';
import { IconLinks } from '../common/IconLinks';
import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('screen');
const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width / 1.3;
const SPACING_FOR_CARD_INSET = RFPercentage(2);

const GOOGLE_MAPS_APIKEY = 'AIzaSyA_ytvniIVKFoF8aEfW8L3xFF2uBFtvgJQ';


export default RouteMap = ({ route, navigation }) => {
  const dataItem = route.params.item
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [initRegion, setInitRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const _map = useRef(null);
  // const _scrollView = useRef(null);

  useEffect(() => {
    console.log('1st UseEffect');
    console.log('Routes: ', dataItem);
    Platform.OS === 'ios'
      ? askForPermissions(PERMISSIONS.IOS.LOCATION_ALWAYS)
      : askForPermissions(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    setDestination(dataItem.coordinate);
  }, []);

  const askForPermissions = async permission => {
    await request(permission).then(result => {
      console.log('Permission Result: ', result);
      if (result === 'granted') {
        setIsPermissionGranted(true);
      } else {
        setIsPermissionGranted(false);
      }
    });
  };

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3)
      if (index >= RestaurantDetails.length) {
        index = RestaurantDetails.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = RestaurantDetails[index];
          _map.current.animateToRegion({
            ...coordinate,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }, 300);
        }
      }, 10)
    });
  });

  useEffect(() => {
    // console.log("2nd UseEffect");
    if (isPermissionGranted) {
      // console.log("Location");
      Geolocation.getCurrentPosition(
        position => {
          // console.log(position.coords);
          setInitRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          });
        },
        error => {
          console.log('Error: ', error);
          // console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 },
      );
    }
  }, [askForPermissions]);

  return (
    <View style={[styles.container, CommonStyles.verticalPadding]}>
      <HeaderMapScreen navigation={navigation} />
      {initRegion && isPermissionGranted ? (
        <View style={{ flex: 1 }}>
          <MapView
            // provider={PROVIDER_GOOGLE}
            ref={_map}
            initialRegion={initRegion}
            style={{ flex: 1 }}>
            <MapViewDirections
              origin={initRegion}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
            />
            <Marker
              coordinate={initRegion}
              title="Current Location"
              description="You are currently standing here"
            >
              <Image
                style={{
                  height: RFPercentage(5),
                  width: RFPercentage(5),
                  // tintColor: COLORS.darkorange,
                }}
                source={IconLinks.positionPin}
                resizeMode="contain"
              />
            </Marker>
            <Marker
              coordinate={initRegion}
              title="Your Destination"
              description="You want to go there"
            >
              <Image
                style={{
                  height: RFPercentage(5),
                  width: RFPercentage(5),
                  // tintColor: COLORS.darkorange,
                }}
                source={IconLinks.positionPin}
                resizeMode="contain"
              />
            </Marker>
          </MapView>
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator
            size={Platform.OS === 'ios' ? 'large' : RFPercentage(7)}
            color={COLORS.blue}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
