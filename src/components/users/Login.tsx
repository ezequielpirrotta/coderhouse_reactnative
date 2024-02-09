import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputForm from '../InputForm';
import { useAppDispatch } from '../../app/hooks';
import { setUser } from '../../features/users/authSlice';
import SubmitButton from '../SubmitButton';
import { colors } from '../../global/colors';
import { StackScreenProps } from '../../data/navigationTypes';
import { useGetUserQuery, useLoginMutation } from '../../app/servicies';
import { signInSchema } from '../../validations/signInSchema';
import AwesomeAlert from 'react-native-awesome-alerts';
import { insertSession } from '../../database';

const Login = ({navigation}: StackScreenProps) => {
   const [username, setUsername] = useState('');
   const [errorUsername,setErrorUsername] = useState('')
   const [password, setPassword] = useState('');
   const [errorPassword, setErrorPassword] = useState('');
   const [showAlert, setShowAlert] = useState(false)
   const [textError, setTextError] = useState('')
   const dispatch = useAppDispatch()
   const [triggerLogin, {data,isSuccess,isError,error,isLoading}] = useLoginMutation()
   

   useEffect(()=>{
      try {
         if (isSuccess && !isLoading){
            if(data){
               insertSession({localId: data.localId, email:data.email, token: data.idToken})
                  .then((result)=>{
                     dispatch(setUser({email:data.email, token: data.idToken, localId: data.localId}))
                  })
                  .catch(error => console.log('Error guardando sesión:',error))
            }
         }
         else if(isError){
            setTextError(error?.data?.error.message)
            setShowAlert(true)
         }
      }
      catch(error: any) {
         setTextError(error)
         setShowAlert(true)
      }
   },[isSuccess])
   

   const onSubmit = () => {
      try{
         signInSchema.validateSync({email: username,password})
         triggerLogin({email: username,password})
         .then(()=>{
            setUsername('')
            setPassword('')
         })
         .catch((error) =>{
            console.log('Error:',error)
         })
      }
      catch(error: any) {
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
         {!isLoading?
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
               <Pressable onPress={()=>{navigation.navigate('RegisterNavigator')}}>
                  <Text style={styles.subLink}>Creala!</Text>
               </Pressable>
            </View>
            :
            <ActivityIndicator size="large" color="#0000ff"/>
         }
         
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