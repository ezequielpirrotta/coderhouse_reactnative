import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputForm from './InputForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUser } from '../../features/users/authSlice';
import SubmitButton from '../SubmitButton';
import { colors } from '../../global/colors';
import { StackScreenProps } from '../../data/navigationTypes';
import { useGetUserQuery, useLoginMutation } from '../../app/servicies';

const Login = ({navigation}: StackScreenProps) => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [userId, setUserId] = useState('')
   const {data,isLoading,error} = useGetUserQuery(userId)
   const [triggerLogin, result] = useLoginMutation()

   const onSubmit = () => {
      triggerLogin({
         username,
         password
      }).then(() => {
         if (result.data?.login.errors) {
            console.log(data)
         }
      })
   }
   
   return (
      <View style={styles.main}>
         <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <InputForm
               label='Email'
               onChange={setUsername}
               error={''}
            />
            <InputForm
               label='Contraseña'
               onChange={setPassword}
               isSecure={true}
            />
            <SubmitButton title='Iniciar Sesion' onPress={onSubmit}/>
            <Text>Aun no tienes una cuenta?</Text>
            <Pressable onPress={()=>{navigation.navigate('Register')}}>
               <Text style={styles.subLink}>Creala!</Text>
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

   }
})
export default Login