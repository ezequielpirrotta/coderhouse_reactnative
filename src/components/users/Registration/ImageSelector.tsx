import { useCallback, useState } from "react"
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../../../global/colors"
import SubmitButton from "../../SubmitButton"
import * as ImagePicker from 'expo-image-picker'

type ImageSelectorType = {
   onAdd: (image: string) => void;
   maxImages?: number
}


const ImageSelector = ({maxImages,onAdd}: ImageSelectorType) => {
   const [images, setImages] = useState<string[]>([]);
   const imagePicker = ImagePicker.launchImageLibraryAsync;
   const cameraPicker = ImagePicker.launchCameraAsync;

   const verifyCameraPermissions = async () => {
      const granted = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      return false;
    }
    return true;
   }
   const pickImage = useCallback(async () => {
      const isCameraOk = await verifyCameraPermissions();
      if (isCameraOk) {
         let result = await imagePicker({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [10, 16],
         base64: true,
         quality: 1,
         });
         if (!result.canceled && (maxImages ? images.length < maxImages : true)) {
         setImages([...images, `data:image/jpeg;base64,${result.assets[0].base64}`]);
         }
      }
   }, [imagePicker, images, maxImages]);

   const takeImage = useCallback(async () => {
      const isCameraOk = await verifyCameraPermissions();
      if (isCameraOk) {
        let result = await cameraPicker({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [10, 16],
          base64: true,
          quality: 0.2,
        });
        if (!result.canceled) {
          setImages([...images, `data:image/jpeg;base64,${result.assets[0].base64}`]);
        }
      }
   }, [cameraPicker, images]);

   const confirmImage = () => {
      onAdd(images[images.length - 1]);
   }

   const removeImage = (index: number) => {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
   };

   return (
      <View style={styles.container}>
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
         {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
               <Image source={{ uri: image }} style={styles.selectedImage} />
               <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
               <Text style={styles.removeButtonText}>X</Text>
               </TouchableOpacity>
            </View>
         ))}
         </ScrollView>
            <Text>Última foto tomada</Text>
            {images.length > 0 ? (
            <ImagePickerContainer image={images[images.length - 1]} onPickImage={pickImage} onTakeImage={takeImage} onConfirm={confirmImage} />
            ) : (
            <NoImageContainer onTakeImage={takeImage} onPickImage={pickImage} />
         )}
      </View>
   )
}
const ImagePickerContainer = ({ image, onPickImage, onTakeImage, onConfirm }: any) => {
   return (
     <View>
       <Image source={{ uri: image }} style={styles.image} />
       <SubmitButton title="Tomar otra foto" onPress={onTakeImage} />
       <SubmitButton title="Confirmar" onPress={onConfirm} />
     </View>
   );
 };
 
 const NoImageContainer = ({ onTakeImage, onPickImage }: any) => {
   return (
     <View style={styles.noPhotoContainer}>
       <Text>No hay foto que mostrar</Text>
       <SubmitButton title="Tomar Foto" onPress={onTakeImage} />
       <SubmitButton title="Selecciona una Foto" onPress={onPickImage} />
     </View>
   );
 };
export default ImageSelector

const styles = StyleSheet.create({
   main: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.darkCream,
      paddingHorizontal: 20,
    },
    imageContainer: {
      position: 'relative',
      width: 200,
      height: 200,
      marginRight: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      overflow: 'hidden',
      borderRadius: 10,
    },
    selectedImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 10,
    },
    removeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    removeButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 10,
    },
    noPhotoContainer: {
      width: 200,
      height: 200,
      borderWidth: 2,
      borderColor: 'black',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    title: {
      fontSize: 25,
      margin: 10,
      textAlign: 'center',
    },
    subLink: {
      color: 'blue',
      fontSize: 14,
      textDecorationLine: 'underline',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
})