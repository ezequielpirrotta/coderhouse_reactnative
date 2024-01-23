import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../global/colors'
import InputForm from '../InputForm'
import SubmitButton from '../../SubmitButton'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { signUpSchema } from '../../../validations/signUpSchema'
import { useRegisterDispatch } from '../../../app/hooks'
import { addIntersts } from '../../../features/users/registerSlice'

const Interests = ({navigation}: StackRegisterScreenProps) => {
   const [interests,setInterests] = useState([])
   const [skip, setSkip] = useState(false)
   const dispatch = useRegisterDispatch()

   useEffect(()=>{
      if(skip){
         navigation.navigate('Bio')
      }
   },[skip])
   const onSubmit = () => {
      try {
         if(interests.length > 0) {
            dispatch(addIntersts(interests))
            navigation.navigate('Bio')
         }
      }
      catch(error: any) {
         
      }
   }
   return (
      <View style={styles.main}>
         <View style={styles.container}>
            <Text style={styles.title}>Que te gusta?</Text>
            <InputForm
               label='Intereses'
               onChange={setInterests}
            />
            <SubmitButton title='Siguiente' onPress={onSubmit}/>
            <SubmitButton title='Omitir' onPress={()=>{setSkip(true)}}/>
         </View>
      </View>
   )
}

export default Interests

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