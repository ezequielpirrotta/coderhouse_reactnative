import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Location } from '../data/objectTypes'
import { googleAPI } from '../firebase/googleApi'
import MapView, { Marker } from 'react-native-maps'

const MapPreview = (location: Location) => {
  /*const mapPreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}
  &zoom=13
  &size=700x300
  &maptype=roadmap
  &markers=color:red%7Clabel:S%7C${location.latitude},${location.longitude}&key=${googleAPI.mapStatic}`*/
  return (
    <View style={styles.imageContainer}>
      {
        location.latitude?
          <MapView style={styles.map} 
            initialRegion={{
              latitude: Number(location.latitude),
              longitude: Number(location.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            zoomControlEnabled={true}
            rotateEnabled={true}
          >
            <Marker coordinate={{latitude: Number(location.latitude), longitude: Number(location.longitude)}} title={'Tu ubicacion'}/>
          </MapView>
          :
          <Image style={styles.image} source={require('../../assets/images/simple-map-vector-6819281.jpg')}/>
      }
    </View>
  )
}

export default MapPreview

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 3,
    borderRadius: 3
  },
  image: {
    width: 300,
    height: 300
  },
  map: {
    width: 300,
    height: 300
  }
})