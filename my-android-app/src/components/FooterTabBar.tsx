import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../global/colors'
import { Entypo, Ionicons } from '@expo/vector-icons';

const FooterTabBar = ({navigation}: any) => {
   return (
      <View style={styles.container}>
         <View style={styles.buttons}>
            <Pressable onPress={()=>{navigation.navigate('home')}}>
               <Entypo name="home" size={32} color="black" />
            </Pressable>
            <Pressable onPress={()=>{navigation.navigate('profile')}}>
               <Ionicons name="person-circle-outline" size={32} color="black" />
            </Pressable>
         </View>
      </View>
   )
}

export default FooterTabBar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.darkCream,
        height: 50,
        width: "100%",
        shadowOpacity: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: 'black',
        elevation: 4,
        position: 'absolute', 
        left: 0, 
        right: 0, 
        bottom: 0,
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})