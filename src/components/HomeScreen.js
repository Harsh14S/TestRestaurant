import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CommonStyles } from '../common/CommonStyles'
import { COLORS } from '../common/Colors'
import HeaderHome from '../common/Headers/HeaderHome'
import Button from '../common/CommonComponents/Button'
import { RFPercentage } from 'react-native-responsive-fontsize'

export default HomeScreen = ({ navigation }) => {
  return (
    <View style={[styles.container, CommonStyles.verticalPadding]}>
      <HeaderHome navigation={navigation} />
      <View style={styles.subContainer}>
        <Button title={'Maps'} textStyle={styles.btnTxt} buttonStyle={styles.btnStyle} onPress={() => navigation.navigate('mapScreen')} />
        {/* <Button title={'Carousel Item'} textStyle={styles.btnTxt} buttonStyle={styles.btnStyle} onPress={() => navigation.navigate('carouseItem')} /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.green,
    // paddingHorizontal
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: RFPercentage(1),
    justifyContent: 'center',
  },
  btnStyle: {

  }
})
