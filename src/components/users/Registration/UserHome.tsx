import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../global/colors'
import InputForm from '../../InputForm'
import SubmitButton from '../../SubmitButton'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { useRegisterDispatch } from '../../../app/hooks'
import { setHome } from '../../../features/users/registerSlice'

const UserHome = ({navigation}: StackRegisterScreenProps) => {
   const [userHome,setUserHome] = useState('')
   const [skip, setSkip] = useState(false)
   const dispatch = useRegisterDispatch()
   useEffect(()=>{
      if(skip){
         navigation.navigate('GenderData')
      }
   },[skip])
   const onSubmit = () => {
      try {
         if(userHome != '') {
            dispatch(setHome(userHome))
            navigation.navigate('GenderData')
         }
      }
      
      catch(error: any) {
         
      }
   }
   return (
      <View style={styles.main}>
         <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>De donde Eres?</Text>
            <InputForm
               label='Cuidad'
               onChange={setUserHome}
            />
            
            <SubmitButton title='Siguiente' onPress={onSubmit}/>
            <SubmitButton title='Omitir' onPress={()=>{setSkip(true)}}/>

         </ScrollView>
      </View>
   )
}

export default UserHome

const styles = StyleSheet.create({
   main: {
      flex: 1,
      padding: 10,
      justifyContent: 'center'
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