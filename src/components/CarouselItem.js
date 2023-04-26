import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize';
import Carousel from 'react-native-snap-carousel';
import { CommonStyles } from '../common/CommonStyles';
import { COLORS } from '../common/Colors';
import { ImageLinks } from '../common/ImageLinks';
import { IconLinks } from '../common/IconLinks';
import IconButton from '../common/CommonComponents/IconButton';

export default CarouselItem = () => {
  const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt ",
      imgUrl: ImageLinks.Restaurant1,
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl  ",
      imgUrl: ImageLinks.Restaurant2,
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum",
      imgUrl: ImageLinks.Restaurant3,
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl",
      imgUrl: ImageLinks.Restaurant4,
    },
    {
      title: "Lorem Ipsum",
      body: "Nullam quis ante. Etiam ",
      imgUrl: ImageLinks.Restaurant5,
    },
  ];

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.sliderContainer} key={index}>
        <Image source={item.imgUrl} style={styles.restaurantImages} />
        <View style={styles.sliderDetails}>
          <View style={styles.sliderDetailsLeft}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.bodyTxt}>{item.body}</Text>
          </View>
          <View style={styles.sliderDetailsRight}>
            <IconButton imgSrc={IconLinks.direction} imgStyle={styles.iconImage} buttonStyle={styles.btnStyle} />
            {/* <Image source={IconLinks.direction} style={styles.lo} /> */}
          </View>

        </View>
      </View>
    );
  }

  return (
    <ImageBackground style={[styles.container, CommonStyles.verticalPadding]} source={ImageLinks.SunsetVertical}>
      <View style={{ marginBottom: RFPercentage(4) }}>

        <Carousel
          ref={null}
          data={data}
          renderItem={_renderItem}
          sliderWidth={Dimensions.get('screen').width}
          itemWidth={Dimensions.get('screen').width / 1.2}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sliderContainer: {
    width: '100%',
    borderRadius: RFPercentage(2),
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    paddingBottom: RFPercentage(3),
  },
  title: {
    fontWeight: '700',
    fontSize: RFPercentage(3),
  },
  bodyTxt: {
    fontWeight: '500',
    fontSize: RFPercentage(2.5),
    color: COLORS.black,
  },
  restaurantImages: {
    height: RFPercentage(25),
    width: '100%',
  },
  sliderDetails: {
    flexDirection: 'row',
    padding: RFPercentage(2)
  },
  sliderDetailsLeft: {
    flex: 1,
  },
  sliderDetailsRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: COLORS.darkorange,
    borderRadius: RFPercentage(1),
    paddingVertical: RFPercentage(1),
    marginLeft: RFPercentage(1)
  },
  iconImage: {
    tintColor: COLORS.white,
  }
})
