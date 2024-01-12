import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputForm from './InputForm'
import SubmitButton from '../SubmitButton'
import { StackScreenProps } from '../../data/navigationTypes'
import { colors } from '../../global/colors'
import { useCreateUserMutation, useGetUserQuery, useRegisterMutation } from '../../app/servicies'
import { User } from '../../data/objectTypes'
import { signUpSchema } from '../../validations/signUpSchema'

const Register = ({navigation}: StackScreenProps) => {
   const [name,setName] = useState('')
   const [lastName,setLastName] = useState('')
   const [email,setEmail] = useState('')
   const [errorEmail,setErrorEmail] = useState('')
   const [password,setPassword] = useState('')
   const [errorPassword, setErrorPassword] = useState('')
   const [confirmPassword,setConfirmPassword] = useState('')
   const [errorConfirmPassword, setErrorConfirmPassword] = useState('')
   const [age, setAge] = useState(18)
   const [sex, setSex] = useState('male')
   const [triggerRegister, result] = useRegisterMutation()
   const [triggerCreate] = useCreateUserMutation()

   //console.log(result.error?.data?.error.message)
   useEffect(()=>{
      setErrorEmail('')
      setErrorPassword('')
      setErrorConfirmPassword('')
   },[email,password,confirmPassword])
  
   const onSubmit = () => {
      try {
         const validation = signUpSchema.validateSync({email,password,confirmPassword})
         triggerRegister({
            email,
            password,
         }).then(()=>{
            if(result.isSuccess) {
               const newUser: User = {
                  name: name+' '+lastName,
                  id: result.data.userId,
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
         console.log('Error:')
         console.log(error.path)
         switch (error.path) {
            case 'email':
               setErrorEmail(error.message)
               break
            case 'password':
               setErrorPassword(error.message)
               break
            case 'confirmPassword':
               setErrorConfirmPassword(error.message)
               break
         }
      }
   }

   return (
      <View style={styles.main}>
         <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <InputForm
               label='Nombre'
               onChange={setName}
            />
            <InputForm
               label='Apellido'
               onChange={setLastName}
            />
            <InputForm
               label='Email'
               onChange={setEmail}
               error={errorEmail}
            />
            <InputForm
               label='Edad'
               onChange={setAge}
            />
            <InputForm
               label='Contraseña'
               onChange={setPassword}
               isSecure={true}
               error={errorPassword}
            />
            <InputForm
               label='Confirmar contraseña'
               onChange={setConfirmPassword}
               isSecure={true}
               error={errorConfirmPassword}

            />
            <SubmitButton title='Registrarse' onPress={onSubmit}/>
            <Text>Ya ienes una cuenta?</Text>
            <Pressable onPress={()=>{navigation.navigate('Login')}}>
               <Text style={styles.subLink}>Inicia Sesion!</Text>
            </Pressable>
         </View>
      </View>
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
export default Register;