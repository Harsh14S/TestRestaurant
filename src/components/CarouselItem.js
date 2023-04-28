import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Carousel from 'react-native-snap-carousel';
import { CommonStyles } from '../common/CommonStyles';
import { COLORS } from '../common/Colors';
import { ImageLinks } from '../common/ImageLinks';
import { IconLinks } from '../common/IconLinks';
import IconButton from '../common/CommonComponents/IconButton';

const { width, height } = Dimensions.get('screen');
const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width / 1.3;
const SPACING_FOR_CARD_INSET = RFPercentage(2);


export default CarouselItem = ({ CarouselData, initRegion, setInitRegion, mapRef, mapIndex, mapAnimation }) => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);

  // let mapIndex = 0;
  // let mapAnimation = new Animated.Value(0);

  // useEffect(() => {
  //   mapAnimation.addListener(({ value }) => {
  //     let index = Math.floor(value / CARD_WIDTH + 0.3)
  //     if (index >= CarouselData.length) {
  //       index = CarouselData.length - 1;
  //     }
  //     if (index <= 0) {
  //       index = 0;
  //     }

  //     clearTimeout(regionTimeout);

  //     const regionTimeout = setTimeout(() => {
  //       if (mapIndex !== index) {
  //         mapIndex = index;
  //         const { coordinate } = CarouselData[index];
  //         mapRef.current.animateToRegion({
  //           ...coordinate,
  //           latitudeDelta: 0.04,
  //           longitudeDelta: 0.04,
  //         })
  //       }
  //     }, 10)
  //   })
  // })


  return (
    <View style={{ marginBottom: RFPercentage(4), flexDirection: 'row' }}>
      <Animated.FlatList
        data={CarouselData}
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
            // <View style={styles.sliderContainer} key={index}>
            //   {
            //     index === 0 ? null : <Image source={IconLinks.leftAngle} style={styles.leftRightArrow} />
            //   }
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
                  />
                </View>
              </View>
            </View>
            //   {
            //     index === (CarouselData.length - 1) ? null : <Image source={IconLinks.rightAngle} style={styles.leftRightArrow} />
            //   }
            // </View>
          );
        }}
      // contentInset={{
      //   top: 0,
      //   left: SPACING_FOR_CARD_INSET,
      //   bottom: 0,
      //   right: SPACING_FOR_CARD_INSET,
      // }}
      // contentContainerStyle={{
      //   paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : null,
      // }}
      // snapToOffsets={[...Array(CarouselData.length)].map(
      //   (x, i) => i * (width)
      //   // (x, i) => i * (width / 1.3) + (i - 1) * RFPercentage(4),
      // )}
      // onScroll={e => setSliderPage(e)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sliderContainer: {
    flexDirection: 'row',
    width: width,
    // height: CARD_HEIGHT,
    borderRadius: RFPercentage(2),
    overflow: 'hidden',
    backgroundColor: 'transparent',
    // backgroundColor: COLORS.blue,
    // marginHorizontal: RFPercentage(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: RFPercentage(2),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    marginHorizontal: RFPercentage(2),
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
    // backgroundColor: COLORS.blue,
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
  }
});
