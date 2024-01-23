import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../global/colors'
import InputForm from '../InputForm'
import SubmitButton from '../../SubmitButton'
import { StackRegisterScreenProps } from '../../../data/navigationTypes'
import { addPictures } from '../../../features/users/registerSlice'
import { useRegisterDispatch } from '../../../app/hooks'
import ImageSelector from './ImageSelector'

const Pictures = ({navigation}: StackRegisterScreenProps) => {
   const [pictures,setPictures] = useState<string[]>([])
   const [skip, setSkip] = useState(false)
   const [launchedPhoto, setLaunchPhoto] = useState(false)
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
   const handleAddImage = () => {
      setLaunchPhoto(true)
   }
   const onAdd = (image: string) => {
      pictures.push(image)
   }
   return (
      <>
         {
            launchedPhoto?
               <ImageSelector setShow={setLaunchPhoto} onAdd={onAdd}/>
               :
               <View style={styles.main}>
                  <View style={styles.container}>
                     <Text style={styles.title}>Incluye algunas fotos de ti</Text>
                     <FlatList
                        data={pictures}
                        keyExtractor={(item,index) => index.toString()}
                        contentContainerStyle={styles.images}
                        renderItem={ ({item}) =>
                           item!=''?
                              <View style={styles.imageContainer}>
                                 <Image source={{ uri: item }} style={styles.image} />
                              </View>
                              :
                              <>
                                 <Pressable style={styles.addImageButton} onPress={handleAddImage}>
                                    <Text style={styles.addImageText}>+</Text>
                                 </Pressable>
                              </>
                        }
                     />
                     <SubmitButton title='Añadir Imagen' onPress={handleAddImage}/>   
                     <SubmitButton title='Siguiente' onPress={onSubmit}/>
                     <SubmitButton title='Omitir' onPress={()=>{setSkip(true)}}/>
                     </View>
                  </View>                  
         }
      </>
   )
}

export default Pictures

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
   images: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.darkCream,
      gap: 20,
   },
   image: {
      width: 200,
      height: 200
   },
   imageContainer: {
      width: 80,
      height: 80,
      borderWidth: 2,
      borderColor: 'black',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
   },
   noPhotoContainer:{
      width: 200,
      height: 200,
      borderWidth: 2,
      borderColor: 'black',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
   },
   addImageButton: {
      width: 80,
      height: 80,
      borderWidth: 2,
      borderColor: 'black',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
   },
   addImageText: {
      fontSize: 32,
      fontWeight: 'bold',
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