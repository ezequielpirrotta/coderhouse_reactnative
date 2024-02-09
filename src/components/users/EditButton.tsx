import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { colors } from '../../global/colors';
import { ButtonParams } from '../../data/objectTypes';

const EditButton = ({onPress}: ButtonParams) => {
  return (
   <View style={styles.editContainer}>
      <Pressable onPress={()=>onPress()} >
         <Feather name="edit" size={32} color="black" style={styles.featherIcon}/>
      </Pressable>
   </View>
  )
}

export default EditButton

const styles = StyleSheet.create({
   featherIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
   },
   editContainer: {
      backgroundColor: colors.red
   },
})