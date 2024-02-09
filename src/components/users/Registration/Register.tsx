
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackRegisterScreenProps, StackScreenProps } from '../../../data/navigationTypes'
import { useCreateUserMutation, useRegisterMutation } from '../../../app/servicies'
import SubmitButton from '../../SubmitButton'
import { useRegisterSelector } from '../../../app/hooks'
import { useNavigation } from '@react-navigation/native'
import {UserData } from '../../../data/objectTypes'


const Register = ({navigation}: StackRegisterScreenProps) => {
   const [registerSucces, setRegisterSuccess] = useState(false)
   const [triggerRegister, registerResult] = useRegisterMutation()
   const [triggerCreate, createResult] = useCreateUserMutation()
   const registerData = useRegisterSelector((state) => state.register)
   const authNavigation = useNavigation<StackScreenProps['navigation']>()
   useEffect(()=>{
      if(registerResult.isSuccess) {
         const user: UserData = {
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
            filters: registerData.filters
         }
         triggerCreate({localId: registerResult.data.localId, data: user})
         .then((result: any)=>{
            authNavigation.navigate('Login')
         }).catch((error)=>{
            console.log('Error creando usuario: ',error)
         })
      }
      else {
         if(registerResult.isError){
            console.log('Error: ',registerResult.error?.data?.error)
            if(!registerData.email){
               navigation.navigate('MainData')
            }
         }
         else {
            console.log('Error: ',registerResult)
         }
      }
      
   },[registerResult])
   const onSubmit = () => {
      try {
         triggerRegister({
            email: registerData.email,
            password: registerData.password,
         })
      }
      catch(error: any) {
         Alert.alert("Error", error);
      }
   }
   return (
      <View style={styles.container}>
         {
            registerSucces?
               <Text>Listo!</Text>
               :
               <SubmitButton title='Terminar' onPress={onSubmit}/>
         }
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
