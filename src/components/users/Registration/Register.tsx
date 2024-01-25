
import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { useCreateUserMutation, useRegisterMutation } from '../../../app/servicies'
import SubmitButton from '../../SubmitButton'
import { useRegisterSelector } from '../../../app/hooks'


const Register = ({navigation}: StackRegisterScreenProps) => {
   
   const [triggerRegister, registerResult] = useRegisterMutation()
   const [triggerCreate] = useCreateUserMutation()
   const registerData = useRegisterSelector((state) => state.register)
   const onSubmit = () => {
      try {
         triggerRegister({
            email: registerData.email,
            password: registerData.password,
         }).then((result1)=>{
            console.log('Resultado de registro: ',result1.error)
            if(registerResult.isSuccess) {
               console.log('Data de registro',registerData)
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
                  console.log('Resultado exitoso: ',result)
               }).catch((error)=>{
                  console.log('Error creando usuario: ',error)
               })
            }
            else { 
               if(registerResult.data.error){
                  console.log('Error: ',registerResult.data?.error.message)
               }
               else {
                  console.log('Error: ',registerResult.data)
               }
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
