import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigator from './TabNavigator'
import AuthNavigator from './AuthNavigator'
import { useAppSelector } from '../app/hooks'

const MainNavigator = () => {
   const token = useAppSelector(state => state.auth.token)
   return (
      <NavigationContainer>
         {
            token ? <TabNavigator/> : <AuthNavigator/>
         }
      </NavigationContainer> 
   )
}
export default MainNavigator
const styles = StyleSheet.create({})