import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../components/users/Login';
import Register from '../components/users/Register';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import { RootStackParamList } from '../data/navigationTypes';


const RootStack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
   return (
      <RootStack.Navigator
         initialRouteName='Login'
         screenOptions={
            ({route}) => {
               return {
                  header: ()=> <Header title='Bienvenido de nuevo!!'/>
               }
            }
         }   
      >
         <RootStack.Screen name='Login' component={Login} />
         <RootStack.Screen name='Register' component={Register} />
      </RootStack.Navigator>
   )
}
export default AuthNavigator
const styles = StyleSheet.create({})