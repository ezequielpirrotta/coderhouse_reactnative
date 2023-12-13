import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'
import { Entypo, Ionicons } from '@expo/vector-icons';

type screenProps = {
   screen: boolean
   setScreen: Function
}

const Footer = ({screen, setScreen}: screenProps) => {
   return (
      <View style={styles.container}>
         <View style={styles.buttons}>
            <Pressable key={'home'} onPress={()=>setScreen(true)}>
               <Entypo name="home" size={32} color="black" />
            </Pressable>
            <Pressable key={'profile'} onPress={()=>setScreen(false)}>
               <Ionicons name="person-circle-outline" size={32} color="black" />
            </Pressable>
         </View>
      </View>
   )
}

export default Footer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.darkCream,
        width: "100%",
        shadowOpacity: 5,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
        shadowColor: 'black'
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})