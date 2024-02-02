import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../global/colors'
import InputForm from '../../InputForm'
import SubmitButton from '../../SubmitButton'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { signUpSchema } from '../../../validations/signUpSchema'
import { useRegisterDispatch } from '../../../app/hooks'
import { addBio, addIntersts } from '../../../features/users/registerSlice'

const Bio = ({navigation}: StackRegisterScreenProps) => {
   const [bio,setBio] = useState('')
   const [skip, setSkip] = useState(false)
   const dispatch = useRegisterDispatch()

   useEffect(()=>{
      if(skip){
         navigation.navigate('Pictures')
      }
   },[skip])
   const onSubmit = () => {
      try {
         if(bio != '') {
            dispatch(addBio(bio))
            navigation.navigate('Pictures')
         }
      }
      catch(error: any) {
         
      }
   }
   return (
      <View style={styles.main}>
         <View style={styles.container}>
            <Text style={styles.title}>Cuenta un poco de ti !!</Text>
            <InputForm
               label='Biografia'
               onChange={setBio}
            />
            <SubmitButton title='Siguiente' onPress={onSubmit}/>
            <SubmitButton title='Omitir' onPress={()=>{setSkip(true)}}/>
         </View>
      </View>
   )
}

export default Bio

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