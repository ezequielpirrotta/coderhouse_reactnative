import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ButtonParams } from '../data/objectTypes'
import { colors } from '../global/colors'

const SubmitButton = ({title,onPress,titleStyle}: ButtonParams) => {
  return (
    <View style={styles.container} >
      <Pressable style={styles.button} onPress={() => {onPress()}}>
         <Text style={titleStyle?titleStyle:styles.title}>{title}</Text>
      </Pressable>
    </View>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
   container: {
      width: '50%'
   },
   button: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.green,
      borderRadius: 10,
      width: '100%'
   },
   title: {
      padding: 5,
      fontSize: 20,
   }
})