import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../components/HomeScreen';
import MapScreen from '../components/MapScreen';
import CarouselItem from '../components/CarouselItem';

const Stack = createNativeStackNavigator();

export default mainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='home' component={HomeScreen} />
      <Stack.Screen name='mapScreen' component={MapScreen} />
      <Stack.Screen name='carouseItem' component={CarouselItem} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})
