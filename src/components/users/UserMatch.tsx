import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AuthState } from '../../data/objectTypes'
import { useGetUserQuery } from '../../app/servicies'

const UserMatch = ({localId}: any) => {
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
                  <Text>{user.name}</Text>
               </>
               :null
         }
      </View>
   )
}

export default UserMatch

const styles = StyleSheet.create({
   container:{

   },
   image:{

   }
})