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
import IconButton from '../common/CommonComponents/IconButton';

const { width, height } = Dimensions.get('screen');
const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width / 1.3;
const SPACING_FOR_CARD_INSET = RFPercentage(2);


export default MapScreen = ({ navigation }) => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [initRegion, setInitRegion] = useState(null);
  const _map = useRef(null);
  // const _scrollView = useRef(null);

  useEffect(() => {
    console.log('1st UseEffect');
    Platform.OS === 'ios'
      ? askForPermissions(PERMISSIONS.IOS.LOCATION_ALWAYS)
      : askForPermissions(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
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

  const interpolations = RestaurantDetails.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
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
            {RestaurantDetails.map((item, index) => {
              // console.log('item: ', item);
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale
                  }
                ]
              }
              return (
                <Marker
                  key={index}
                  coordinate={item.coordinate}
                  title={item.title}
                  description={item.description}
                  image={IconLinks.locationMarker128px}
                >

                </Marker>
              );
            })}
          </MapView>
          <View style={{ flex: 1, position: 'absolute', bottom: 0 }}>

            <Animated.FlatList
              data={RestaurantDetails}
              showsHorizontalScrollIndicator={false}
              horizontal
              // snapToInterval={CARD_WIDTH + RFPercentage(4) + Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0}
              snapToInterval={CARD_WIDTH + RFPercentage(4)}
              snapToAlignment="center"
              pagingEnabled
              scrollEventThrottle={16}
              decelerationRate={'fast'}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: mapAnimation
                      }
                    }
                  }
                ],
                { useNativeDriver: true }
              )}
              renderItem={({ item, index }) => {
                return (

                  <View style={styles.cardContainer} key={index}>
                    <Image source={item.imgUrl} style={styles.restaurantImages} />
                    <View style={styles.sliderDetails}>
                      <View style={styles.sliderDetailsLeft}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.bodyTxt}>{item.description}</Text>
                      </View>
                      <View style={styles.sliderDetailsRight}>
                        <IconButton
                          imgSrc={IconLinks.direction}
                          imgStyle={styles.iconImage}
                          buttonStyle={styles.btnStyle}
                          onPress={() => navigation.navigate('routeMap', {
                            item: item
                          })}
                        />
                      </View>
                    </View>
                  </View>

                );
              }}

            />
          </View>
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
  sliderContainer: {
    flexDirection: 'row',
    width: width,
    borderRadius: RFPercentage(2),
    overflow: 'hidden',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: RFPercentage(2),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    marginHorizontal: RFPercentage(2),
    marginBottom: RFPercentage(4),
  },
  title: {
    fontWeight: '700',
    fontSize: RFPercentage(2.2),
  },
  bodyTxt: {
    // fontWeight: '500',
    fontSize: RFPercentage(1.8),
    color: COLORS.grey,
  },
  restaurantImages: {
    height: RFPercentage(20),
    width: '100%',
  },
  sliderDetails: {
    flexDirection: 'row',
    paddingHorizontal: RFPercentage(2),
  },
  sliderDetailsLeft: {
    flex: 1,
    paddingVertical: RFPercentage(1.5),
    paddingBottom: RFPercentage(4),
  },
  sliderDetailsRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: COLORS.darkorange,
    borderRadius: RFPercentage(0.8),
    paddingVertical: RFPercentage(1),
    paddingHorizontal: RFPercentage(1.5),
    marginLeft: RFPercentage(1),
  },
  iconImage: {
    tintColor: COLORS.white,
    width: RFPercentage(2.5),
    height: RFPercentage(2.5),
  },
  leftRightArrow: {
    height: RFPercentage(3),
    width: RFPercentage(3),
    tintColor: COLORS.black,
  },
  markerIcon: {
    tintColor: COLORS.green,
    height: RFPercentage(5),
    width: RFPercentage(5)
  },
});
