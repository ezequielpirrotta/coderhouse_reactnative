import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../global/colors'
import InputForm from '../../InputForm'
import SubmitButton from '../../SubmitButton'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { addPictures } from '../../../features/users/registerSlice'
import { useRegisterDispatch } from '../../../app/hooks'
import ImageSelector from './ImageSelector'

const Pictures = ({navigation}: StackRegisterScreenProps) => {
   const [pictures,setPictures] = useState<string[]>([])
   const [skip, setSkip] = useState(false)
   const dispatch = useRegisterDispatch()
   
   useEffect(()=>{
      if(skip){
         navigation.navigate('Register')
      }
   },[skip])
   const onSubmit = () => {
      try {
         if(pictures.length > 0) {
            dispatch(addPictures(pictures))
            navigation.navigate('Register')
         }
      }
      catch(error: any) {
         
      }
   }
   const onAdd = (images: string[]) => {
      setPictures(images)
   }
   return (
      
      <View style={styles.main}>
         <Text style={styles.title}>Incluye algunas fotos de ti</Text>
         <ImageSelector maxImages={5} onAdd={onAdd}/>   
         <SubmitButton title='Siguiente' onPress={onSubmit}/>
         <SubmitButton title='Omitir' onPress={()=>{setSkip(true)}}/>
      </View>                  
   )
}

export default Pictures

const styles = StyleSheet.create({
   main: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
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