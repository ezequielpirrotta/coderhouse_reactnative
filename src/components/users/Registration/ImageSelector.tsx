import { useCallback, useEffect, useState } from "react"
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../../../global/colors"
import SubmitButton from "../../SubmitButton"
import * as ImagePicker from 'expo-image-picker'
import { ImageSelectorType } from "../../../data/objectTypes"

const ImageSelector = ({currentImages,maxImages,onAdd}: ImageSelectorType) => {
  
  const [images, setImages] = useState<string[]>(currentImages?currentImages:[]);
  const imagePicker = ImagePicker.launchImageLibraryAsync;
  const cameraPicker = ImagePicker.launchCameraAsync;

  useEffect(()=> {
    
  },[images])
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
      aspect: [16, 16],
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
        aspect: [16, 16],
        base64: true,
        quality: 0.2,
      });
      if (!result.canceled) {
        setImages([...images, `data:image/jpeg;base64,${result.assets[0].base64}`]);
      }
    }
  }, [cameraPicker, images]);

  const confirmImage = async() => {
    console.log('Antes de confirm',images)
    await onAdd(images);
  }

  const removeImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <View  style={styles.container}>
      {
        images.length > 0?
        <>
          <Text style={styles.imageListTitle}>Imagenes</Text>
          <FlatList 
            horizontal
            data={images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index})=> (
              <View  key={index} style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.selectedImage} />
                <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                  <Text style={styles.removeButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
        /*{images.map((image, index) => (
            <View  key={index} style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.selectedImage} />
              <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
        ))}*/
        
        :null
      }
      <View style={styles.container}>
        <Text style={styles.imageListTitle}>Última imagen</Text>
        {images.length > 0 ? (
          <ImagePickerContainer image={images[images.length - 1]} onPickImage={pickImage} onTakeImage={takeImage} onConfirm={confirmImage} />
          ) : (
          <NoImageContainer onTakeImage={takeImage} onPickImage={pickImage} onConfirm={confirmImage} />
        )}
      </View>
    </View>
  )
}
const ImagePickerContainer = ({ image, onPickImage, onTakeImage, onConfirm }: any) => {
  return (
    <View style={styles.photoContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      <ScrollView contentContainerStyle={styles.buttonsContainer}>
        <SubmitButton title="Tomar otra foto" onPress={onTakeImage} titleStyle={styles.button}/>
        <SubmitButton title="Selecciona otra Foto" onPress={onPickImage} titleStyle={styles.button}/>
        <SubmitButton title="Confirmar" onPress={onConfirm} titleStyle={styles.button}/>
      </ScrollView>
    </View>
  );
};  
 
 const NoImageContainer = ({ onTakeImage, onPickImage, onConfirm}: any) => {
   return (
     <View style={styles.noPhotoContainer}>
       <Text style={styles.noImageText}>No hay foto que mostrar</Text>
       <ScrollView contentContainerStyle={styles.noPhotoButtons}>
        <SubmitButton title="Tomar Foto" onPress={onTakeImage} titleStyle={styles.button} />
        <SubmitButton title="Selecciona una Foto" onPress={onPickImage} titleStyle={styles.button}/>
        <SubmitButton title="Confirmar" onPress={onConfirm} titleStyle={styles.button}/>
       </ScrollView>
     </View>
   );
 };
export default ImageSelector

const styles = StyleSheet.create({
   
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkCream,
    paddingTop: 20,
    paddingBottom: 20
  },
  imageListTitle: {
    fontSize: 20
  },
  imageContainer: {
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 3,
    margin: 10
  },
  noImageText: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
    borderWidth: 3,
    width: 200,
    height: 50,
    margin: 10,
  },
  noPhotoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  noPhotoButtons: {
    /*flexDirection: 'column',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,*/
    gap: 3,
    flexWrap: 'wrap',
    flexDirection: 'row', // Change to row
    justifyContent: 'space-around', // Add this line
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    padding: 5,
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
    /*flexWrap: 'wrap',
    gap: 3,
    
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    */
    gap: 3,
    flexWrap: 'wrap',
    flexDirection: 'row', // Change to row
    justifyContent: 'space-around', // Add this line
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  buttonTextSmall: {
    fontSize: 10,
  }
})