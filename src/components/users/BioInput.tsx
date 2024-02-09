import { Dimensions, StyleSheet, Text, TextInput } from 'react-native'
import React, {useState} from 'react'
import { colors } from '../../global/colors'
import {UserData } from '../../data/objectTypes'

const BioInput = ({bio}:UserData) => {
   const [localBio, setBio] = useState(bio?bio:"Sin biografía")
   return (
      <TextInput style={styles.container} onChangeText={(value)=>setBio(value)}>
         <Text numberOfLines={5} ellipsizeMode={'head'}>
            <Text style={styles.bio}>
               {localBio}
            </Text>
         </Text>
      </TextInput>
   )
}

export default BioInput

const windowWidth = Dimensions.get('window').width 
const windowHeight = Dimensions.get('window').width 
const styles = StyleSheet.create({
   container: {
      textAlign: 'justify',
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor: colors.yellow,
      padding: 10,
      margin: 10,
      width: windowWidth/1.2,
      height: 200,
      borderWidth: 3,
      borderRadius: 7,
   },
   bio: {
      textAlign: 'center',
      textAlignVertical: 'top'
   }
})