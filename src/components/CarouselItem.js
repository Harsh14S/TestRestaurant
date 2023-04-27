import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';
import Carousel from 'react-native-snap-carousel';
import { CommonStyles } from '../common/CommonStyles';
import { COLORS } from '../common/Colors';
import { ImageLinks } from '../common/ImageLinks';
import { IconLinks } from '../common/IconLinks';
import IconButton from '../common/CommonComponents/IconButton';

const { width, height } = Dimensions.get('screen');

export default CarouselItem = ({ CarouselData }) => {

  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);



  // const setSliderPage = ({ nativeEvent }) => {
  //   const { currentPage } = sliderState;
  //   const { x } = nativeEvent.contentOffset;
  //   const indexOfNextScreen = Math.floor(x / Math.floor(width));
  //   if (indexOfNextScreen !== currentPage) {
  //     setSliderState({
  //       ...sliderState,
  //       currentPage: indexOfNextScreen,
  //     });
  //   }
  //   // console.log(indexOfNextScreen)
  // };

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.sliderContainer} key={index}>
        <Image source={item.imgUrl} style={styles.restaurantImages} />
        <View style={styles.sliderDetails}>
          <View style={styles.sliderDetailsLeft}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.bodyTxt}>{item.description}</Text>
          </View>
          <View style={styles.sliderDetailsRight}>
            <IconButton imgSrc={IconLinks.direction} imgStyle={styles.iconImage} buttonStyle={styles.btnStyle} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ marginBottom: RFPercentage(4), flexDirection: 'row' }}>
      <FlatList
        data={CarouselData}
        renderItem={_renderItem}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={[...Array(CarouselData.length)].map(
          (x, i) => i * (width / 1.3) + (i - 1) * RFPercentage(4)
        )}
        horizontal
        snapToAlignment='center'
        scrollEventThrottle={16}
        decelerationRate={'fast'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sliderContainer: {
    width: width / 1.3,
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
  }
})
