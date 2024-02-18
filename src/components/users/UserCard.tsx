import { Dimensions, StyleSheet, Text, View, Image, Button, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Location, User } from '../../data/objectTypes'
import { colors } from '../../global/colors'
import { AntDesign, Entypo } from '@expo/vector-icons';
import HaversineGeolocation from 'haversine-geolocation'

const UserCard = (props:{
   user: User
   mainUserLocation: Location | null
   onLike: CallableFunction
   onPass?: CallableFunction
}) => {
   const {user,onLike,onPass,mainUserLocation} = props
   const [isLiked,setIsLiked] = useState(false)
   const distance = user.data.location && mainUserLocation? HaversineGeolocation.getDistanceBetween(user.data.location, mainUserLocation):null

   const onUserLike = () => {
      setIsLiked(!isLiked)
      if(onLike){
         onLike(user.id)
      }
   }
   return (
      <View style={styles.user}>
         <View style={styles.profilePic}>

         </View>
         {
            user.data.pictures ?
               <Image source={{uri: user.data.pictures[0]}} style={styles.image}/> 
               :
               <Image source={require('../../../assets/images/deafultProfilePic.jpg')} style={styles.image}/>
         }
         <Text style={styles.userText}>{user.data.name}, {user.data.age}</Text>
         <Text style={styles.userText}><Entypo name="location-pin" size={24} color="black" /> A {distance} km de ti</Text>
         <Text>{user.data.home}</Text>
         <View style={styles.buttons}>
            {
               (onLike && onPass) ?
               <>
                  
                  <Pressable onPress={()=>onUserLike()}>
                     {
                        isLiked ?
                        <AntDesign name="heart" size={48} color="green" />
                        :
                        <AntDesign name="hearto" size={48} color="black" />
                     }
                  </Pressable>
                  <Pressable onPress={()=>onPass(user.id)}>
                     <AntDesign name="closecircle" size={48} color="red" />
                  </Pressable>
               </>
               :null
            }
         </View>
      </View>  
   )
}

export default UserCard

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
   user: {
      flex: 1,
      gap: 3,
      border: '3px',
      borderWidth: 3,
      borderColor: colors.salmon,
      width: windowWidth-30,
      margin: 10,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
   },
   profilePic: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 10 
   },
   image:{
      minWidth: 90,
      minHeight: 90,
      width: windowWidth/2,
      height: windowHeight/4,
      resizeMode: 'contain',
      borderRadius: 90,
      borderColor: 'black',
      borderWidth: 4
   },
   userText: {
      
      fontSize: 24,
      textAlign: 'center',
      width: '100%',	
   },
   buttons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      padding: 10,
   },
})