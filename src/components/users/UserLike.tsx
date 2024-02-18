import { Button, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useGetUserQuery } from '../../app/servicies'
import { AntDesign, Entypo } from '@expo/vector-icons';

const UserLike = ({localId,onDislike}: {localId: string; onDislike: (id:string) => void }) => {
   const { data: user, isLoading, error } = useGetUserQuery(localId)
   const [isDislike, setIsDislike] = useState(false)
   const onUserDislike = () => {
      setIsDislike(!isDislike)
      if(onDislike){
         onDislike(localId)
      }
   }
   return (
      <View style={styles.container}>
         {
            user?
               <>
                  {
                     user.pictures ?
                        <Image source={{uri: user.pictures[0]}} style={styles.image}/> 
                        :
                        <Image source={require('../../../assets/images/deafultProfilePic.jpg')} style={styles.image}/>
                  }
                  <Text style={styles.userText}>{user.name}, {user.age} años</Text>
                  <Pressable onPress={()=>onUserDislike()}>
                     {
                        isDislike ?
                        <AntDesign name="hearto" size={32} color="black" />
                        :
                        <AntDesign name="heart" size={32} color="green" />
                     }
                  </Pressable>
               </>
               :null
         }
      </View>
   )
}

export default UserLike
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
   container:{
      flex: 1,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems:'center',
      width: windowWidth-30,
      borderColor: 'black',
      borderWidth: 3,
      borderRadius: 100,
      margin: 5,
      padding: 10,
      gap: 5,
      //position: 'relative',
   },
   image:{
      width: 90,
      height: 90,
      resizeMode: 'contain',
      borderRadius: 90,
      borderColor: 'black',
      borderWidth: 3
   },
   userText: {
      textAlign: 'center',
      width: '50%',	
   },
})