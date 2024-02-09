import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackScreenProps } from '../data/navigationTypes'
import { colors } from '../global/colors'
import { useCreateUserMutation, useGetUserQuery, useRegisterMutation } from '../app/servicies'
import {UserData } from '../data/objectTypes'
import { signUpSchema } from '../validations/signUpSchema'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header'
import { RootStackRegisterParamList } from '../data/navigationTypes';
import MainData from '../components/users/Registration/MainData';
import GenderData from '../components/users/Registration/GenderData'
import UserHome from '../components/users/Registration/UserHome'
import Register from '../components/users/Registration/Register'
import { Provider } from 'react-redux'
import { registerStore } from '../app/Register/registerStore'
import Preferences from '../components/users/Registration/Preferences'
import Pictures from '../components/users/Registration/Pictures'
import Bio from '../components/users/Registration/Bio'
import Ranges from '../components/users/Registration/Ranges'

const RootStack = createNativeStackNavigator<RootStackRegisterParamList>();

const RegisterNavigator = ({navigation}: StackScreenProps) => {
   
   return (
      <Provider store={registerStore}>
         <RootStack.Navigator initialRouteName='MainData'
            screenOptions={{
               headerShown:false
            }}
         >
            <RootStack.Screen name='MainData'  component={MainData} options={{title:'Informacion basica'}}/>
            <RootStack.Screen name='UserHome' component={UserHome} />
            <RootStack.Screen name='GenderData' component={GenderData} />
            <RootStack.Screen name='Preferences' component={Preferences} />
            <RootStack.Screen name='Ranges' component={Ranges} />
            <RootStack.Screen name='Bio' component={Bio} />
            <RootStack.Screen name='Pictures' component={Pictures} />
            <RootStack.Screen name='Register' component={Register} />
         </RootStack.Navigator>
         
         
      </Provider>
   )
}
const styles = StyleSheet.create({
   container: {
      width: '90%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.darkCream,
      gap: 15,
      paddingVertical: 20,
      borderRadius: 10
   },
   title: {
      fontSize: 25,
      margin: 10
   },
   subLink: {
      color: 'blue',
      fontSize: 14,
      /*fontFamily: 'Josefin'*/
   }
})
export default RegisterNavigator;