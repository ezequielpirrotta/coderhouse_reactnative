import { StyleSheet, View } from 'react-native'
import React from 'react'
import ProfileData from '../components/ProfileData'

const Profile = () => {

   return (
      <>
         {
            <View style={styles.container}>
               <ProfileData/>
            </View>
         }
      </>
   )
}

export default Profile

const styles = StyleSheet.create({
   container: {
      flex: 1,
      border: '6px',
      borderColor: 'solid black',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
})