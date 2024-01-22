import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackScreenProps } from '../data/navigationTypes'
import { colors } from '../global/colors'
import { useCreateUserMutation, useGetUserQuery, useRegisterMutation } from '../app/servicies'
import { User } from '../data/objectTypes'
import { signUpSchema } from '../validations/signUpSchema'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header'
import { RootStackRegisterParamList } from '../data/navigationTypes';
import MainData from '../components/users/Registration/MainData';
import GenderData from '../components/users/Registration/GenderData'

const RootStack = createNativeStackNavigator<RootStackRegisterParamList>();

const RegisterNavigator = ({navigation}: StackScreenProps) => {
   
   const [triggerRegister, result] = useRegisterMutation()
   const [triggerCreate] = useCreateUserMutation()

   
   
  
   const onSubmit = () => {
      try {
         triggerRegister({
            email,
            password,
         }).then(()=>{
            if(result.isSuccess) {
               const newUser: User = {
                  name: name+' '+lastName,
                  username: 
                  pictures: [],
                  age: age,
                  home: '',
                  sex: sex,
                  likes: [],
                  interests: [],
                  matches: [],
                  filter: {}
               }
               triggerCreate(newUser)
            }
            else { 
               console.log(result.error)
            }
         })
      }
      catch(error: any) {
         
      }
   }

   return (
      <RootStack.Navigator initialRouteName='MainData'>
         <RootStack.Screen name='MainData' component={MainData} />
         <RootStack.Screen name='UserHome' component={MainData} />
         <RootStack.Screen name='GenderData' component={GenderData} />
         <RootStack.Screen name='Interests' component={GenderData} />
         <RootStack.Screen name='Pictures' component={GenderData} />
      </RootStack.Navigator>
      
   )
}
const styles = StyleSheet.create({
   main: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
   },
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