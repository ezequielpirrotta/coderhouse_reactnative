import { useCallback, useState } from "react"
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../global/colors"
import SubmitButton from "./SubmitButton"
import { ImageSelectorType } from "../data/objectTypes"


const ImageDisplay = ({currentImages,maxImages}: ImageSelectorType) => {
   const [images, setImages] = useState<string[]>(currentImages?currentImages:[]);
   
   const removeImage = (index: number) => {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
   };

  return (
    <ScrollView contentContainerStyle={styles.container} >
      {
        images.length > 0?
        <View>
        {images.map((image, index) => (
            <View key={index} style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.selectedImage} />
              <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
        ))}
        </View>
        :null
      }
      
    </ScrollView>
  )
}

export default ImageDisplay

const styles = StyleSheet.create({
   
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkCream,
    paddingHorizontal: 10,
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