import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../global/colors'
import InputForm from '../InputForm'
import SubmitButton from '../../SubmitButton'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { signUpSchema } from '../../../validations/signUpSchema'

const GenderData = ({navigation}: StackRegisterScreenProps) => {
   const [gender,setGender] = useState('')

   useEffect(()=>{
      
   },[])
   const onSubmit = () => {
      try {
         if(gender != '') {
            navigation.navigate('UserHome')
         }
      }
      catch(error: any) {
         
      }
   }
   return (
      <View style={styles.main}>
         <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <InputForm
               label='Genero'
               onChange={setGender}
            />
            
            <SubmitButton title='Siguiente' onPress={onSubmit}/>
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