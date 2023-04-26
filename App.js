import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/components/HomeScreen'
import { COLORS } from './src/common/Colors'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './src/navigation/mainNavigator'

export default App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.green,
  }
})
