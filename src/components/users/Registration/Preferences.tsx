import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../global/colors'
import InputForm from '../../InputForm'
import SubmitButton from '../../SubmitButton'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { useRegisterDispatch, useRegisterSelector } from '../../../app/hooks'
import { addIntersts } from '../../../features/users/registerSlice'


const Preferences = ({navigation}: StackRegisterScreenProps) => {
   const [interests,setInterests] = useState([])
   const [skip, setSkip] = useState(false)
   const dispatch = useRegisterDispatch()
   useEffect(()=>{
      if(skip){
         navigation.navigate('Ranges')
      }
   },[skip])
   const onSubmit = () => {
      try {
         if(interests.length > 0) {
            dispatch(addIntersts(interests))
         }
         navigation.navigate('Ranges')
         
      }
      catch(error: any) {
         
      }
   }
   
   return (
      <View style={styles.main}>
         <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Que te gusta?</Text>
            <InputForm
               label='Intereses'
               onChange={setInterests}
            />
            <SubmitButton title='Siguiente' onPress={onSubmit}/>
            <SubmitButton title='Omitir' onPress={()=>{setSkip(true)}}/>
         </ScrollView>
      </View>
   )
}

export default Preferences

const styles = StyleSheet.create({
   main: {
      flex: 1,
      padding: 10,
   },
   container: {
      margin: 10,
      padding: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.darkCream,
      gap: 15,
      borderWidth: 3,
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
   slider: {
      width: '90%'
   },
})