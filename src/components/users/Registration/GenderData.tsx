import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../global/colors'
import SubmitButton from '../../SubmitButton'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { useRegisterDispatch } from '../../../app/hooks'
import { setGender } from '../../../features/users/registerSlice'
import GenderSelector from '../GenderSelector'

const GenderData = ({navigation}: StackRegisterScreenProps) => {
   const [userGender,setUserGender] = useState('')
   const [skip, setSkip] = useState(false)
   const dispatch = useRegisterDispatch()

   useEffect(()=>{
      if(skip){
         navigation.navigate('Preferences')
      }
   },[skip])
   const onSubmit = () => {
      try {
         if(userGender != '') {
            dispatch(setGender(userGender))
            navigation.navigate('Preferences')
         }
      }
      catch(error: any) {
         console.log('Error: ',error)
      }
   }
   return (
      <View style={styles.main}>
         <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Cual es tu Identidad Sexual?</Text>
            <GenderSelector onChange={setUserGender}/>
            <SubmitButton title='Siguiente' onPress={onSubmit}/>
            <SubmitButton title='Omitir' onPress={()=>{setSkip(true)}}/>
         </ScrollView>
      </View>
   )
}

export default GenderData

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
   }
})