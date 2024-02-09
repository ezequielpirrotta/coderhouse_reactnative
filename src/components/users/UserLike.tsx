import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthState } from '../../data/objectTypes'
import { useGetUserQuery } from '../../app/servicies'

const UserLike = ({localId}: any) => {
   const { data: user, isLoading, error } = useGetUserQuery(localId)
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
      alignItems:'center',
      width: windowWidth-30,
      borderColor: 'black',
      borderWidth: 3,
      borderRadius: 100,
      margin: 5,
      padding: 5,
      gap: 20,
      position: 'relative',
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
      margin: 5,
      width: '60%',	
   },
})