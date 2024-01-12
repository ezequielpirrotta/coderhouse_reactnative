import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputForm from './InputForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUser } from '../../features/users/authSlice';
import SubmitButton from '../SubmitButton';
import { colors } from '../../global/colors';
import { StackScreenProps } from '../../data/navigationTypes';
import { useGetUserQuery, useLoginMutation } from '../../app/servicies';
import { signInSchema } from '../../validations/signInSchema';
import AwesomeAlert from 'react-native-awesome-alerts';

const Login = ({navigation}: StackScreenProps) => {
   const [username, setUsername] = useState('');
   const [errorUsername,setErrorUsername] = useState('')
   const [password, setPassword] = useState('');
   const [errorPassword, setErrorPassword] = useState('');
   const [userId, setUserId] = useState('')
   const [showAlert, setShowAlert] = useState(false)
   const [textError, setTextError] = useState('')
   //const {data,isLoading,error} = useGetUserQuery(userId)
   const dispatch = useAppDispatch()
   const [triggerLogin, {data,isSuccess,isError,error}] = useLoginMutation()


   useEffect(()=>{
      setErrorUsername('')
      setErrorPassword('')
   },[username,password])

   const onSubmit = () => {
      try{
         const validation = signInSchema.validateSync({email: username,password})
         triggerLogin({
            email: username,
            password
         }).then(() => {
            if (isSuccess) {
               console.log("RESULTADO: ")
               console.log(data)
               
            }
            else if(error) {
               setTextError(error.data.error.message)
               setShowAlert(true)
            }
         })
      }
      catch(error: any) {
         
         console.log('Error:')
         console.log(error.path)
         switch (error.path) {
            case 'email':
               setErrorUsername(error.message)
               break
            case 'password':
               setErrorPassword(error.message)
               break
         }
         
      }
   }
   
   return (
      <View style={styles.main}>
         <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <InputForm
               label='Nombre de usuario'
               onChange={setUsername}
               error={errorUsername}
            />
            <InputForm
               label='Contraseña'
               onChange={setPassword}
               isSecure={true}
               error={errorPassword}
            />
            <SubmitButton title='Iniciar Sesion' onPress={onSubmit}/>
            <Text>Aun no tienes una cuenta?</Text>
            <Pressable onPress={()=>{navigation.navigate('Register')}}>
               <Text style={styles.subLink}>Creala!</Text>
            </Pressable>
         </View>
         
         <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Error al inciar sesion"
            message={textError}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Vale"
            confirmButtonColor="blue"
            onConfirmPressed={() => {
               setShowAlert(false);
            }}
         />
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
   },
   
})
export default Login