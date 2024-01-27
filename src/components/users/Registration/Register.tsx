
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { StackRegisterScreenProps, StackScreenProps } from '../../../data/navigationTypes'
import { useCreateUserMutation, useRegisterMutation } from '../../../app/servicies'
import SubmitButton from '../../SubmitButton'
import { useRegisterSelector } from '../../../app/hooks'
import { useNavigation } from '@react-navigation/native'


const Register = () => {
   
   const [triggerRegister, registerResult] = useRegisterMutation()
   const [triggerCreate, createResult] = useCreateUserMutation()
   const registerData = useRegisterSelector((state) => state.register)
   const navigation = useNavigation<StackScreenProps['navigation']>()
   useEffect(()=>{
      console.log('Resultado de registro: ',registerResult)
      if(registerResult.isSuccess) {
         const user = {
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
         }
         
         triggerCreate({localId: registerResult.data.localId, data: user})
         .then((result: any)=>{
            console.log('Resultado exitoso: ',result)
            navigation.navigate('Login')
         }).catch((error)=>{
            console.log('Error creando usuario: ',error)
         })
      }
      else {
         if(registerResult.data?.error){
            console.log('Error: ',registerResult.data.error.message)
         }
         else {
            console.log('Error: ',registerResult.data)
         }
      }
      
   },[registerResult])
   const onSubmit = () => {
      try {
         console.log('Data de registro',registerData)
         triggerRegister({
            email: registerData.email,
            password: registerData.password,
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
