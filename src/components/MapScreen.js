import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MapView from 'react-native-maps'
import { COLORS } from '../common/Colors'
import HeaderMapScreen from '../common/Headers/HeaderMapScreen'
import { CommonStyles } from '../common/CommonStyles'

export default MapScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={[styles.container, CommonStyles.verticalPadding]}>
      <HeaderMapScreen />
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ flex: 1 }}
      >
        {/* <Text style={{ zIndex: 1 }}>Hii</Text> */}
        {/* <CaruselItem /> */}

      </MapView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.blue,
  }
})
