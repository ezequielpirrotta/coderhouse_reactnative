import { useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { colors } from "../../../global/colors"
import SubmitButton from "../../SubmitButton"
import * as ImagePicker from 'expo-image-picker'

type ImageSelectorType = {
   setShow: Function
   onAdd: Function
}

const ImageSelector = ({setShow,onAdd}: ImageSelectorType) => {
   const [image,setImage] = useState<string|null>(null)

   const verifyCameraPermissions = async () => {
      const granted = await ImagePicker.requestCameraPermissionsAsync()
      if(!granted){
         return false
      }
      return true
   }

   const pickImage = async () => {
      const isCameraOk = await verifyCameraPermissions()
      if(isCameraOk){
         let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect: [9,16],
            base64: true,
            quality: 0.2
         })
         if(!result.canceled) {
            setImage(`data:image/jpeg;base64,${result.assets[0].base64}`)
         }
      }
   }
   const confirmImage = () => {
      onAdd(image)
      setShow(false)
   }
   return (
      <View style={styles.container}>
         {
            image?
            <>
               <Image source={{uri: image}} style={styles.image}/>
               <SubmitButton title="Tomar otra foto" onPress={pickImage}/>
               <SubmitButton title="Confirmar" onPress={confirmImage}/>
            </>
            :
            <>
               <View style={styles.noPhotoContainer}>
                  <Text>No hay foto que mostrar</Text>
               </View>
               <SubmitButton title="Agregar Foto" onPress={pickImage}/>
            </>
         }
      </View>
   )
}
export default ImageSelector

const styles = StyleSheet.create({
   main: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
   },
   container: {
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
   noPhotoContainer:{
      width: 200,
      height: 200,
      borderWidth: 2,
      borderColor: 'black',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
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