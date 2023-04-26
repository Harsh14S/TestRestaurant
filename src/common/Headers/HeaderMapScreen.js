import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../Colors'
import { RFPercentage } from 'react-native-responsive-fontsize'
import IconButton from '../CommonComponents/IconButton'
import { IconLinks } from '../IconLinks'

export default HeaderMapScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <IconButton imgSrc={IconLinks.leftArrow} />
      <Text style={styles.headerTxt}>Maps Explorer</Text>
      <IconButton imgSrc={IconLinks.gps} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.grey,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: RFPercentage(1),
    marginBottom: RFPercentage(1),
    flexDirection: 'row'
  },
  headerTxt: {
    fontSize: RFPercentage(3.5),
    color: COLORS.darkorange,
    fontWeight: '700',
  },
})
