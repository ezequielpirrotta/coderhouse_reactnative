
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackRegisterScreenProps, StackScreenProps } from '../../../data/navigationTypes'

import { useCreateUserMutation, useGetUserQuery, useRegisterMutation } from '../../../app/servicies'

import SubmitButton from '../../SubmitButton'
import { useRegisterSelector } from '../../../app/hooks'


const Register = ({navigation}: StackRegisterScreenProps) => {
   
   const [triggerRegister, result] = useRegisterMutation()
   const [triggerCreate] = useCreateUserMutation()
   const registerData = useRegisterSelector((state) => state.register)
   const onSubmit = () => {
      try {
         triggerRegister({
            email: registerData.email,
            password: registerData.password,
         }).then(()=>{
            if(result.isSuccess) {
               console.log(registerData)
               triggerCreate({
                  name: registerData.name, 
                  pictures: registerData.pictures,
                  age: registerData.age,
                  home: registerData.home,
                  gender: registerData.gender,
                  sex: registerData.sex,
                  bio: registerData.bio,
                  likes: [],
                  interests: registerData.interests,
                  matches: [],
                  filter: {}
               }).then((result: any)=>{
                  console.log(result)
               })
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
      <View style={styles.container}>
         <SubmitButton title='Terminar' onPress={onSubmit}/>
         <Text>Listo!</Text>
      </View>
   )
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
})

export default Register
