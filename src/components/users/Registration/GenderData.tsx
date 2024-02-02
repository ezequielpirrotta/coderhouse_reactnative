import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../global/colors'
import InputForm from '../../InputForm'
import SubmitButton from '../../SubmitButton'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { signUpSchema } from '../../../validations/signUpSchema'
import InputSelectForm from '../../InputSelectForm'
import { useGetGendersQuery } from '../../../app/servicies'
import { useRegisterDispatch } from '../../../app/hooks'
import { setGender } from '../../../features/users/registerSlice'

const GenderData = ({navigation}: StackRegisterScreenProps) => {
   const [userGender,setUserGender] = useState('')
   const [skip, setSkip] = useState(false)
   const {data,error,isLoading,isError} = useGetGendersQuery()
   const dispatch = useRegisterDispatch()

   useEffect(()=>{
      console.log(data)
      if(isError){
         console.log("Error al conseguir los generos: ",error)
      }
      if(skip){
         navigation.navigate('Interests')
      }
   },[error,skip])
   const onSubmit = () => {
      try {
         if(userGender != '') {
            dispatch(setGender(userGender))
            navigation.navigate('Interests')
         }
      }
      catch(error: any) {
         console.log('Error: ',error)
      }
   }
   return (
      <View style={styles.main}>
         <View style={styles.container}>
            <Text style={styles.title}>Cual es tu Identidad Sexual?</Text>
            {
               isLoading?
               <>
                  <Text>Cargando generos</Text>
                  <ActivityIndicator size={'large'}/>
               </>
               :
               <InputSelectForm
                  label='Genero'
                  onChange={setUserGender}
                  options={data.genders}
               />
            }
            <SubmitButton title='Siguiente' onPress={onSubmit}/>
            <SubmitButton title='Omitir' onPress={()=>{setSkip(true)}}/>
         </View>
      </View>
   )
}

export default GenderData

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